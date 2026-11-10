
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Satellite,
  Radio,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  GitCompareArrows,
  MapPin,
} from "lucide-react";

import {
  fetchFireDetections,
  type FireDetection,
} from "../../services/fireService";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface SensorStatistics {
  source: string;
  observation_count: number;
  frp_sum_mw: number;
  frp_mean_mw: number | null;
  frp_median_mw: number | null;
  confidence_distribution: Record<string, number>;
}

interface ComparisonResponse {
  period_days: number;
  region: string;
  comparison_type: string;
  modis: SensorStatistics;
  viirs: SensorStatistics;
  observation_count_difference: number;
  methodology_note: string;
}

interface MatchResult {
  matched: number;
  unmatchedModis: number;
  unmatchedViirs: number;
  matchPercentage: number;
  averageDistanceKm: number;
  averageTimeDifferenceHours: number;
  totalModis: number;
  totalViirs: number;
  excludedModis: number;
  excludedViirs: number;
  rawViirsCount: number;
  validViirsCount: number;
  uniqueViirsCount: number;
  duplicatesRemoved: number;
  rawModisCount: number;
  validModisCount: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// --------------------------------------------------
// CONFIGURATION
// --------------------------------------------------

const VIIRS_SOURCES = [
  "VIIRS_NOAA21_NRT",
  "VIIRS_NOAA20_NRT",
  "VIIRS_SNPP_NRT",
];

const MAX_DISTANCE_KM = 1;
const MAX_TIME_DIFFERENCE_HOURS = 24;
const GRID_SIZE = 0.02;
const DEDUP_DISTANCE_KM = 0.375;
const DEDUP_TIME_MINUTES = 30;

// --------------------------------------------------
// FAST NORMALIZED FIRE STRUCT
// --------------------------------------------------

interface NormalizedFire {
  fire: FireDetection;
  lat: number;
  lon: number;
  timestamp: number;
  satellite: string;
}

// --------------------------------------------------
// DATE AND TIME NORMALIZATION
// --------------------------------------------------

function toTimestamp(fire: FireDetection): number | null {
  if (
    !fire.acq_date ||
    fire.acq_time === null ||
    fire.acq_time === undefined
  ) {
    return null;
  }

  const dateValue = String(fire.acq_date).trim().slice(0, 10);

  let year: number;
  let month: number;
  let day: number;

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    [year, month, day] = dateValue.split("-").map(Number);
  } else if (/^\d{8}$/.test(dateValue)) {
    year = Number(dateValue.slice(0, 4));
    month = Number(dateValue.slice(4, 6));
    day = Number(dateValue.slice(6, 8));
  } else {
    return null;
  }

  const rawTime = String(fire.acq_time).trim();

  let hour: number;
  let minute: number;

  if (/^\d{1,2}:\d{2}$/.test(rawTime)) {
    [hour, minute] = rawTime.split(":").map(Number);
  } else {
    const numericTime = Number(rawTime);

    if (!Number.isFinite(numericTime)) return null;

    const timeString = String(Math.trunc(numericTime)).padStart(4, "0");

    if (!/^\d{4}$/.test(timeString)) return null;

    hour = Number(timeString.slice(0, 2));
    minute = Number(timeString.slice(2, 4));
  }

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const timestamp = Date.UTC(year, month - 1, day, hour, minute);
  const check = new Date(timestamp);

  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
}

function normalizeValidDetections(fires: FireDetection[]): NormalizedFire[] {
  const result: NormalizedFire[] = [];
  for (let i = 0; i < fires.length; i++) {
    const fire = fires[i];
    const lat = Number(fire.latitude);
    const lon = Number(fire.longitude);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      continue;
    }

    const timestamp = toTimestamp(fire);
    if (timestamp === null) continue;

    result.push({
      fire,
      lat,
      lon,
      timestamp,
      satellite: String(fire.satellite ?? "").trim(),
    });
  }
  return result;
}

// --------------------------------------------------
// DISTANCE CALCULATION
// --------------------------------------------------

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const radians = (value: number) => (value * Math.PI) / 180;

  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(lat1)) *
      Math.cos(radians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return (
    2 *
    earthRadiusKm *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

// --------------------------------------------------
// VIIRS DEDUPLICATION (OPTIMIZED WITH SPATIAL GRID)
// --------------------------------------------------

function deduplicateViirs(
  detections: FireDetection[]
): {
  detections: FireDetection[];
  duplicatesRemoved: number;
} {
  const normalized = normalizeValidDetections(detections);
  normalized.sort((a, b) => a.timestamp - b.timestamp);

  const DEDUP_GRID = 0.01; // ~1.1km cell
  const maxTimeDiffMs = DEDUP_TIME_MINUTES * 60000;
  const grid = new Map<string, NormalizedFire[]>();
  const kept: FireDetection[] = [];
  let duplicatesRemoved = 0;

  for (let i = 0; i < normalized.length; i++) {
    const current = normalized[i];
    const row = Math.floor(current.lat / DEDUP_GRID);
    const col = Math.floor(current.lon / DEDUP_GRID);

    let isDuplicate = false;

    // Check adjacent 3x3 cells only
    for (let r = row - 1; r <= row + 1 && !isDuplicate; r++) {
      for (let c = col - 1; c <= col + 1 && !isDuplicate; c++) {
        const bucket = grid.get(`${r}:${c}`);
        if (!bucket) continue;

        for (let b = 0; b < bucket.length; b++) {
          const existing = bucket[b];

          // Only deduplicate detections from different satellite platforms
          if (existing.satellite === current.satellite) {
            continue;
          }

          const timeDiff = Math.abs(current.timestamp - existing.timestamp);
          if (timeDiff > maxTimeDiffMs) {
            continue;
          }

          // Fast bounding box check (0.375 km is ~0.0034 deg lat, ~0.004 deg lon)
          if (
            Math.abs(current.lat - existing.lat) > 0.004 ||
            Math.abs(current.lon - existing.lon) > 0.0045
          ) {
            continue;
          }

          const distance = haversineDistance(
            current.lat,
            current.lon,
            existing.lat,
            existing.lon
          );

          if (distance <= DEDUP_DISTANCE_KM) {
            isDuplicate = true;
            break;
          }
        }
      }
    }

    if (isDuplicate) {
      duplicatesRemoved++;
    } else {
      kept.push(current.fire);
      const key = `${row}:${col}`;
      const bucket = grid.get(key);
      if (bucket) {
        bucket.push(current);
      } else {
        grid.set(key, [current]);
      }
    }
  }

  return {
    detections: kept,
    duplicatesRemoved,
  };
}

// --------------------------------------------------
// SENSOR STATISTICS
// --------------------------------------------------

function calculateSensorStats(
  source: string,
  detections: FireDetection[]
): SensorStatistics {
  const frpValues = detections
    .map((fire) => fire.frp)
    .filter(
      (value): value is number =>
        value !== null && value !== undefined && Number.isFinite(value)
    );

  const frpSum = frpValues.reduce((sum, value) => sum + value, 0);

  const confidenceDistribution: Record<string, number> = {};

  detections.forEach((fire) => {
    const confidence = String(fire.confidence || "Unknown").trim() || "Unknown";

    confidenceDistribution[confidence] =
      (confidenceDistribution[confidence] || 0) + 1;
  });

  const sortedFrp = [...frpValues].sort((a, b) => a - b);
  const n = sortedFrp.length;
  let frpMedian: number | null = null;
  if (n > 0) {
    frpMedian =
      n % 2 !== 0
        ? Number(sortedFrp[Math.floor(n / 2)].toFixed(3))
        : Number(((sortedFrp[n / 2 - 1] + sortedFrp[n / 2]) / 2).toFixed(3));
  }

  return {
    source,
    observation_count: detections.length,
    frp_sum_mw: Number(frpSum.toFixed(3)),
    frp_mean_mw: frpValues.length
      ? Number((frpSum / frpValues.length).toFixed(3))
      : null,
    frp_median_mw: frpMedian,
    confidence_distribution: confidenceDistribution,
  };
}

// --------------------------------------------------
// SPATIAL-TEMPORAL MATCHING (OPTIMIZED WITH SPATIAL GRID)
// --------------------------------------------------

function calculateHarmonization(
  modis: FireDetection[],
  viirs: FireDetection[],
  rawModisCount: number = modis.length,
  rawViirsCount: number = viirs.length,
  duplicatesRemoved: number = 0
): MatchResult {
  const normModis = normalizeValidDetections(modis);
  const normViirs = normalizeValidDetections(viirs);

  const grid = new Map<string, number[]>();

  normViirs.forEach((item, index) => {
    const row = Math.floor(item.lat / GRID_SIZE);
    const col = Math.floor(item.lon / GRID_SIZE);
    const key = `${row}:${col}`;

    const bucket = grid.get(key);
    if (bucket) {
      bucket.push(index);
    } else {
      grid.set(key, [index]);
    }
  });

  // Generate all valid candidate pairs.
  const candidates: {
    modisIndex: number;
    viirsIndex: number;
    distance: number;
    timeDifference: number;
    score: number;
  }[] = [];

  const maxTimeDiffMs = MAX_TIME_DIFFERENCE_HOURS * 3600000;

  for (let modisIndex = 0; modisIndex < normModis.length; modisIndex++) {
    const modisFire = normModis[modisIndex];
    const row = Math.floor(modisFire.lat / GRID_SIZE);
    const col = Math.floor(modisFire.lon / GRID_SIZE);

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const bucket = grid.get(`${row + rowOffset}:${col + colOffset}`);
        if (!bucket) continue;

        for (let b = 0; b < bucket.length; b++) {
          const viirsIndex = bucket[b];
          const viirsFire = normViirs[viirsIndex];

          const timeDiffMs = Math.abs(modisFire.timestamp - viirsFire.timestamp);
          if (timeDiffMs > maxTimeDiffMs) {
            continue;
          }

          // Fast bounding box check (1 km is ~0.009 deg lat, ~0.015 deg lon)
          if (
            Math.abs(modisFire.lat - viirsFire.lat) > 0.01 ||
            Math.abs(modisFire.lon - viirsFire.lon) > 0.015
          ) {
            continue;
          }

          const distance = haversineDistance(
            modisFire.lat,
            modisFire.lon,
            viirsFire.lat,
            viirsFire.lon
          );

          if (distance > MAX_DISTANCE_KM) {
            continue;
          }

          const timeDifference = timeDiffMs / 3600000;

          // Lower score means a better spatial-temporal candidate.
          const score =
            distance / MAX_DISTANCE_KM +
            timeDifference / MAX_TIME_DIFFERENCE_HOURS;

          candidates.push({
            modisIndex,
            viirsIndex,
            distance,
            timeDifference,
            score,
          });
        }
      }
    }
  }

  // Prioritize the strongest candidate pairs globally.
  candidates.sort((a, b) => a.score - b.score);

  const usedModis = new Set<number>();
  const usedViirs = new Set<number>();

  let matched = 0;
  let totalDistance = 0;
  let totalTimeDifference = 0;

  for (let c = 0; c < candidates.length; c++) {
    const candidate = candidates[c];
    if (
      usedModis.has(candidate.modisIndex) ||
      usedViirs.has(candidate.viirsIndex)
    ) {
      continue;
    }

    usedModis.add(candidate.modisIndex);
    usedViirs.add(candidate.viirsIndex);

    matched++;
    totalDistance += candidate.distance;
    totalTimeDifference += candidate.timeDifference;
  }

  const totalModis = normModis.length;
  const totalViirs = normViirs.length;

  return {
    matched,
    unmatchedModis: totalModis - matched,
    unmatchedViirs: totalViirs - matched,

    matchPercentage: totalModis
      ? (matched / totalModis) * 100
      : 0,

    averageDistanceKm: matched
      ? totalDistance / matched
      : 0,

    averageTimeDifferenceHours: matched
      ? totalTimeDifference / matched
      : 0,

    totalModis,
    totalViirs,

    excludedModis: rawModisCount - totalModis,
    excludedViirs: (rawViirsCount - duplicatesRemoved) - totalViirs,

    rawViirsCount,
    validViirsCount: totalViirs + duplicatesRemoved,
    uniqueViirsCount: totalViirs,
    duplicatesRemoved,
    rawModisCount,
    validModisCount: totalModis,
  };
}

// --------------------------------------------------
// METRIC CARD (MEMOIZED TO AVOID RE-RENDERS)
// --------------------------------------------------

const MetricCard = memo(function MetricCard({
  title,
  value,
  description,
  icon,
  color,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <span className={color}>{icon}</span>
      </div>

      <h3 className="mt-5 text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
});

// --------------------------------------------------
// HARMONIZATION LAB RESULT CACHE
// --------------------------------------------------

interface CachedHarmonization {
  data: ComparisonResponse;
  matchResult: MatchResult;
  datasetSignature: string;
  timestamp: number;
}

const harmonizationLabCache = new Map<number, CachedHarmonization>();

function computeDatasetSignature(
  modis: FireDetection[],
  noaa21: FireDetection[],
  noaa20: FireDetection[],
  snpp: FireDetection[]
): string {
  return `${modis.length}_${noaa21.length}_${noaa20.length}_${snpp.length}_${
    modis[0]?.acq_date ?? ""
  }_${noaa21[0]?.acq_date ?? ""}`;
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function HarmonizationLab() {
  const [days, setDays] = useState(5);

  const [data, setData] = useState<ComparisonResponse | null>(null);

  const [matchResult, setMatchResult] =
    useState<MatchResult | null>(null);

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ------------------------------------------------
  // FETCH AND PROCESS NASA DATASETS EFFICIENTLY
  // ------------------------------------------------

  const fetchComparison = useCallback(async (forceRefresh: boolean = false) => {
    // Show cached results immediately while refreshing in background
    const cached = harmonizationLabCache.get(days);
    if (cached && !forceRefresh) {
      setData(cached.data);
      setMatchResult(cached.matchResult);
      setLoading(false);
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const [
        modisResponse,
        noaa21Response,
        noaa20Response,
        snppResponse,
      ] = await Promise.all([
        fetchFireDetections("MODIS_NRT", days, undefined, forceRefresh),
        fetchFireDetections(VIIRS_SOURCES[0], days, undefined, forceRefresh),
        fetchFireDetections(VIIRS_SOURCES[1], days, undefined, forceRefresh),
        fetchFireDetections(VIIRS_SOURCES[2], days, undefined, forceRefresh),
      ]);

      const modisDetections = modisResponse.detections ?? [];

      // Avoid recalculating matching results if datasets have not changed
      const currentSignature = computeDatasetSignature(
        modisDetections,
        noaa21Response.detections ?? [],
        noaa20Response.detections ?? [],
        snppResponse.detections ?? []
      );

      if (cached && cached.datasetSignature === currentSignature && !forceRefresh) {
        setIsRefreshing(false);
        setLoading(false);
        return;
      }

      const rawViirsDetections: FireDetection[] = [
        ...(noaa21Response.detections ?? []),
        ...(noaa20Response.detections ?? []),
        ...(snppResponse.detections ?? []),
      ];

      const deduplicationResult = deduplicateViirs(rawViirsDetections);
      const viirsDetections = deduplicationResult.detections;

      // Calculate statistics from the exact same data
      // used for spatial-temporal matching.
      const modisStats = calculateSensorStats(
        "MODIS",
        modisDetections
      );

      const viirsStats = calculateSensorStats(
        "VIIRS",
        viirsDetections
      );

      const comparison: ComparisonResponse = {
        period_days: days,
        region: "India",
        comparison_type: "Observation-level comparison",

        modis: modisStats,
        viirs: viirsStats,

        observation_count_difference:
          modisStats.observation_count -
          viirsStats.observation_count,

        methodology_note:
          "Observation counts are not unique fire-event counts. " +
          "MODIS and VIIRS have different spatial resolutions " +
          "and detection characteristics. Spatial-temporal " +
          "matching is used to identify candidate observations. " +
          "FRP calibration is not performed.",
      };

      // Calculate matching using optimized spatial grid.
      const result = calculateHarmonization(
        modisDetections,
        viirsDetections,
        modisDetections.length,
        rawViirsDetections.length,
        deduplicationResult.duplicatesRemoved
      );

      harmonizationLabCache.set(days, {
        data: comparison,
        matchResult: result,
        datasetSignature: currentSignature,
        timestamp: Date.now(),
      });

      setData(comparison);
      setMatchResult(result);
    } catch (err) {
      console.error("Harmonization error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to calculate harmonization."
      );

      if (!cached) {
        setData(null);
        setMatchResult(null);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [days]);

  useEffect(() => {
    void fetchComparison(false);
  }, [fetchComparison]);

  // Memoized confidence sections
  const confidenceSection = useMemo(() => {
    if (!data) return null;
    return [
      {
        name: "MODIS",
        values: data.modis.confidence_distribution,
        color: "text-orange-400",
      },
      {
        name: "VIIRS",
        values: data.viirs.confidence_distribution,
        color: "text-cyan-400",
      },
    ];
  }, [data]);

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <section className="space-y-8 p-6 lg:p-10">

      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">
            Scientific Analysis
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Sensor Harmonization Lab
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Spatial-temporal matching of MODIS and VIIRS satellite observations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white"
          >
            <option value={1}>Last 1 day</option>
            <option value={2}>Last 2 days</option>
            <option value={3}>Last 3 days</option>
            <option value={5}>Last 5 days</option>
          </select>

          <button
            onClick={() => void fetchComparison(true)}
            disabled={loading || isRefreshing}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading || isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Updating..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-10 text-center">
          <Activity
            size={32}
            className="mx-auto animate-pulse text-cyan-400"
          />

          <p className="mt-4 text-sm text-slate-400">
            Downloading MODIS and VIIRS observations.
            <br />
            Please wait while spatial-temporal harmonization runs...
          </p>
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-400" />

            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>

          <button
            onClick={() => void fetchComparison()}
            className="mt-4 rounded-lg bg-red-900 px-4 py-2 text-sm text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* RESULTS */}

      {!loading && data && matchResult && !error && (
        <>

          {/* SENSOR STATISTICS */}

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Satellite className="text-cyan-400" size={20} />
              Satellite Observation Statistics
            </h3>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              <MetricCard
                title="MODIS Observations"
                value={data.modis.observation_count.toLocaleString()}
                description="MODIS Terra + Aqua"
                icon={<Satellite size={20} />}
                color="text-orange-400"
              />

              <MetricCard
                title="VIIRS Observations"
                value={data.viirs.observation_count.toLocaleString()}
                description="NOAA-21 + NOAA-20 + Suomi-NPP"
                icon={<Radio size={20} />}
                color="text-cyan-400"
              />

              <MetricCard
                title="Observation Difference"
                value={data.observation_count_difference.toLocaleString()}
                description="MODIS minus VIIRS"
                icon={<Activity size={20} />}
                color="text-amber-400"
              />

            </div>
          </div>

          {/* HARMONIZATION */}

          <div className="rounded-2xl border border-cyan-900/50 bg-[#0d1524] p-6">

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                  <GitCompareArrows className="text-cyan-400" />
                  Spatial-Temporal Harmonization
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Candidate matching between MODIS and combined VIIRS observations
                </p>
              </div>

              <span className="rounded-lg bg-cyan-950 px-3 py-2 text-xs text-cyan-300">
                {data.period_days}-day analysis
              </span>
            </div>

            {/* MATCH CARDS */}

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <MetricCard
                title="Matched Observations"
                value={matchResult.matched.toLocaleString()}
                description="One-to-one candidate matches"
                icon={<CheckCircle2 size={20} />}
                color="text-emerald-400"
              />

              <MetricCard
                title="Unmatched MODIS"
                value={matchResult.unmatchedModis.toLocaleString()}
                description="Valid MODIS without a VIIRS match"
                icon={<Satellite size={20} />}
                color="text-orange-400"
              />

              <MetricCard
                title="Unmatched VIIRS"
                value={matchResult.unmatchedViirs.toLocaleString()}
                description="Valid VIIRS without a MODIS match"
                icon={<Radio size={20} />}
                color="text-cyan-400"
              />

              <MetricCard
                title="MODIS Match Rate"
                value={`${matchResult.matchPercentage.toFixed(2)}%`}
                description="Matched / valid MODIS observations"
                icon={<Activity size={20} />}
                color="text-emerald-400"
              />

            </div>

            {/* MATCH PROGRESS */}

            <div className="mt-8">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-slate-400">
                  MODIS candidate match percentage
                </span>

                <span className="font-semibold text-cyan-400">
                  {matchResult.matchPercentage.toFixed(2)}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all"
                  style={{
                    width: `${Math.min(matchResult.matchPercentage, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* THRESHOLDS */}

            <div className="mt-8 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl bg-slate-800/60 p-4">
                <MapPin className="mb-2 text-cyan-400" size={20} />

                <p className="text-xs text-slate-400">
                  Spatial matching threshold
                </p>

                <p className="mt-1 font-semibold text-white">
                  {MAX_DISTANCE_KM} Kilometer
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/60 p-4">
                <Activity className="mb-2 text-orange-400" size={20} />

                <p className="text-xs text-slate-400">
                  Temporal matching threshold
                </p>

                <p className="mt-1 font-semibold text-white">
                  {MAX_TIME_DIFFERENCE_HOURS} Hours
                </p>
              </div>

              <div className="rounded-xl bg-slate-800/60 p-4">
                <GitCompareArrows className="mb-2 text-emerald-400" size={20} />

                <p className="text-xs text-slate-400">
                  Average matched distance
                </p>

                <p className="mt-1 font-semibold text-white">
                  {matchResult.averageDistanceKm.toFixed(3)} km
                </p>
              </div>

            </div>

            <div className="mt-4 rounded-xl bg-slate-800/60 p-4">
              <p className="text-xs text-slate-400">
                Average time difference between matched observations
              </p>

              <p className="mt-1 font-semibold text-white">
                {matchResult.averageTimeDifferenceHours.toFixed(2)} hours
              </p>
            </div>

            {/* DATA VALIDATION */}

            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
              <h4 className="font-semibold text-white">
                Data Validation & Platform Deduplication
              </h4>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div className="space-y-2 rounded-lg bg-slate-900/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    MODIS Observations
                  </p>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Raw Ingested:</span>
                    <span className="font-semibold text-white">{(matchResult.rawModisCount ?? matchResult.totalModis).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Valid Observations:</span>
                    <span className="font-semibold text-emerald-400">{matchResult.totalModis.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Excluded (Invalid / Missing TS):</span>
                    <span>{matchResult.excludedModis.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg bg-slate-900/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    VIIRS Observations & Deduplication
                  </p>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Raw Ingested (NOAA-21, 20, SNPP):</span>
                    <span className="font-semibold text-white">{(matchResult.rawViirsCount ?? matchResult.totalViirs).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Cross-Platform Duplicates Removed:</span>
                    <span className="font-semibold text-amber-400">{(matchResult.duplicatesRemoved ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Unique Deduplicated Observations:</span>
                    <span className="font-semibold text-cyan-300">{matchResult.totalViirs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Excluded (Invalid / Missing TS):</span>
                    <span>{matchResult.excludedViirs.toLocaleString()}</span>
                  </div>
                </div>

              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Statistics and matching are calculated from the same fetched
              observations, avoiding duplicate API requests.
            </p>

          </div>

          {/* FRP STATISTICS */}

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <h3 className="font-semibold text-white">
                MODIS Fire Radiative Power
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                FRP distribution and central tendency in MW
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-400">
                    Total FRP
                  </p>

                  <p className="mt-1 text-2xl font-bold text-orange-400">
                    {data.modis.frp_sum_mw.toFixed(2)} MW
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Mean FRP
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {data.modis.frp_mean_mw !== null
                        ? `${data.modis.frp_mean_mw.toFixed(2)} MW`
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Median FRP
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {data.modis.frp_median_mw !== null
                        ? `${data.modis.frp_median_mw.toFixed(2)} MW`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <h3 className="font-semibold text-white">
                VIIRS Fire Radiative Power
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                FRP distribution and central tendency in MW
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-sm text-slate-400">
                    Total FRP
                  </p>

                  <p className="mt-1 text-2xl font-bold text-cyan-400">
                    {data.viirs.frp_sum_mw.toFixed(2)} MW
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      Mean FRP
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {data.viirs.frp_mean_mw !== null
                        ? `${data.viirs.frp_mean_mw.toFixed(2)} MW`
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Median FRP
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {data.viirs.frp_median_mw !== null
                        ? `${data.viirs.frp_median_mw.toFixed(2)} MW`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CONFIDENCE DISTRIBUTION */}

          <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">

            <h3 className="font-semibold text-white">
              Confidence Distribution
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Observation confidence values reported by each sensor
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {(confidenceSection ?? []).map((sensor) => (
                <div key={sensor.name}>

                  <h4 className={`mb-4 text-sm font-medium ${sensor.color}`}>
                    {sensor.name}
                  </h4>

                  {Object.entries(sensor.values).length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No confidence data available.
                    </p>
                  ) : (
                    Object.entries(sensor.values).map(([confidence, count]) => (
                      <div
                        key={confidence}
                        className="mb-3 flex justify-between rounded-lg bg-slate-800/60 p-3"
                      >
                        <span className="text-sm text-slate-300">
                          {confidence}
                        </span>

                        <span className="text-sm font-semibold text-white">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}

                </div>
              ))}

            </div>
          </div>

          {/* SCIENTIFIC METHODOLOGY */}

          <div className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-6">

            <div className="flex items-start gap-3">

              <AlertTriangle
                className="mt-1 shrink-0 text-amber-400"
                size={22}
              />

              <div>
                <h3 className="font-semibold text-amber-300">
                  Scientific Methodology
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {data.methodology_note}
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
                  <li>
                    Candidate observations must be within 1 km.
                  </li>

                  <li>
                    Acquisition timestamps must be within 24 hours.
                  </li>

                  <li>
                    Each VIIRS observation can be matched only once.
                  </li>

                  <li>
                    Matching uses a spatial grid and nearest-neighbour search.
                  </li>

                  <li>
                    <strong>Greedy bipartite matching limitation:</strong> Candidate pairs are sorted by composite spatial-temporal score and matched sequentially. While computationally efficient, greedy selection does not guarantee a globally optimal maximum-weight matching and may exclude secondary pairings.
                  </li>

                  <li>
                    FRP calibration and spatial resolution harmonization
                    are not performed by this matching step.
                  </li>
                </ul>

                <p className="mt-4 text-xs text-amber-300/80">
                  These are preliminary observation-level candidate matches,
                  not confirmed unique fire events or calibrated harmonized measurements.
                </p>
              </div>

            </div>
          </div>

        </>
      )}

    </section>
  );
}

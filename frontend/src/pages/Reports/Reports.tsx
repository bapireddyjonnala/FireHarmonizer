
import { useEffect, useState } from "react";
import { fetchFireDetections } from "../../services/fireService";

interface FireDetection {
  latitude?: number;
  longitude?: number;
  lat?: number;
  lon?: number;
  frp?: number;
  confidence?: string | number;
  acq_date?: string;
  satellite?: string;
  instrument?: string;
}

const extractRecords = (response: any): FireDetection[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.detections)) return response.detections;
  if (Array.isArray(response?.fires)) return response.fires;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const Reports = () => {
  const [modis, setModis] = useState<FireDetection[]>([]);
  const [viirs, setViirs] = useState<FireDetection[]>([]);
  const [days, setDays] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      setError("");

      try {
        const [modisResponse, viirsResponse] = await Promise.all([
          fetchFireDetections("MODIS_NRT", days),
          fetchFireDetections("VIIRS_NOAA21_NRT", days),
        ]);

        setModis(extractRecords(modisResponse));
        setViirs(extractRecords(viirsResponse));
      } catch (err) {
        console.error(err);
        setError("Unable to load report data. Check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [days]);

  const allFires = [...modis, ...viirs];

  const totalFRP = allFires.reduce(
    (sum, fire) => sum + Number(fire.frp || 0),
    0
  );

  const averageFRP =
    allFires.length > 0 ? totalFRP / allFires.length : 0;

  const highConfidence = allFires.filter((fire) => {
    const confidence = String(fire.confidence || "").toLowerCase();
    return confidence === "high" || confidence === "h";
  }).length;

  const confidenceCounts = {
    high: highConfidence,
    medium: allFires.filter((fire) => {
      const value = String(fire.confidence || "").toLowerCase();
      return value === "medium" || value === "n";
    }).length,
    low: allFires.filter((fire) => {
      const value = String(fire.confidence || "").toLowerCase();
      return value === "low" || value === "l";
    }).length,
  };

  const exportCSV = () => {
    const records = [
      ["Source", "Date", "Latitude", "Longitude", "FRP_MW", "Confidence"],
      ...modis.map((fire) => [
        "MODIS",
        fire.acq_date || "",
        fire.latitude ?? fire.lat ?? "",
        fire.longitude ?? fire.lon ?? "",
        fire.frp ?? "",
        fire.confidence ?? "",
      ]),
      ...viirs.map((fire) => [
        "VIIRS NOAA-21",
        fire.acq_date || "",
        fire.latitude ?? fire.lat ?? "",
        fire.longitude ?? fire.lon ?? "",
        fire.frp ?? "",
        fire.confidence ?? "",
      ]),
    ];

    const csv = records
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `fireharmonizer-report-${days}-days.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              FireHarmonizer / Reports
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Reports Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Satellite fire observation summary and data export.
            </p>
          </div>

          <button
            onClick={exportCSV}
            disabled={loading || allFires.length === 0}
            className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export CSV
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <label className="text-sm text-slate-400">
            Report Data Range
          </label>

          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value={1}>Last 24 Hours</option>
            <option value={2}>Last 2 Days</option>
            <option value={3}>Last 3 Days</option>
            <option value={5}>Last 5 Days</option>
          </select>
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-300">
            Loading report data...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Observations"
                value={allFires.length.toLocaleString()}
                color="text-cyan-400"
              />

              <StatCard
                title="MODIS Observations"
                value={modis.length.toLocaleString()}
                color="text-blue-400"
              />

              <StatCard
                title="VIIRS Observations"
                value={viirs.length.toLocaleString()}
                color="text-orange-400"
              />

              <StatCard
                title="Total FRP"
                value={`${totalFRP.toFixed(2)} MW`}
                color="text-red-400"
              />
            </div>

            {/* FRP and Confidence */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-xl font-bold">
                  Fire Radiative Power Summary
                </h2>

                <div className="mt-6 space-y-5">
                  <SummaryRow
                    label="Total FRP"
                    value={`${totalFRP.toFixed(2)} MW`}
                  />

                  <SummaryRow
                    label="Average FRP"
                    value={`${averageFRP.toFixed(2)} MW`}
                  />

                  <SummaryRow
                    label="MODIS Total FRP"
                    value={`${modis
                      .reduce((sum, fire) => sum + Number(fire.frp || 0), 0)
                      .toFixed(2)} MW`}
                  />

                  <SummaryRow
                    label="VIIRS Total FRP"
                    value={`${viirs
                      .reduce((sum, fire) => sum + Number(fire.frp || 0), 0)
                      .toFixed(2)} MW`}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="text-xl font-bold">
                  Confidence Distribution
                </h2>

                <div className="mt-6 space-y-5">
                  <ConfidenceRow
                    label="High"
                    count={confidenceCounts.high}
                    total={allFires.length}
                    color="bg-green-500"
                  />

                  <ConfidenceRow
                    label="Medium"
                    count={confidenceCounts.medium}
                    total={allFires.length}
                    color="bg-yellow-500"
                  />

                  <ConfidenceRow
                    label="Low"
                    count={confidenceCounts.low}
                    total={allFires.length}
                    color="bg-red-500"
                  />
                </div>

                <p className="mt-5 text-xs text-slate-500">
                  Unrecognized confidence labels are not included in these
                  categories.
                </p>
              </div>
            </div>

            {/* Source Comparison */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-bold">
                Satellite Source Comparison
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <SourceCard
                  name="MODIS"
                  count={modis.length}
                  frp={modis.reduce(
                    (sum, fire) => sum + Number(fire.frp || 0),
                    0
                  )}
                  color="text-blue-400"
                />

                <SourceCard
                  name="VIIRS NOAA-21"
                  count={viirs.length}
                  frp={viirs.reduce(
                    (sum, fire) => sum + Number(fire.frp || 0),
                    0
                  )}
                  color="text-orange-400"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Counts from different satellite instruments may overlap
                spatially and temporally. They should not be interpreted
                as unique fire-event counts.
              </p>
            </div>

            {/* Scientific Note */}
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-slate-400">
              <span className="font-semibold text-yellow-400">
                Scientific Note:
              </span>{" "}
              This report summarizes satellite hotspot observations.
              Thermal anomalies are not necessarily confirmed wildfires.
              MODIS and VIIRS observations have different spatial
              resolutions and detection characteristics.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <p className="text-sm text-slate-400">{title}</p>
    <h3 className={`mt-3 text-3xl font-bold ${color}`}>{value}</h3>
  </div>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between border-b border-slate-800 pb-4">
    <span className="text-slate-400">{label}</span>
    <span className="font-semibold text-white">{value}</span>
  </div>
);

const ConfidenceRow = ({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">
          {count} ({percentage.toFixed(1)}%)
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const SourceCard = ({
  name,
  count,
  frp,
  color,
}: {
  name: string;
  count: number;
  frp: number;
  color: string;
}) => (
  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
    <h3 className={`text-lg font-bold ${color}`}>{name}</h3>

    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-slate-500">Observations</p>
        <p className="mt-1 text-2xl font-bold">
          {count.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-xs text-slate-500">Total FRP</p>
        <p className="mt-1 text-2xl font-bold">
          {frp.toFixed(2)} MW
        </p>
      </div>
    </div>
  </div>
);

export default Reports;

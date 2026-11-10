import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Flame,
  Activity,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  fetchFireDetections,
  type FireDetection,
} from "../../services/fireService";

interface DailyStatistics {
  date: string;
  count: number;
  totalFRP: number;
  meanFRP: number;
  detections: FireDetection[];
}

export default function FireCalendar() {
  const [source, setSource] = useState("VIIRS_NOAA21_NRT");
  const [days, setDays] = useState(5);

  const [fires, setFires] = useState<FireDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFireData() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchFireDetections(source, days);

        if (active) {
          setFires(result.detections || []);
        }
      } catch (err) {
        console.error("Fire Calendar API error:", err);

        if (active) {
          setError(
            "Unable to load fire calendar data. Check backend connection."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFireData();

    return () => {
      active = false;
    };
  }, [source, days]);

  const dailyStatistics = useMemo(() => {
    const grouped: Record<string, FireDetection[]> = {};

    fires.forEach((fire) => {
      if (!fire.acq_date) return;

      if (!grouped[fire.acq_date]) {
        grouped[fire.acq_date] = [];
      }

      grouped[fire.acq_date].push(fire);
    });

    const result: DailyStatistics[] = Object.entries(grouped).map(
      ([date, detections]) => {
        const validFRP = detections
          .map((fire) => fire.frp)
          .filter((value): value is number => value !== null);

        const totalFRP = validFRP.reduce(
          (sum, value) => sum + value,
          0
        );

        const meanFRP =
          validFRP.length > 0
            ? totalFRP / validFRP.length
            : 0;

        return {
          date,
          count: detections.length,
          totalFRP,
          meanFRP,
          detections,
        };
      }
    );

    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [fires]);

  const selectedDay = dailyStatistics.find(
    (item) => item.date === selectedDate
  );

  const totalObservations = fires.length;

  const totalFRP = fires.reduce(
    (sum, fire) => sum + (fire.frp ?? 0),
    0
  );

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <section className="space-y-8 p-6 lg:p-10">
      {/* HEADER */}

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">
            Temporal Analysis
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white">
            Fire Activity Calendar
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Daily satellite fire observations from NASA FIRMS
          </p>
        </div>

        <button
          onClick={() => {
            setDays((current) => current);
            setSource((current) => current);
          }}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-cyan-400"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      {/* FILTERS */}

      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-800 bg-[#0d1524] p-5">
        <div>
          <label className="mb-2 block text-xs text-slate-400">
            Satellite Source
          </label>

          <select
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white"
          >
            <option value="VIIRS_NOAA21_NRT">
              VIIRS NOAA-21 (Primary)
            </option>

            <option value="MODIS_NRT">
              MODIS (Terra + Aqua)
            </option>

            <option value="VIIRS_NOAA20_NRT">
              VIIRS NOAA-20
            </option>

            <option value="VIIRS_SNPP_NRT">
              VIIRS Suomi-NPP
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-slate-400">
            Historical Period
          </label>

          <select
            value={days}
            onChange={(event) =>
              setDays(Number(event.target.value))
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white"
          >
            <option value={1}>Last 1 day</option>
            <option value={2}>Last 2 days</option>
            <option value={3}>Last 3 days</option>
            <option value={5}>Last 5 days</option>
          </select>
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-10 text-center">
          <Activity className="mx-auto animate-pulse text-cyan-400" />

          <p className="mt-4 text-sm text-slate-400">
            Loading satellite fire activity...
          </p>
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6">
          <div className="flex items-center gap-3 text-red-300">
            <AlertTriangle size={20} />
            {error}
          </div>
        </div>
      )}

      {/* DATA */}

      {!loading && !error && (
        <>
          {/* METRICS */}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <Flame className="text-orange-400" size={22} />

              <p className="mt-4 text-sm text-slate-400">
                Total Observations
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalObservations.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <CalendarDays className="text-cyan-400" size={22} />

              <p className="mt-4 text-sm text-slate-400">
                Dates with Observations
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {dailyStatistics.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <Activity className="text-amber-400" size={22} />

              <p className="mt-4 text-sm text-slate-400">
                Total FRP
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalFRP.toFixed(2)} MW
              </h2>
            </div>
          </div>

          {/* DAILY ACTIVITY */}

          <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
            <h2 className="font-semibold text-white">
              Daily Fire Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a date to inspect its detections
            </p>

            {dailyStatistics.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-700 p-8 text-center">
                <p className="text-sm text-slate-400">
                  No observations found for this period.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {dailyStatistics.map((day) => {
                  const percentage =
                    totalObservations > 0
                      ? (day.count / totalObservations) * 100
                      : 0;

                  return (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        selectedDate === day.date
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">
                            {formatDate(day.date)}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {day.count} observations
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-orange-400">
                            {day.totalFRP.toFixed(2)} MW
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Mean FRP: {day.meanFRP.toFixed(2)} MW
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-orange-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SELECTED DATE */}

          {selectedDay && (
            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <h2 className="font-semibold text-white">
                Observations for {formatDate(selectedDay.date)}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Satellite source: {source}
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-3">Latitude</th>
                      <th className="p-3">Longitude</th>
                      <th className="p-3">FRP (MW)</th>
                      <th className="p-3">Brightness</th>
                      <th className="p-3">Confidence</th>
                      <th className="p-3">Acquisition Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedDay.detections.map((fire, index) => (
                      <tr
                        key={`${fire.latitude}-${fire.longitude}-${index}`}
                        className="border-b border-slate-800/60"
                      >
                        <td className="p-3 text-slate-300">
                          {fire.latitude.toFixed(4)}
                        </td>

                        <td className="p-3 text-slate-300">
                          {fire.longitude.toFixed(4)}
                        </td>

                        <td className="p-3 text-orange-400">
                          {fire.frp ?? "N/A"}
                        </td>

                        <td className="p-3 text-slate-300">
                          {fire.brightness ?? "N/A"}
                        </td>

                        <td className="p-3 text-slate-300">
                          {fire.confidence ?? "N/A"}
                        </td>

                        <td className="p-3 text-slate-300">
                          {fire.acq_time ?? "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
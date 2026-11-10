
import { useEffect, useMemo, useState } from "react";
import {
  fetchFireDetections,
  type FireDetection,
} from "../../services/fireService";

const AnomalyExplorer = () => {
  const [fires, setFires] = useState<FireDetection[]>([]);
  const [source, setSource] = useState("VIIRS_NOAA21_NRT");
  const [days, setDays] = useState(5);
  const [threshold, setThreshold] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchFireDetections(source, days);

        if (active) {
          setFires(response.detections ?? []);
        }
      } catch (err) {
        console.error("Anomaly Explorer fetch error:", err);

        if (active) {
          setError("Unable to load satellite detections.");
          setFires([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [source, days]);

  const anomalies = useMemo(
    () =>
      fires
        .filter((fire) => Number(fire.frp ?? 0) >= threshold)
        .sort((a, b) => Number(b.frp ?? 0) - Number(a.frp ?? 0)),
    [fires, threshold]
  );

  const totalFRP = anomalies.reduce(
    (sum, fire) => sum + Number(fire.frp ?? 0),
    0
  );

  const averageFRP =
    anomalies.length > 0 ? totalFRP / anomalies.length : 0;

  const highConfidence = anomalies.filter((fire) => {
    const value = String(fire.confidence ?? "").toLowerCase();
    return ["h", "high", "90", "100"].includes(value);
  }).length;

  return (
    <main className="min-h-screen space-y-6 bg-slate-950 p-4 text-white md:p-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-red-400">
          FireHarmonizer / Anomaly Explorer
        </p>
        <h1 className="mt-2 text-3xl font-bold">Fire Anomaly Explorer</h1>
        <p className="mt-2 text-slate-400">
          Identify observations with elevated Fire Radiative Power.
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Satellite Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          >
            <option value="VIIRS_NOAA21_NRT">VIIRS NOAA-21 (Primary)</option>
            <option value="MODIS_NRT">MODIS (Terra + Aqua)</option>
            <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20</option>
            <option value="VIIRS_SNPP_NRT">VIIRS Suomi-NPP</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Data Range
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          >
            <option value={1}>Last 24 Hours</option>
            <option value={2}>Last 2 Days</option>
            <option value={3}>Last 3 Days</option>
            <option value={5}>Last 5 Days</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            FRP Threshold: {threshold} MW
          </label>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-3 w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>5 MW</span>
            <span>100 MW</span>
          </div>
        </div>
      </section>

      {loading && (
        <div className="rounded-xl bg-slate-900 p-6 text-center text-cyan-400">
          Analyzing satellite observations...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950 p-4 text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="High FRP Observations"
              value={anomalies.length.toLocaleString()}
            />
            <StatCard title="Total FRP" value={`${totalFRP.toFixed(2)} MW`} />
            <StatCard
              title="Average FRP"
              value={`${averageFRP.toFixed(2)} MW`}
            />
            <StatCard
              title="High Confidence"
              value={highConfidence.toLocaleString()}
            />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-5 text-xl font-bold">
              Top 10 FRP Observations
            </h2>

            {anomalies.length === 0 ? (
              <p className="text-slate-400">
                No observations meet the selected threshold.
              </p>
            ) : (
              <div className="space-y-4">
                {anomalies.slice(0, 10).map((fire, index) => {
                  const frp = Number(fire.frp ?? 0);
                  const maxFRP = Number(anomalies[0]?.frp ?? 1);

                  return (
                    <div key={`${fire.acq_date}-${fire.acq_time}-${index}`}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>Observation #{index + 1}</span>
                        <span className="text-red-400">
                          {frp.toFixed(2)} MW
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-600"
                          style={{ width: `${(frp / maxFRP) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5">
              <h2 className="text-xl font-bold">Anomaly Records</h2>
              <p className="mt-1 text-sm text-slate-400">
                {anomalies.length} observations meet the FRP threshold
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Latitude</th>
                    <th className="p-4">Longitude</th>
                    <th className="p-4">FRP MW</th>
                    <th className="p-4">Confidence</th>
                    <th className="p-4">Satellite</th>
                    <th className="p-4">Screening</th>
                  </tr>
                </thead>

                <tbody>
                  {anomalies.slice(0, 100).map((fire, index) => (
                    <tr
                      key={`${fire.acq_date}-${fire.acq_time}-${index}`}
                      className="border-t border-slate-800 hover:bg-slate-800/50"
                    >
                      <td className="p-4">{fire.acq_date ?? "N/A"}</td>
                      <td className="p-4">{Number(fire.latitude ?? 0).toFixed(4)}</td>
                      <td className="p-4">{Number(fire.longitude ?? 0).toFixed(4)}</td>
                      <td className="p-4 font-bold text-red-400">
                        {Number(fire.frp ?? 0).toFixed(2)}
                      </td>
                      <td className="p-4">{fire.confidence ?? "N/A"}</td>
                      <td className="p-4">{fire.satellite ?? source}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                          FRP threshold met
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-slate-400">
            Scientific note: This is exploratory FRP threshold screening. A
            high FRP observation does not independently establish a wildfire
            or an abnormal event. Validation against regional and temporal
            baselines is required.
          </p>
        </>
      )}
    </main>
  );
};

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-orange-400">{value}</h3>
    </div>
  );
}

export default AnomalyExplorer;

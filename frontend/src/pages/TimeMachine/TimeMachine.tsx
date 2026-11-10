
import { useEffect, useMemo, useState } from "react";
import {
  fetchFireDetections,
  type FireDetection,
} from "../../services/fireService";

const TimeMachine = () => {
  const [fires, setFires] = useState<FireDetection[]>([]);
  const [source, setSource] = useState("VIIRS_NOAA21_NRT");
  const [days, setDays] = useState(5);
  const [selectedDate, setSelectedDate] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadFires = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchFireDetections(source, days);

        if (active) {
          setFires(response.detections ?? []);
        }
      } catch (err) {
        console.error(err);

        if (active) {
          setError("Unable to load NASA FIRMS detections.");
          setFires([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFires();

    return () => {
      active = false;
    };
  }, [source, days]);

  const dates = useMemo(
    () =>
      [
        ...new Set(
          fires
            .map((fire) => fire.acq_date)
            .filter((date): date is string => Boolean(date))
        ),
      ].sort((a, b) => b.localeCompare(a)),
    [fires]
  );

  const filteredFires = useMemo(
    () =>
      selectedDate === "all"
        ? fires
        : fires.filter((fire) => fire.acq_date === selectedDate),
    [fires, selectedDate]
  );

  const totalFRP = filteredFires.reduce(
    (sum, fire) => sum + Number(fire.frp ?? 0),
    0
  );

  const averageFRP =
    filteredFires.length > 0 ? totalFRP / filteredFires.length : 0;

  const formatTime = (time: string | null) => {
    if (!time) return "N/A";

    const value = String(time).padStart(4, "0");
    return `${value.slice(0, 2)}:${value.slice(2, 4)} UTC`;
  };

  return (
    <main className="min-h-screen space-y-6 bg-slate-950 p-4 text-white md:p-8">
      <header>
        <p className="text-sm uppercase tracking-widest text-orange-400">
          FireHarmonizer / TimeMachine
        </p>
        <h1 className="mt-2 text-3xl font-bold">Fire Detection Timeline</h1>
        <p className="mt-2 text-slate-400">
          Explore recent satellite hotspot observations.
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
            Recent Data Range
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
            Detection Date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3"
          >
            <option value="all">All Available Dates</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </section>

      {loading && (
        <p className="rounded-xl bg-slate-900 p-6 text-center text-cyan-400">
          Loading NASA observations...
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-950 p-4 text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Detections"
              value={filteredFires.length.toLocaleString()}
            />
            <StatCard title="Total FRP" value={`${totalFRP.toFixed(2)} MW`} />
            <StatCard
              title="Average FRP"
              value={`${averageFRP.toFixed(2)} MW`}
            />
            <StatCard title="Dates Available" value={String(dates.length)} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-5 text-xl font-bold">Daily Timeline</h2>

            {dates.length === 0 ? (
              <p className="text-slate-400">No records available.</p>
            ) : (
              <div className="space-y-4">
                {dates
                  .filter(
                    (date) =>
                      selectedDate === "all" || selectedDate === date
                  )
                  .map((date) => {
                    const count = filteredFires.filter(
                      (fire) => fire.acq_date === date
                    ).length;

                    const maxCount = Math.max(
                      ...dates.map(
                        (d) =>
                          fires.filter((fire) => fire.acq_date === d).length
                      ),
                      1
                    );

                    return (
                      <div key={date}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span>{date}</span>
                          <span className="text-orange-400">
                            {count} observations
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                              width: `${(count / maxCount) * 100}%`,
                            }}
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
              <h2 className="text-xl font-bold">Detection Records</h2>
              <p className="mt-1 text-sm text-slate-400">
                Showing {Math.min(filteredFires.length, 100)} of{" "}
                {filteredFires.length} records
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Time UTC</th>
                    <th className="p-4">Latitude</th>
                    <th className="p-4">Longitude</th>
                    <th className="p-4">FRP MW</th>
                    <th className="p-4">Confidence</th>
                    <th className="p-4">Satellite</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFires.slice(0, 100).map((fire, index) => (
                    <tr
                      key={`${fire.acq_date}-${fire.acq_time}-${index}`}
                      className="border-t border-slate-800 hover:bg-slate-800/50"
                    >
                      <td className="p-4">{fire.acq_date ?? "N/A"}</td>
                      <td className="p-4">{formatTime(fire.acq_time)}</td>
                      <td className="p-4">{Number(fire.latitude ?? 0).toFixed(4)}</td>
                      <td className="p-4">{Number(fire.longitude ?? 0).toFixed(4)}</td>
                      <td className="p-4 text-orange-400">
                        {Number(fire.frp ?? 0).toFixed(2)}
                      </td>
                      <td className="p-4">{fire.confidence ?? "N/A"}</td>
                      <td className="p-4">{fire.satellite ?? source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-slate-400">
            Scientific note: Satellite detections indicate thermal anomalies,
            not independently confirmed ground fires. FIRMS NRT data is limited
            to its available recent-data window.
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

export default TimeMachine;

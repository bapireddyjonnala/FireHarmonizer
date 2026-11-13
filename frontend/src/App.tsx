import FireMap from "./components/fire-map/FireMap";
import HarmonizationLab from "./pages/HarmonizationLab/HarmonizationLab";
import TimeMachine from "./pages/TimeMachine/TimeMachine";
import AnomalyExplorer from "./pages/AnomalyExplorer/AnomalyExplorer";
import FireCalendar from "./pages/FireCalendar/FireCalendar";
import Reports from "./pages/Reports/Reports";
import { fetchFireDetections } from "./services/fireService";
import { useEffect, useState } from "react";

import {
  Activity,
  CalendarDays,
  FileText,
  Flame,
  Globe2,
  Layers3,
  Menu,
  Radio,
  Satellite,
  Search,
  TrendingUp,
  X,
} from "lucide-react";

interface Metrics {
  active: number;
  modis: number;
  viirs: number;
  loading: boolean;
  error: boolean;
}

const stats = [
  {
    title: "Active Fire Observations",
    subtitle: "MODIS + VIIRS (5-day window)",
    icon: Flame,
  },
  {
    title: "MODIS Observations",
    subtitle: "Terra + Aqua (5 days)",
    icon: Satellite,
  },
  {
    title: "VIIRS Observations",
    subtitle: "VIIRS NOAA-21 375m (5 days)",
    icon: Radio,
  },
  {
    title: "Harmonization Status",
    subtitle: "Sensor pipeline status",
    icon: Activity,
  },
];

const navigation = [
  { name: "Overview", icon: Layers3 },
  { name: "Fire Calendar", icon: CalendarDays },
  { name: "Harmonization Lab", icon: Activity },
  { name: "Time Machine", icon: Globe2 },
  { name: "Anomaly Explorer", icon: TrendingUp },
  { name: "Reports", icon: FileText },
];

export default function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer if viewport is resized to desktop breakpoint (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isItemActive = (itemName: string) => {
    if (activePage === itemName) return true;
    if (itemName === "Time Machine" && activePage === "Fire Time Machine") return true;
    if (itemName === "Fire Time Machine" && activePage === "Time Machine") return true;
    return false;
  };

  const [metrics, setMetrics] = useState<Metrics>({
    active: 0,
    modis: 0,
    viirs: 0,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    const loadMetrics = async () => {
      try {
        const [modisResponse, viirsResponse] = await Promise.all([
          fetchFireDetections("MODIS_NRT", 5),
          fetchFireDetections("VIIRS_NOAA21_NRT", 5),
        ]);

        if (!active) return;

        const modisCount = Number(
          modisResponse?.count ?? modisResponse?.detections?.length ?? 0
        );
        const viirsCount = Number(
          viirsResponse?.count ?? viirsResponse?.detections?.length ?? 0
        );

        setMetrics({
          active: modisCount + viirsCount,
          modis: modisCount,
          viirs: viirsCount,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("Metrics loading error:", error);

        if (!active) return;

        setMetrics({
          active: 0,
          modis: 0,
          viirs: 0,
          loading: false,
          error: true,
        });
      }
    };

    loadMetrics();

    return () => {
      active = false;
    };
  }, []);

  const getStatValue = (title: string) => {
    if (metrics.loading) {
      return "Loading...";
    }

    if (metrics.error) {
      return "API Error";
    }

    switch (title) {
      case "Active Fire Observations":
        return metrics.active.toLocaleString();

      case "MODIS Observations":
        return metrics.modis.toLocaleString();

      case "VIIRS Observations":
        return metrics.viirs.toLocaleString();

      case "Harmonization Status":
        return metrics.loading ? "Checking..." : metrics.error ? "Offline" : "Active";

      default:
        return "—";
    }
  };

  return (
    <div className="min-h-screen bg-[#080d18] text-slate-200">
      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-800 bg-[#0b1220] p-5 lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/15 p-3">
            <Flame className="text-orange-400" size={26} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              FireHarmonizer
            </h1>

            <p className="text-xs text-slate-500">
              EARTH INTELLIGENCE
            </p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.name);

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-orange-500/15 font-medium text-orange-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Satellite size={18} className="text-cyan-400" />
            NASA FIRMS
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {metrics.loading
              ? "Loading satellite data..."
              : metrics.error
                ? "Data connection failed"
                : "Satellite data connected"}
          </p>
        </div>
      </aside>

      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE SLIDE-OUT DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-800 bg-[#0b1220] p-5 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500/15 p-2.5">
              <Flame className="text-orange-400" size={24} />
            </div>

            <div>
              <h1 className="text-base font-bold text-white">
                FireHarmonizer
              </h1>

              <p className="text-[10px] tracking-widest text-slate-500">
                EARTH INTELLIGENCE
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close mobile menu"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.name);

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-orange-500/15 font-medium text-orange-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Satellite size={18} className="text-cyan-400" />
              NASA FIRMS
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {metrics.loading
                ? "Loading satellite data..."
                : metrics.error
                  ? "Data connection failed"
                  : "Satellite data connected"}
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="lg:ml-64">
        {/* HEADER */}

        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            {/* MOBILE HAMBURGER BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-400">
                Earth Observation Platform
              </p>

              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {activePage === "Overview"
                  ? "Fire Intelligence Dashboard"
                  : activePage}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                MODIS + VIIRS historical fire activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <Search size={17} className="text-slate-500" />

            <span className="text-sm text-slate-400">
              Search region...
            </span>
          </div>
        </header>

        {/* PAGE ROUTING */}

        {activePage === "Harmonization Lab" ? (
          <HarmonizationLab />
        ) : activePage === "Time Machine" || activePage === "Fire Time Machine" ? (
          <TimeMachine />
        ) : activePage === "Fire Calendar" ? (
          <FireCalendar />
        ) : activePage === "Anomaly Explorer" ? (
          <AnomalyExplorer />
        ) : activePage === "Reports" ? (
          <Reports />
        ) : activePage === "Overview" ? (
          /* OVERVIEW DASHBOARD */

          <section className="space-y-8 p-6 lg:p-10">
            {/* STATISTICS */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-slate-800 bg-[#0d1524] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">
                        {stat.title}
                      </p>

                      <Icon
                        size={20}
                        className="text-orange-400"
                      />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-white">
                      {getStatValue(stat.title)}
                    </h3>

                    <p className="mt-2 text-xs text-slate-500">
                      {stat.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* MAP AND DATA PIPELINE */}

            <div className="grid gap-6 xl:grid-cols-3">
              {/* FIRE MAP */}

              <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6 xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">
                      Global Fire Activity
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Satellite hotspot visualization
                    </p>
                  </div>

                  <span className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400">
                    MODIS + VIIRS
                  </span>
                </div>

                <div className="mt-6 h-[420px] overflow-hidden rounded-xl border border-slate-800">
                  <FireMap />
                </div>
              </div>

              {/* PIPELINE */}

              <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
                <h3 className="font-semibold text-white">
                  Data Pipeline
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Processing status
                </p>

                <div className="mt-6 space-y-5">
                  {[
                    {
                      name: "NASA FIRMS Data Acquisition",
                      active: !metrics.loading && !metrics.error,
                    },
                    {
                      name: "MODIS Data Processing",
                      active: !metrics.loading && !metrics.error && metrics.modis > 0,
                    },
                    {
                      name: "VIIRS Data Processing",
                      active: !metrics.loading && !metrics.error && metrics.viirs > 0,
                    },
                    {
                      name: "Sensor Harmonization",
                      active: !metrics.loading && !metrics.error,
                    },
                    {
                      name: "Activity Calendar Generation",
                      active: !metrics.loading && !metrics.error,
                    },
                  ].map((task) => (
                    <div key={task.name}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            task.active
                              ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                              : metrics.loading
                              ? "animate-pulse bg-amber-400"
                              : "bg-slate-600"
                          }`}
                        />

                        <p
                          className={`text-sm ${
                            task.active ? "text-slate-200" : "text-slate-400"
                          }`}
                        >
                          {task.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-500">
                    System Status
                  </p>

                  <p
                    className={`mt-2 text-sm font-medium ${
                      metrics.loading
                        ? "text-amber-400"
                        : metrics.error
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {metrics.loading
                      ? "Loading NASA Data..."
                      : metrics.error
                      ? "API Connection Error"
                      : "NASA Data Pipeline Active"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIVITY CALENDAR */}

            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    className="text-cyan-400"
                    size={22}
                  />

                  <div>
                    <h3 className="font-semibold text-white">
                      Burning Activity Calendar
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Historical fire activity by date
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage("Fire Calendar")}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-cyan-400 transition hover:bg-slate-800"
                >
                  Open Fire Calendar &rarr;
                </button>
              </div>

              <div className="mt-6 flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 p-6 text-center">
                <p className="text-sm text-slate-400">
                  Daily observation aggregations and fire radiative power distributions are available.
                </p>
                <button
                  onClick={() => setActivePage("Fire Calendar")}
                  className="rounded-lg bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-400 transition hover:bg-cyan-500/20"
                >
                  Explore Daily Calendar &rarr;
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* OTHER PAGES */

          <section className="p-6 lg:p-10">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1524] p-8">
              <h3 className="text-xl font-semibold text-white">
                {activePage}
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                This module is under development.
              </p>

              <button
                onClick={() => setActivePage("Overview")}
                className="mt-6 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Back to Overview
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
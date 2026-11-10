
import { useEffect, useState } from "react";
import IncidentImages from "./IncidentImages";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  Rectangle,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  fetchFireDetections,
  type FireDetection,
  type AOIBounds,
} from "../../services/fireService";

import type { LatLng } from "leaflet";

type ConfidenceStyle = {
  color: string;
  fillColor: string;
  label: string;
};

function getConfidenceStyle(
  confidence: string | number | null
): ConfidenceStyle {
  const value = String(confidence ?? "").trim().toLowerCase();

  if (["h", "high"].includes(value)) {
    return {
      color: "#ef4444",
      fillColor: "#ef4444",
      label: "High",
    };
  }

  if (["n", "nominal", "medium"].includes(value)) {
    return {
      color: "#f97316",
      fillColor: "#f97316",
      label: "Nominal",
    };
  }

  if (["l", "low"].includes(value)) {
    return {
      color: "#eab308",
      fillColor: "#eab308",
      label: "Low",
    };
  }

  const numericValue = Number(value);

  if (value !== "" && Number.isFinite(numericValue)) {
    if (numericValue >= 80) {
      return {
        color: "#ef4444",
        fillColor: "#ef4444",
        label: "High",
      };
    }

    if (numericValue >= 30) {
      return {
        color: "#f97316",
        fillColor: "#f97316",
        label: "Nominal",
      };
    }

    return {
      color: "#eab308",
      fillColor: "#eab308",
      label: "Low",
    };
  }

  return {
    color: "#94a3b8",
    fillColor: "#94a3b8",
    label: "Unknown",
  };
}

// NASA GIBS imagery tile URL
function getGibsTileUrl(
  latitude: number,
  longitude: number,
  date: string | null
): string | null {
  if (!date) return null;

  const formattedDate = date.split("T")[0];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
    return null;
  }

  const parsedDate = new Date(`${formattedDate}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const zoom = 7;
  const tileCount = Math.pow(2, zoom);

  const x = Math.floor(
    ((longitude + 180) / 360) * tileCount
  );

  const lat = Math.max(-85.0511, Math.min(85.0511, latitude));
  const latRadians = (lat * Math.PI) / 180;

  const y = Math.floor(
    ((1 -
      Math.log(
        Math.tan(latRadians) + 1 / Math.cos(latRadians)
      ) /
        Math.PI) /
      2) *
      tileCount
  );

  const safeX = Math.max(0, Math.min(tileCount - 1, x));
  const safeY = Math.max(0, Math.min(tileCount - 1, y));

  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${formattedDate}/GoogleMapsCompatible_Level9/${zoom}/${safeY}/${safeX}.jpg`;
}

// Satellite imagery preview
function IncidentImagery({ fire }: { fire: FireDetection }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = getGibsTileUrl(
    fire.latitude,
    fire.longitude,
    fire.acq_date
  );

  useEffect(() => {
    setImageError(false);
    setImageLoading(true);
  }, [imageUrl]);

  return (
    <div className="mt-3">
      <h3 className="mb-2 text-sm font-bold text-slate-800">
        🛰️ Satellite Imagery
      </h3>

      <div className="relative h-[190px] w-full overflow-hidden rounded-lg bg-slate-200">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-slate-600">
                Loading NASA imagery...
              </div>
            )}

            <img
              src={imageUrl}
              alt="NASA MODIS satellite imagery near detection"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              className="h-full w-full object-cover"
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-slate-600">
            <span className="text-3xl">🛰️</span>
            <strong>Satellite imagery unavailable</strong>
            <span className="px-3 text-xs">
              Imagery may not be available for this date.
            </span>
          </div>
        )}
      </div>

      <p className="mt-1 text-xs text-slate-500">
        NASA GIBS — MODIS Terra True Color
      </p>
      <p className="mt-1 text-xs text-amber-700">
        Satellite imagery is not a ground-level incident photograph.
      </p>
    </div>
  );
}

// Map click handler for two-corner AOI selection
function AOIMapClick({
  enabled,
  onMapClick,
}: {
  enabled: boolean;
  onMapClick: (point: LatLng) => void;
}) {
  useMapEvents({
    click(event) {
      if (enabled) {
        onMapClick(event.latlng);
      }
    },
  });

  return null;
}

export default function FireMap() {
  const [fires, setFires] = useState<FireDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [source, setSource] = useState("VIIRS_NOAA21_NRT");
  const [days, setDays] = useState(5);

  const [selectingAOI, setSelectingAOI] = useState(false);
  const [firstCorner, setFirstCorner] = useState<LatLng | null>(null);
  const [aoi, setAoi] = useState<AOIBounds | null>(null);

  const [selectionMessage, setSelectionMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFires() {
      setLoading(true);
      setError("");

      try {
        const result = await fetchFireDetections(
          source,
          days,
          aoi ?? undefined
        );

        if (active) {
          setFires(result.detections ?? []);
        }
      } catch (err) {
        console.error("NASA FIRMS error:", err);

        if (active) {
          setFires([]);
          setError(
            "Unable to fetch NASA FIRMS data. Check backend connection."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFires();

    return () => {
      active = false;
    };
  }, [source, days, aoi]);

  function handleMapClick(point: LatLng) {
    if (!firstCorner) {
      setFirstCorner(point);
      setSelectionMessage("First corner selected. Click the opposite corner.");
      return;
    }

    const west = Math.min(firstCorner.lng, point.lng);
    const east = Math.max(firstCorner.lng, point.lng);
    const south = Math.min(firstCorner.lat, point.lat);
    const north = Math.max(firstCorner.lat, point.lat);

    if (west === east || south === north) {
      setSelectionMessage(
        "Please select two different points to create a region."
      );
      return;
    }

    setAoi({ west, south, east, north });
    setFirstCorner(null);
    setSelectingAOI(false);
    setSelectionMessage("Selected region applied successfully.");
  }

  function startAOISelection() {
    setFirstCorner(null);
    setAoi(null);
    setSelectingAOI(true);
    setSelectionMessage("Click the first corner of your region.");
  }

  function clearAOI() {
    setAoi(null);
    setFirstCorner(null);
    setSelectingAOI(false);
    setSelectionMessage("Showing all India observations.");
  }

  function cancelAOISelection() {
    setFirstCorner(null);
    setSelectingAOI(false);
    setSelectionMessage("AOI selection cancelled.");
  }

  const validFires = fires.filter(
    (fire) =>
      Number.isFinite(fire.latitude) &&
      Number.isFinite(fire.longitude)
  );

  const displayFires = validFires.slice(0, 2500);

  const confidenceCounts: Record<string, number> = {
    High: 0,
    Nominal: 0,
    Low: 0,
    Unknown: 0,
  };

  validFires.forEach((fire) => {
    const label = getConfidenceStyle(fire.confidence).label;
    confidenceCounts[label] = (confidenceCounts[label] || 0) + 1;
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Map controls */}
      <div className="absolute left-3 top-3 z-[1000] flex max-w-[85%] flex-wrap gap-2">
        <select
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs font-medium text-white shadow-lg"
        >
          <option value="VIIRS_NOAA21_NRT">VIIRS NOAA-21 (Primary)</option>
          <option value="MODIS_NRT">MODIS (Terra + Aqua)</option>
          <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20</option>
          <option value="VIIRS_SNPP_NRT">VIIRS Suomi-NPP</option>
        </select>

        <select
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs font-medium text-white shadow-lg"
        >
          <option value={1}>1 Day</option>
          <option value={2}>2 Days</option>
          <option value={3}>3 Days</option>
          <option value={5}>5 Days</option>
        </select>

        {!selectingAOI ? (
          <button
            onClick={startAOISelection}
            className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-cyan-500"
          >
            Select Region
          </button>
        ) : (
          <button
            onClick={cancelAOISelection}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-red-500"
          >
            Cancel Selection
          </button>
        )}

        {aoi && (
          <button
            onClick={clearAOI}
            className="rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-slate-600"
          >
            Clear Region
          </button>
        )}
      </div>

      {/* Status */}
      <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-2">
        {loading && (
          <div className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-cyan-400">
            Loading NASA observations...
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Selection instructions */}
      {(selectingAOI || selectionMessage) && (
        <div className="absolute left-3 top-[58px] z-[999] max-w-[320px] rounded-lg border border-cyan-500/40 bg-slate-900/95 px-3 py-2 text-xs text-cyan-300 shadow-lg">
          {selectingAOI
            ? selectionMessage
            : selectionMessage}
        </div>
      )}

      {/* Detection counter */}
      {!loading && !error && (
        <div className="absolute bottom-3 left-3 z-[1000] rounded-lg bg-slate-900/95 px-3 py-2 text-xs font-medium text-white shadow-lg">
          <div>
            Detections: {validFires.length.toLocaleString()}
          </div>

          {validFires.length > 2500 && (
            <div className="text-amber-400">
              Displaying 2,500 observations
            </div>
          )}

          {aoi && (
            <div className="mt-1 text-cyan-400">
              AOI filtered observations
            </div>
          )}
        </div>
      )}

      {/* Confidence legend */}
      <div className="absolute bottom-3 right-3 z-[1000] rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs text-white">
        <p className="mb-2 font-semibold">Detection Confidence</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            High ({confidenceCounts.High.toLocaleString()})
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            Nominal ({confidenceCounts.Nominal.toLocaleString()})
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            Low ({confidenceCounts.Low.toLocaleString()})
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-400" />
            Unknown ({confidenceCounts.Unknown.toLocaleString()})
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[22.5, 82.0]}
        zoom={4}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
      >
        <ZoomControl position="topright" />

        <AOIMapClick
          enabled={selectingAOI}
          onMapClick={handleMapClick}
        />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* First corner indicator */}
        {firstCorner && (
          <CircleMarker
            center={firstCorner}
            radius={8}
            pathOptions={{
              color: "#06b6d4",
              fillColor: "#06b6d4",
              fillOpacity: 1,
            }}
          />
        )}

        {/* Selected AOI rectangle */}
        {aoi && (
          <Rectangle
            bounds={[
              [aoi.south, aoi.west],
              [aoi.north, aoi.east],
            ]}
            pathOptions={{
              color: "#06b6d4",
              fillColor: "#06b6d4",
              fillOpacity: 0.12,
              weight: 2,
              dashArray: "6 5",
            }}
          />
        )}

        {/* Fire markers */}
        {displayFires.map((fire, index) => {
          const style = getConfidenceStyle(fire.confidence);

          return (
            <CircleMarker
              key={`${fire.latitude}-${fire.longitude}-${index}`}
              center={[fire.latitude, fire.longitude]}
              radius={6}
              pathOptions={{
                color: style.color,
                fillColor: style.fillColor,
                fillOpacity: 0.8,
                weight: 1,
              }}
            >
              <Popup
                maxWidth={360}
                minWidth={300}
                autoPan
                autoPanPadding={[30, 30]}
                className="fire-incident-popup"
              >
                <div
                  style={{
                    width: "300px",
                    maxWidth: "100%",
                    maxHeight: "420px",
                    overflowY: "auto",
                    padding: "5px",
                    fontFamily: "Arial, sans-serif",
                    color: "#1e293b",
                  }}
                >
                  <div className="border-b border-slate-200 pb-2">
                    <h2 className="text-base font-bold">
                      🔥 Fire Incident Details
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      NASA FIRMS Satellite Detection
                    </p>
                  </div>

                  <IncidentImagery fire={fire} />

                  <IncidentImages
                    latitude={fire.latitude}
                    longitude={fire.longitude}
                    incidentDate={fire.acq_date}
                  />

                  <div className="mt-3 space-y-1 text-sm leading-6">
                    <div>
                      <strong>Latitude:</strong>{" "}
                      {fire.latitude.toFixed(5)}
                    </div>

                    <div>
                      <strong>Longitude:</strong>{" "}
                      {fire.longitude.toFixed(5)}
                    </div>

                    <div>
                      <strong>Confidence:</strong> {style.label}
                    </div>

                    <div>
                      <strong>Raw Confidence:</strong>{" "}
                      {fire.confidence ?? "N/A"}
                    </div>

                    <div>
                      <strong>Brightness:</strong>{" "}
                      {fire.brightness ?? "N/A"}
                    </div>

                    <div>
                      <strong>FRP:</strong>{" "}
                      {fire.frp ?? "N/A"} MW
                    </div>

                    <div>
                      <strong>Date:</strong>{" "}
                      {fire.acq_date ?? "N/A"}
                    </div>

                    <div>
                      <strong>Time:</strong>{" "}
                      {fire.acq_time ?? "N/A"} UTC
                    </div>

                    <div>
                      <strong>Satellite:</strong>{" "}
                      {fire.satellite ?? source}
                    </div>

                    <div>
                      <strong>Day/Night:</strong>{" "}
                      {fire.daynight ?? "N/A"}
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

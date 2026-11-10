import { useEffect, useState } from "react";

import {
  fetchIncidentImages,
  type IncidentImage,
} from "../../services/incidentImageService";

interface IncidentImagesProps {
  latitude: number;
  longitude: number;
  incidentDate: string | null;
}

export default function IncidentImages({
  latitude,
  longitude,
  incidentDate,
}: IncidentImagesProps) {
  const [images, setImages] = useState<IncidentImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadImages() {
      setLoading(true);
      setError("");
      setImages([]);

      try {
        const result = await fetchIncidentImages(
          latitude,
          longitude,
          incidentDate
        );

        if (active) {
          setImages(result.images ?? []);
          setMessage(result.message ?? "");
        }
      } catch (err) {
        console.error("Incident image search failed:", err);

        if (active) {
          setError(
            "Unable to load incident photographs. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      active = false;
    };
  }, [latitude, longitude, incidentDate]);

  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">
          📸 Related Fire Incident Photos
        </h3>

        <span className="text-xs text-slate-500">
          {images.length} found
        </span>
      </div>

      {loading && (
        <div className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
          Searching news sources for related fire photographs...
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && images.length === 0 && (
        <div className="rounded-lg bg-slate-100 p-4">
          <p className="text-sm font-semibold text-slate-700">
            No verified incident photographs available.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {message || "Try another fire detection or location."}
          </p>
        </div>
      )}

      {!loading && images.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {images.map((item, index) => (
            <article
              key={`${item.article_url}-${index}`}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <a
                href={item.article_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-40 w-full bg-slate-200 object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </a>

              <div className="space-y-2 p-3">
                <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                  {item.title}
                </p>

                <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-500">
                  <span>{item.source}</span>
                  <span>{item.published_at || "Date unavailable"}</span>
                </div>

                <span className="inline-block rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-700">
                  Related report — not hotspot verified
                </span>

                <a
                  href={item.article_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold text-cyan-700 hover:underline"
                >
                  Read original report →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs leading-5 text-slate-500">
        News photographs are sourced from external articles. They may
        show nearby or related fire incidents and are not necessarily
        photographs of this exact satellite detection.
      </p>
    </div>
  );
}
/**
 * Unified API Configuration for FireHarmonizer
 *
 * In local development, defaults to: http://127.0.0.1:8000/api
 * In production (Vercel), reads VITE_API_BASE_URL (or VITE_API_URL) pointing to the Render backend:
 * e.g. https://fireharmonizer-api.onrender.com/api
 */

function resolveApiBaseUrl(): string {
  const envUrl =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL;

  if (envUrl && typeof envUrl === "string") {
    const trimmed = envUrl.trim().replace(/\/+$/, "");
    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
  }

  return "http://127.0.0.1:8000/api";
}

export const API_BASE_URL = resolveApiBaseUrl();


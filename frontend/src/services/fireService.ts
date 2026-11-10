
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export interface FireDetection {
  latitude: number;
  longitude: number;
  brightness: number | null;
  confidence: string | null;
  frp: number | null;
  acq_date: string | null;
  acq_time: string | null;
  satellite: string | null;
  daynight: string | null;
}

export interface AOIBounds {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface FireResponse {
  source: string;
  count: number;
  detections: FireDetection[];
  region?: AOIBounds | string;
}

// --------------------------------------------------
// CLIENT-SIDE IN-MEMORY TTL CACHE (5 minutes)
// --------------------------------------------------
interface CacheEntry {
  data: FireResponse;
  timestamp: number;
}

const clientCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<FireResponse>>();
const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function clearFireCache(): void {
  clientCache.clear();
  inFlightRequests.clear();
}

export async function fetchFireDetections(
  source: string = "VIIRS_NOAA21_NRT",
  days: number = 5,
  bounds?: AOIBounds,
  forceRefresh: boolean = false
): Promise<FireResponse> {
  const cacheKey = `${source}:${days}:${JSON.stringify(bounds ?? {})}`;

  if (!forceRefresh) {
    const cached = clientCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CLIENT_CACHE_TTL_MS) {
      return cached.data;
    }
    const inFlight = inFlightRequests.get(cacheKey);
    if (inFlight) {
      return inFlight;
    }
  }

  const reqPromise = (async () => {
    try {
      const response = await axios.get<FireResponse>(
        `${API_BASE_URL}/fires`,
        {
          params: {
            source,
            days,
            ...(bounds ?? {}),
          },
          timeout: 180000,
        }
      );

      clientCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED" || (error.message && error.message.includes("timeout"))) {
          throw new Error(
            `Request timed out after 180s while downloading ${source}. NASA FIRMS server may be busy.`
          );
        }
        if (error.response?.data && typeof error.response.data === "object" && "detail" in error.response.data) {
          throw new Error(String(error.response.data.detail));
        }
        if (!error.response) {
          throw new Error(
            `Unable to connect to FireHarmonizer backend at ${API_BASE_URL}. Ensure the backend server is running.`
          );
        }
      }
      throw error;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, reqPromise);
  return reqPromise;
}

import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export interface IncidentImage {
  title: string;
  image_url: string;
  article_url: string;
  source: string;
  published_at: string | null;
  location: string;
  image_type: string;
  verified_for_exact_hotspot: boolean;
}

export interface IncidentImageResponse {
  location: string;
  latitude: number;
  longitude: number;
  incident_date: string | null;
  count: number;
  images: IncidentImage[];
  message: string;
}

export async function fetchIncidentImages(
  latitude: number,
  longitude: number,
  incidentDate?: string | null
): Promise<IncidentImageResponse> {
  const response = await axios.get<IncidentImageResponse>(
    `${API_BASE_URL}/incident-images`,
    {
      params: {
        latitude,
        longitude,
        incident_date: incidentDate || undefined,
      },
      timeout: 35000,
    }
  );

  return response.data;
}
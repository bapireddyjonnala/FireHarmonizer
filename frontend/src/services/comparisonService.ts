
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export interface SensorStatistics {
  source: string;
  observation_count: number;
  frp_sum_mw: number;
  frp_mean_mw: number | null;
  confidence_distribution: Record<string, number>;
}

export interface ComparisonResponse {
  period_days: number;
  region: string;
  comparison_type: string;
  modis: SensorStatistics;
  viirs: SensorStatistics;
  observation_count_difference: number;
  methodology_note: string;
}

export async function fetchSensorComparison(
  days: number = 5
): Promise<ComparisonResponse> {
  const response = await axios.get<ComparisonResponse>(
    `${API_BASE_URL}/comparison`,
    {
      params: { days },
      timeout: 60000,
    }
  );

  return response.data;
}

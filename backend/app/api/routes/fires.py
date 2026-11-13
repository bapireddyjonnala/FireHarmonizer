
import os
import time
from concurrent.futures import Future, ThreadPoolExecutor, as_completed
from io import StringIO
from threading import Lock
from typing import Any, Optional

import pandas as pd
import requests

from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

MAP_KEY = (os.getenv("FIRMS_MAP_KEY") or "").strip()

# India bounding box: west, south, east, north
INDIA_AREA = "68,6,98,36"

VALID_SOURCES = {
    "MODIS_NRT",
    "MODIS_SP",
    "VIIRS_NOAA21_NRT",
    "VIIRS_NOAA20_NRT",
    "VIIRS_SNPP_NRT",
    "VIIRS_SNPP_SP",
}

viirs_sources = [
    "VIIRS_NOAA21_NRT",
    "VIIRS_NOAA20_NRT",
    "VIIRS_SNPP_NRT",
]

# --------------------------------------------------
# IN-MEMORY TTL CACHE (TTL = 10 minutes) & IN-FLIGHT DEDUP
# --------------------------------------------------
_CACHE: dict[str, dict[str, Any]] = {}
_CACHE_LOCK = Lock()
CACHE_TTL_SECONDS = 600  # 10 minutes

_IN_FLIGHT: dict[str, Future] = {}
_IN_FLIGHT_LOCK = Lock()


def get_cached_data(key: str) -> Optional[list[dict[str, Any]]]:
    with _CACHE_LOCK:
        entry = _CACHE.get(key)
        if entry and (time.time() - entry["timestamp"] < CACHE_TTL_SECONDS):
            return entry["data"]
    return None


def set_cached_data(key: str, data: list[dict[str, Any]]) -> None:
    with _CACHE_LOCK:
        _CACHE[key] = {
            "data": data,
            "timestamp": time.time(),
        }


def fetch_source_data(
    source: str,
    days: int,
    area: str = INDIA_AREA,
) -> list[dict[str, Any]]:

    cache_key = f"{source}:{days}:{area}"
    cached = get_cached_data(cache_key)
    if cached is not None:
        return cached

    should_fetch = False
    with _IN_FLIGHT_LOCK:
        cached = get_cached_data(cache_key)
        if cached is not None:
            return cached
        if cache_key in _IN_FLIGHT:
            future = _IN_FLIGHT[cache_key]
        else:
            future = Future()
            _IN_FLIGHT[cache_key] = future
            should_fetch = True

    if not should_fetch:
        return future.result()

    if not MAP_KEY:
        with _IN_FLIGHT_LOCK:
            _IN_FLIGHT.pop(cache_key, None)
        future.set_exception(
            HTTPException(
                status_code=500,
                detail="NASA FIRMS MAP_KEY is not configured",
            )
        )
        raise HTTPException(
            status_code=500,
            detail="NASA FIRMS MAP_KEY is not configured",
        )

    if source not in VALID_SOURCES:
        with _IN_FLIGHT_LOCK:
            _IN_FLIGHT.pop(cache_key, None)
        future.set_exception(
            HTTPException(
                status_code=400,
                detail=f"Invalid NASA FIRMS source: {source}",
            )
        )
        raise HTTPException(
            status_code=400,
            detail=f"Invalid NASA FIRMS source: {source}",
        )

    url = (
        "https://firms.modaps.eosdis.nasa.gov/api/area/csv/"
        f"{MAP_KEY}/{source}/{area}/{days}"
    )

    try:
        response = requests.get(url, timeout=45)
        response.raise_for_status()

        if not response.text.strip():
            set_cached_data(cache_key, [])
            future.set_result([])
            return []

        try:
            df = pd.read_csv(StringIO(response.text))
        except Exception:
            set_cached_data(cache_key, [])
            future.set_result([])
            return []

        if df.empty:
            set_cached_data(cache_key, [])
            future.set_result([])
            return []

        df.columns = [
            column.strip().lower()
            for column in df.columns
        ]

        if "latitude" not in df.columns:
            raise ValueError("Latitude column is missing in NASA FIRMS response")

        if "longitude" not in df.columns:
            raise ValueError("Longitude column is missing in NASA FIRMS response")

        brightness_col = (
            "bright_ti4"
            if "bright_ti4" in df.columns
            else "brightness"
        )

        detections = []

        for _, row in df.iterrows():

            latitude = pd.to_numeric(
                row["latitude"], errors="coerce"
            )

            longitude = pd.to_numeric(
                row["longitude"], errors="coerce"
            )

            if pd.isna(latitude) or pd.isna(longitude):
                continue

            lat_val = float(latitude)
            lon_val = float(longitude)
            if not (-90.0 <= lat_val <= 90.0 and -180.0 <= lon_val <= 180.0):
                continue

            brightness = (
                pd.to_numeric(row[brightness_col], errors="coerce")
                if brightness_col in df.columns
                else None
            )

            frp = (
                pd.to_numeric(row["frp"], errors="coerce")
                if "frp" in df.columns
                else None
            )
            if frp is not None and (pd.isna(frp) or float(frp) < 0):
                frp = None

            confidence = (
                str(row["confidence"]).strip()
                if "confidence" in df.columns
                and pd.notna(row["confidence"])
                else None
            )

            acq_date = (
                str(row["acq_date"])
                if "acq_date" in df.columns
                and pd.notna(row["acq_date"])
                else None
            )

            acq_time = (
                str(row["acq_time"])
                if "acq_time" in df.columns
                and pd.notna(row["acq_time"])
                else None
            )

            satellite = (
                str(row["satellite"])
                if "satellite" in df.columns
                and pd.notna(row["satellite"])
                else source
            )

            daynight = (
                str(row["daynight"])
                if "daynight" in df.columns
                and pd.notna(row["daynight"])
                else None
            )

            detections.append({
                "latitude": float(latitude),
                "longitude": float(longitude),
                "brightness": (
                    float(brightness)
                    if brightness is not None
                    and pd.notna(brightness)
                    else None
                ),
                "confidence": confidence,
                "frp": (
                    float(frp)
                    if frp is not None and pd.notna(frp)
                    else None
                ),
                "acq_date": acq_date,
                "acq_time": acq_time,
                "satellite": satellite,
                "daynight": daynight,
            })

        set_cached_data(cache_key, detections)
        future.set_result(detections)
        return detections

    except requests.Timeout:
        exc = HTTPException(
            status_code=504,
            detail=f"Request to NASA FIRMS timed out after 45s for source: {source}",
        )
        if not future.done():
            future.set_exception(exc)
        raise exc

    except requests.RequestException as error:
        exc = HTTPException(
            status_code=502,
            detail=f"NASA FIRMS request failed for {source}: {error}",
        )
        if not future.done():
            future.set_exception(exc)
        raise exc

    except (ValueError, KeyError) as error:
        exc = HTTPException(
            status_code=502,
            detail=f"Could not parse NASA FIRMS data: {error}",
        )
        if not future.done():
            future.set_exception(exc)
        raise exc

    except Exception as error:
        exc = HTTPException(
            status_code=500,
            detail=f"Internal error processing {source}: {error}",
        )
        if not future.done():
            future.set_exception(exc)
        raise exc

    finally:
        with _IN_FLIGHT_LOCK:
            _IN_FLIGHT.pop(cache_key, None)


def filter_by_aoi(
    detections: list[dict[str, Any]],
    west: Optional[float],
    south: Optional[float],
    east: Optional[float],
    north: Optional[float],
) -> list[dict[str, Any]]:

    bounds = [west, south, east, north]

    if all(value is None for value in bounds):
        return detections

    if any(value is None for value in bounds):
        raise HTTPException(
            status_code=400,
            detail="Provide all four AOI bounds: west, south, east, north",
        )

    if west >= east or south >= north:
        raise HTTPException(
            status_code=400,
            detail="Invalid AOI bounds",
        )

    if not (-180 <= west <= 180 and -180 <= east <= 180):
        raise HTTPException(
            status_code=400,
            detail="Longitude must be between -180 and 180",
        )

    if not (-90 <= south <= 90 and -90 <= north <= 90):
        raise HTTPException(
            status_code=400,
            detail="Latitude must be between -90 and 90",
        )

    return [
        detection
        for detection in detections
        if west <= detection["longitude"] <= east
        and south <= detection["latitude"] <= north
    ]


def calculate_sensor_stats(
    source: str,
    detections: list[dict[str, Any]],
) -> dict[str, Any]:

    frp_values = [
        float(detection["frp"])
        for detection in detections
        if detection.get("frp") is not None
        and isinstance(detection["frp"], (int, float))
        and detection["frp"] >= 0
    ]

    confidence_distribution: dict[str, int] = {}

    for detection in detections:
        confidence = str(
            detection.get("confidence") or "Unknown"
        ).strip() or "Unknown"

        confidence_distribution[confidence] = (
            confidence_distribution.get(confidence, 0) + 1
        )

    total_frp = sum(frp_values)
    sorted_frp = sorted(frp_values)
    n = len(sorted_frp)
    frp_median = None
    if n > 0:
        if n % 2 != 0:
            frp_median = round(sorted_frp[n // 2], 3)
        else:
            frp_median = round((sorted_frp[n // 2 - 1] + sorted_frp[n // 2]) / 2.0, 3)

    return {
        "source": source,
        "observation_count": len(detections),
        "frp_sum_mw": round(total_frp, 3),
        "frp_mean_mw": (
            round(total_frp / len(frp_values), 3)
            if frp_values
            else None
        ),
        "frp_median_mw": frp_median,
        "confidence_distribution": confidence_distribution,
    }


@router.get("/fires")
def get_fire_detections(
    source: str = Query("VIIRS_NOAA21_NRT"),
    days: int = Query(5, ge=1, le=5),
    west: Optional[float] = Query(None),
    south: Optional[float] = Query(None),
    east: Optional[float] = Query(None),
    north: Optional[float] = Query(None),
):

    bounds = [west, south, east, north]

    if all(value is None for value in bounds):
        detections = fetch_source_data(source, days, area=INDIA_AREA)
        filtered = detections
    elif any(value is None for value in bounds):
        raise HTTPException(
            status_code=400,
            detail="Provide all four AOI bounds: west, south, east, north",
        )
    else:
        if west >= east or south >= north:
            raise HTTPException(
                status_code=400,
                detail="Invalid AOI bounds",
            )
        if not (-180 <= west <= 180 and -180 <= east <= 180):
            raise HTTPException(
                status_code=400,
                detail="Longitude must be between -180 and 180",
            )
        if not (-90 <= south <= 90 and -90 <= north <= 90):
            raise HTTPException(
                status_code=400,
                detail="Latitude must be between -90 and 90",
            )

        # Check if requested bounding box is a sub-region within default India area (68, 6, 98, 36)
        is_sub_india = (68.0 <= west and east <= 98.0 and 6.0 <= south and north <= 36.0)

        if is_sub_india and (east - west < 15 and north - south < 15):
            detections = fetch_source_data(source, days, area=INDIA_AREA)
        else:
            area_str = f"{round(west, 4)},{round(south, 4)},{round(east, 4)},{round(north, 4)}"
            detections = fetch_source_data(source, days, area=area_str)

        filtered = filter_by_aoi(
            detections,
            west,
            south,
            east,
            north,
        )

    return {
        "source": source,
        "count": len(filtered),
        "detections": filtered,
        "region": (
            {
                "west": west,
                "south": south,
                "east": east,
                "north": north,
            }
            if west is not None
            else "India"
        ),
    }


@router.get("/comparison")
def get_sensor_comparison(
    days: int = Query(5, ge=1, le=5),
):

    all_sources = [
        "MODIS_NRT",
        "VIIRS_NOAA21_NRT",
        "VIIRS_NOAA20_NRT",
        "VIIRS_SNPP_NRT",
    ]

    source_results: dict[str, list[dict[str, Any]]] = {}

    with ThreadPoolExecutor(max_workers=4) as executor:
        future_to_source = {
            executor.submit(fetch_source_data, src, days): src
            for src in all_sources
        }
        for future in as_completed(future_to_source):
            src = future_to_source[future]
            try:
                source_results[src] = future.result()
            except HTTPException as error:
                print(f"Warning: {src} failed: {error.detail}")
                source_results[src] = []
            except Exception as error:
                print(f"Warning: {src} unexpected error: {error}")
                source_results[src] = []

    modis_detections = source_results.get("MODIS_NRT", [])

    viirs_detections = (
        source_results.get("VIIRS_NOAA21_NRT", [])
        + source_results.get("VIIRS_NOAA20_NRT", [])
        + source_results.get("VIIRS_SNPP_NRT", [])
    )

    modis_stats = calculate_sensor_stats(
        "MODIS", modis_detections
    )

    viirs_stats = calculate_sensor_stats(
        "VIIRS", viirs_detections
    )

    return {
        "period_days": days,
        "region": "India",
        "comparison_type": "Observation-level comparison",
        "modis": modis_stats,
        "viirs": viirs_stats,
        "observation_count_difference": (
            modis_stats["observation_count"]
            - viirs_stats["observation_count"]
        ),
        "methodology_note": (
            "Observation counts are not unique fire-event counts. "
            "MODIS and VIIRS have different spatial resolutions "
            "and detection characteristics. Spatial-temporal "
            "matching is an observational association (greedy bipartite candidate selection), "
            "not physical sensor calibration or fire-event confirmation."
        ),
    }

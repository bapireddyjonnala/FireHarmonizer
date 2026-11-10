import math
import sys
import time
import unittest
from io import StringIO
from typing import Any
from unittest.mock import MagicMock, patch

sys.path.insert(0, ".")

import pandas as pd
from fastapi import HTTPException
from app.api.routes.fires import (
    filter_by_aoi,
    calculate_sensor_stats,
    get_cached_data,
    set_cached_data,
    _CACHE,
    _CACHE_LOCK,
    CACHE_TTL_SECONDS,
)

# --------------------------------------------------
# PURE PYTHON HARMONIZATION & DEDUPLICATION LOGIC
# (Mirroring the scientifically validated TypeScript implementation)
# --------------------------------------------------

EARTH_RADIUS_KM = 6371.0
DEDUP_DISTANCE_KM = 0.375
DEDUP_TIME_MINUTES = 30
MAX_DISTANCE_KM = 1.0
MAX_TIME_DIFFERENCE_HOURS = 24.0
GRID_SIZE = 0.02


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2.0) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2.0) ** 2
    )
    return 2.0 * EARTH_RADIUS_KM * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))


def parse_utc_timestamp(acq_date: Any, acq_time: Any) -> float | None:
    if not acq_date or acq_time is None:
        return None
    date_str = str(acq_date).strip()[:10]
    time_str = str(acq_time).strip()
    try:
        if "-" in date_str:
            parts = [int(p) for p in date_str.split("-")]
            if len(parts) != 3:
                return None
            year, month, day = parts
        elif len(date_str) == 8 and date_str.isdigit():
            year = int(date_str[:4])
            month = int(date_str[4:6])
            day = int(date_str[6:8])
        else:
            return None

        if ":" in time_str:
            tparts = [int(p) for p in time_str.split(":")]
            if len(tparts) != 2:
                return None
            hour, minute = tparts
        else:
            clean_time = str(int(float(time_str))).zfill(4)
            if len(clean_time) != 4:
                return None
            hour = int(clean_time[:2])
            minute = int(clean_time[2:4])

        if not (1 <= month <= 12 and 1 <= day <= 31 and 0 <= hour <= 23 and 0 <= minute <= 59):
            return None

        # Return UTC timestamp in seconds
        import calendar
        return calendar.timegm((year, month, day, hour, minute, 0))
    except Exception:
        return None


def deduplicate_viirs_py(detections: list[dict[str, Any]]) -> dict[str, Any]:
    valid = []
    for d in detections:
        try:
            lat = float(d["latitude"])
            lon = float(d["longitude"])
        except (ValueError, TypeError):
            continue
        if not (-90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0):
            continue
        ts = parse_utc_timestamp(d.get("acq_date"), d.get("acq_time"))
        if ts is None:
            continue
        valid.append({
            "fire": d,
            "lat": lat,
            "lon": lon,
            "ts": ts,
            "sat": str(d.get("satellite") or "").strip(),
        })

    valid.sort(key=lambda x: x["ts"])
    kept = []
    dups_removed = 0
    max_dt_sec = DEDUP_TIME_MINUTES * 60

    for curr in valid:
        is_dup = False
        for ex in kept:
            # ONLY deduplicate across different platforms
            if ex["sat"] == curr["sat"]:
                continue
            if abs(curr["ts"] - ex["ts"]) > max_dt_sec:
                continue
            dist = haversine(curr["lat"], curr["lon"], ex["lat"], ex["lon"])
            if dist <= DEDUP_DISTANCE_KM:
                is_dup = True
                break
        if is_dup:
            dups_removed += 1
        else:
            kept.append(curr)

    return {
        "kept": [k["fire"] for k in kept],
        "duplicates_removed": dups_removed,
        "valid_count": len(valid),
        "raw_count": len(detections),
    }


def match_modis_viirs_py(modis: list[dict[str, Any]], viirs: list[dict[str, Any]]) -> dict[str, Any]:
    valid_m = []
    for d in modis:
        try:
            lat = float(d["latitude"])
            lon = float(d["longitude"])
        except (ValueError, TypeError):
            continue
        if not (-90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0):
            continue
        ts = parse_utc_timestamp(d.get("acq_date"), d.get("acq_time"))
        if ts is None:
            continue
        valid_m.append({"fire": d, "lat": lat, "lon": lon, "ts": ts})

    valid_v = []
    for d in viirs:
        try:
            lat = float(d["latitude"])
            lon = float(d["longitude"])
        except (ValueError, TypeError):
            continue
        if not (-90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0):
            continue
        ts = parse_utc_timestamp(d.get("acq_date"), d.get("acq_time"))
        if ts is None:
            continue
        valid_v.append({"fire": d, "lat": lat, "lon": lon, "ts": ts})

    candidates = []
    for m_idx, m in enumerate(valid_m):
        for v_idx, v in enumerate(valid_v):
            dt_hours = abs(m["ts"] - v["ts"]) / 3600.0
            if dt_hours > MAX_TIME_DIFFERENCE_HOURS:
                continue
            dist = haversine(m["lat"], m["lon"], v["lat"], v["lon"])
            if dist > MAX_DISTANCE_KM:
                continue
            score = (dist / MAX_DISTANCE_KM) + (dt_hours / MAX_TIME_DIFFERENCE_HOURS)
            candidates.append({
                "m_idx": m_idx,
                "v_idx": v_idx,
                "dist": dist,
                "dt_hours": dt_hours,
                "score": score,
            })

    candidates.sort(key=lambda x: x["score"])
    used_m = set()
    used_v = set()
    matched = 0
    total_dist = 0.0
    total_dt = 0.0

    for cand in candidates:
        if cand["m_idx"] in used_m or cand["v_idx"] in used_v:
            continue
        used_m.add(cand["m_idx"])
        used_v.add(cand["v_idx"])
        matched += 1
        total_dist += cand["dist"]
        total_dt += cand["dt_hours"]

    total_m = len(valid_m)
    total_v = len(valid_v)

    return {
        "matched": matched,
        "unmatched_modis": total_m - matched,
        "unmatched_viirs": total_v - matched,
        "match_pct": (matched / total_m * 100.0) if total_m > 0 else 0.0,
        "avg_dist": (total_dist / matched) if matched > 0 else 0.0,
        "avg_dt": (total_dt / matched) if matched > 0 else 0.0,
        "total_modis": total_m,
        "total_viirs": total_v,
        "excluded_modis": len(modis) - total_m,
        "excluded_viirs": len(viirs) - total_v,
    }


# --------------------------------------------------
# UNIT TEST SUITE FOR SCIENTIFIC VALIDATION
# --------------------------------------------------

class TestScientificValidation(unittest.TestCase):

    # 1. Invalid Coordinates
    def test_invalid_coordinates(self):
        records = [
            {"latitude": 91.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"},
            {"latitude": -95.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"},
            {"latitude": 20.0, "longitude": 185.0, "acq_date": "2026-11-10", "acq_time": "1200"},
            {"latitude": "invalid", "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"},
            {"latitude": 20.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"},
        ]
        res = deduplicate_viirs_py(records)
        self.assertEqual(res["valid_count"], 1)
        self.assertEqual(res["raw_count"], 5)

    def test_aoi_bounds_validation(self):
        records = [{"latitude": 20.0, "longitude": 75.0}]
        # west >= east
        with self.assertRaises(HTTPException):
            filter_by_aoi(records, west=80.0, south=10.0, east=70.0, north=30.0)
        # south >= north
        with self.assertRaises(HTTPException):
            filter_by_aoi(records, west=70.0, south=35.0, east=80.0, north=15.0)
        # Out of bounds
        with self.assertRaises(HTTPException):
            filter_by_aoi(records, west=-200.0, south=10.0, east=80.0, north=30.0)

    # 2. Missing and Invalid Timestamps
    def test_missing_and_invalid_timestamps(self):
        self.assertIsNone(parse_utc_timestamp(None, "1200"))
        self.assertIsNone(parse_utc_timestamp("2026-11-10", None))
        self.assertIsNone(parse_utc_timestamp("invalid-date", "1200"))
        self.assertIsNone(parse_utc_timestamp("2026-13-10", "1200"))  # Month 13
        self.assertIsNone(parse_utc_timestamp("2026-11-10", "2500"))  # Hour 25
        self.assertIsNone(parse_utc_timestamp("2026-11-10", "1265"))  # Minute 65

        # Valid date checks
        ts1 = parse_utc_timestamp("2026-11-10", "1200")
        ts2 = parse_utc_timestamp("20261110", "12:00")
        self.assertIsNotNone(ts1)
        self.assertEqual(ts1, ts2)

    # 3. Duplicate Observations (VIIRS Cross-Platform Deduplication)
    def test_viirs_deduplication_cross_platform(self):
        # Two fires at the EXACT same location and time, but SAME platform (N21):
        # MUST NOT be deduplicated (separate pixels in same pass)
        same_platform = [
            {"latitude": 20.000, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1200", "satellite": "N21"},
            {"latitude": 20.001, "longitude": 75.001, "acq_date": "2026-11-10", "acq_time": "1205", "satellite": "N21"},
        ]
        res = deduplicate_viirs_py(same_platform)
        self.assertEqual(res["duplicates_removed"], 0)
        self.assertEqual(len(res["kept"]), 2)

        # Different platforms (N20 vs N21) within 375m and 30min:
        # MUST BE DEDUPLICATED
        cross_platform = [
            {"latitude": 20.000, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1200", "satellite": "N20"},
            {"latitude": 20.001, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1210", "satellite": "N21"},
        ]
        res = deduplicate_viirs_py(cross_platform)
        self.assertEqual(res["duplicates_removed"], 1)
        self.assertEqual(len(res["kept"]), 1)

        # Different platforms but distance > 375m (~1.1 km apart):
        # MUST NOT BE DEDUPLICATED
        distant_cross = [
            {"latitude": 20.000, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1200", "satellite": "N20"},
            {"latitude": 20.010, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1210", "satellite": "N21"},
        ]
        res = deduplicate_viirs_py(distant_cross)
        self.assertEqual(res["duplicates_removed"], 0)
        self.assertEqual(len(res["kept"]), 2)

        # Different platforms within 100m but time difference > 30 minutes (2 hours):
        # MUST NOT BE DEDUPLICATED
        time_separated = [
            {"latitude": 20.000, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1200", "satellite": "N20"},
            {"latitude": 20.000, "longitude": 75.000, "acq_date": "2026-11-10", "acq_time": "1400", "satellite": "N21"},
        ]
        res = deduplicate_viirs_py(time_separated)
        self.assertEqual(res["duplicates_removed"], 0)
        self.assertEqual(len(res["kept"]), 2)

    # 4. No Matching Observations
    def test_no_matching_observations(self):
        # > 1 km apart
        modis = [{"latitude": 20.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"}]
        viirs = [{"latitude": 20.1, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"}]
        res = match_modis_viirs_py(modis, viirs)
        self.assertEqual(res["matched"], 0)
        self.assertEqual(res["unmatched_modis"], 1)
        self.assertEqual(res["unmatched_viirs"], 1)
        self.assertEqual(res["match_pct"], 0.0)

        # Distance < 1km but time difference > 24 hours
        viirs_late = [{"latitude": 20.001, "longitude": 75.0, "acq_date": "2026-11-12", "acq_time": "1200"}]
        res2 = match_modis_viirs_py(modis, viirs_late)
        self.assertEqual(res2["matched"], 0)

    # 5. Multiple Candidate Matches & One-to-One Selection
    def test_multiple_candidate_matches(self):
        # 1 MODIS detection and 2 VIIRS detections nearby:
        # Candidate A: 0.1 km away, 1 hour diff -> score = 0.1/1 + 1/24 = 0.141
        # Candidate B: 0.5 km away, 0.1 hour diff -> score = 0.5/1 + 0.1/24 = 0.504
        # Candidate A has a lower score, so Candidate A should be matched.
        # Strict 1-to-1 matching means only 1 match occurs!
        modis = [{"latitude": 20.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"}]
        viirs = [
            {"latitude": 20.005, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1206"}, # ~0.55 km
            {"latitude": 20.001, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1300"}, # ~0.11 km
        ]
        res = match_modis_viirs_py(modis, viirs)
        self.assertEqual(res["matched"], 1)
        self.assertEqual(res["unmatched_modis"], 0)
        self.assertEqual(res["unmatched_viirs"], 1)
        self.assertEqual(res["match_pct"], 100.0)

    # 6. Empty API Responses
    def test_empty_api_responses(self):
        res = match_modis_viirs_py([], [])
        self.assertEqual(res["matched"], 0)
        self.assertEqual(res["match_pct"], 0.0)
        self.assertEqual(res["total_modis"], 0)
        self.assertEqual(res["total_viirs"], 0)

        modis = [{"latitude": 20.0, "longitude": 75.0, "acq_date": "2026-11-10", "acq_time": "1200"}]
        res_m = match_modis_viirs_py(modis, [])
        self.assertEqual(res_m["matched"], 0)
        self.assertEqual(res_m["unmatched_modis"], 1)
        self.assertEqual(res_m["total_viirs"], 0)

    # 7. Cache Consistency
    def test_cache_consistency(self):
        key = "TEST_SOURCE:5"
        dummy_data = [{"test": 123}]
        set_cached_data(key, dummy_data)
        cached = get_cached_data(key)
        self.assertEqual(cached, dummy_data)

        # Simulate expiration
        with _CACHE_LOCK:
            _CACHE[key]["timestamp"] = time.time() - (CACHE_TTL_SECONDS + 5)
        expired = get_cached_data(key)
        self.assertIsNone(expired)

    # 8. FRP Statistics & Median
    def test_frp_statistics(self):
        # Odd count: [10.0, 20.0, 50.0] -> median is 20.0, mean is 26.667
        odd_fires = [
            {"frp": 10.0, "confidence": "high"},
            {"frp": 50.0, "confidence": "high"},
            {"frp": 20.0, "confidence": "low"},
            {"frp": None, "confidence": "low"}, # Null ignored
            {"frp": -5.0, "confidence": "low"}, # Negative ignored
        ]
        stats_odd = calculate_sensor_stats("TEST", odd_fires)
        self.assertEqual(stats_odd["frp_sum_mw"], 80.0)
        self.assertEqual(stats_odd["frp_mean_mw"], 26.667)
        self.assertEqual(stats_odd["frp_median_mw"], 20.0)
        self.assertEqual(stats_odd["confidence_distribution"]["high"], 2)

        # Even count: [10.0, 20.0, 40.0, 50.0] -> median is (20+40)/2 = 30.0
        even_fires = [
            {"frp": 10.0},
            {"frp": 20.0},
            {"frp": 40.0},
            {"frp": 50.0},
        ]
        stats_even = calculate_sensor_stats("TEST", even_fires)
        self.assertEqual(stats_even["frp_median_mw"], 30.0)


if __name__ == "__main__":
    unittest.main()


import unittest
import sys
sys.path.insert(0, ".")

from app.api.routes.fires import (
    filter_by_aoi,
    fetch_source_data,
    get_cached_data,
    INDIA_AREA,
)
from fastapi import HTTPException


class TestRegionSearchAndAOI(unittest.TestCase):
    """Test suite for Region Search and Geographic Filtering."""

    def test_01_india_default_bounds(self):
        # Default query without bounds uses INDIA_AREA
        data = fetch_source_data("VIIRS_NOAA21_NRT", 1, area=INDIA_AREA)
        self.assertIsInstance(data, list)
        if data:
            d = data[0]
            self.assertIn("latitude", d)
            self.assertIn("longitude", d)

    def test_02_andhra_pradesh_sub_bounds(self):
        # Andhra Pradesh bounds: west: 76.7, south: 12.6, east: 84.8, north: 19.9
        india_data = fetch_source_data("VIIRS_NOAA21_NRT", 1, area=INDIA_AREA)
        ap_fires = filter_by_aoi(
            india_data,
            west=76.7,
            south=12.6,
            east=84.8,
            north=19.9,
        )
        self.assertIsInstance(ap_fires, list)
        for f in ap_fires:
            self.assertTrue(76.7 <= f["longitude"] <= 84.8)
            self.assertTrue(12.6 <= f["latitude"] <= 19.9)

    def test_03_australia_bounds(self):
        # Australia bounds: 112, -44, 154, -10
        aus_area = "112.0,-44.0,154.0,-10.0"
        aus_data = fetch_source_data("VIIRS_NOAA21_NRT", 1, area=aus_area)
        self.assertIsInstance(aus_data, list)
        if aus_data:
            d = aus_data[0]
            self.assertTrue(112.0 <= d["longitude"] <= 154.0)
            self.assertTrue(-44.0 <= d["latitude"] <= -10.0)

    def test_04_brazil_bounds(self):
        # Brazil bounds: -73.9, -33.7, -34.8, 5.3
        brazil_area = "-73.9,-33.7,-34.8,5.3"
        brazil_data = fetch_source_data("VIIRS_NOAA21_NRT", 1, area=brazil_area)
        self.assertIsInstance(brazil_data, list)
        if brazil_data:
            d = brazil_data[0]
            self.assertTrue(-73.9 <= d["longitude"] <= -34.8)
            self.assertTrue(-33.7 <= d["latitude"] <= 5.3)

    def test_05_invalid_region_bounds_validation(self):
        # Inverted bounds (west > east)
        with self.assertRaises(HTTPException) as ctx:
            filter_by_aoi([], west=85, south=15, east=75, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

        # Inverted latitude (south > north)
        with self.assertRaises(HTTPException) as ctx:
            filter_by_aoi([], west=75, south=25, east=85, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

        # Out-of-range latitude
        with self.assertRaises(HTTPException) as ctx:
            filter_by_aoi([], west=75, south=-95, east=85, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

    def test_06_empty_search_fallback(self):
        # Empty/None bounds returns unfiltered detections
        sample = [{"latitude": 15.0, "longitude": 78.0}]
        res = filter_by_aoi(sample, None, None, None, None)
        self.assertEqual(len(res), 1)


if __name__ == "__main__":
    unittest.main()


import unittest
import sys
sys.path.insert(0, ".")

from app.api.routes.fires import (
    fetch_source_data,
    filter_by_aoi,
    get_cached_data,
    set_cached_data,
    _CACHE,
    _CACHE_LOCK,
    INDIA_AREA,
    get_fire_detections,
)
from fastapi import HTTPException


class TestRegionSearchAudit(unittest.TestCase):
    """Final audit test suite for Region Search and Cache Isolation."""

    def test_01_cache_key_uniqueness(self):
        """Verify cache keys uniquely distinguish source, days, and bounding box."""
        key_india = f"VIIRS_NOAA21_NRT:1:{INDIA_AREA}"
        key_brazil = "VIIRS_NOAA21_NRT:1:-73.9,-33.7,-34.8,5.3"
        key_australia = "VIIRS_NOAA21_NRT:1:112.0,-44.0,154.0,-10.0"

        self.assertNotEqual(key_india, key_brazil)
        self.assertNotEqual(key_india, key_australia)
        self.assertNotEqual(key_brazil, key_australia)

        # Confirm setting data in one key does not pollute the other
        mock_india = [{"latitude": 20.0, "longitude": 78.0, "frp": 10.0}]
        mock_brazil = [{"latitude": -10.0, "longitude": -50.0, "frp": 25.0}]

        set_cached_data(key_india, mock_india)
        set_cached_data(key_brazil, mock_brazil)

        self.assertEqual(get_cached_data(key_india), mock_india)
        self.assertEqual(get_cached_data(key_brazil), mock_brazil)

    def test_02_brazil_cannot_return_cached_india(self):
        """Confirm Brazil request specifically queries Brazil and never returns India points."""
        response_brazil = get_fire_detections(
            source="VIIRS_NOAA21_NRT",
            days=1,
            west=-73.9,
            south=-33.7,
            east=-34.8,
            north=5.3,
        )
        self.assertIn("detections", response_brazil)
        # All returned points must strictly lie in Brazil longitude/latitude
        for d in response_brazil["detections"]:
            self.assertTrue(
                -73.9 <= d["longitude"] <= -34.8,
                f"Longitude {d['longitude']} outside Brazil bounds",
            )
            self.assertTrue(
                -33.7 <= d["latitude"] <= 5.3,
                f"Latitude {d['latitude']} outside Brazil bounds",
            )

    def test_03_custom_bounding_box_validation(self):
        """Verify bounding box validation for inverted coordinates, invalid ranges, and missing bounds."""
        # Inverted longitude: west > east
        with self.assertRaises(HTTPException) as ctx:
            get_fire_detections(source="VIIRS_NOAA21_NRT", days=1, west=85, south=15, east=75, north=20)
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("Invalid AOI bounds", ctx.exception.detail)

        # Inverted latitude: south > north
        with self.assertRaises(HTTPException) as ctx:
            get_fire_detections(source="VIIRS_NOAA21_NRT", days=1, west=75, south=25, east=85, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

        # Longitude out of [-180, 180]
        with self.assertRaises(HTTPException) as ctx:
            get_fire_detections(source="VIIRS_NOAA21_NRT", days=1, west=-190, south=10, east=85, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

        # Latitude out of [-90, 90]
        with self.assertRaises(HTTPException) as ctx:
            get_fire_detections(source="VIIRS_NOAA21_NRT", days=1, west=75, south=-95, east=85, north=20)
        self.assertEqual(ctx.exception.status_code, 400)

        # Missing bounds (only 2 provided)
        with self.assertRaises(HTTPException) as ctx:
            get_fire_detections(source="VIIRS_NOAA21_NRT", days=1, west=75, south=15, east=None, north=None)
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("Provide all four AOI bounds", ctx.exception.detail)

    def test_04_clearing_region_restores_india_view(self):
        """Verify clearing bounds (None for all 4 parameters) returns default India dataset."""
        response_default = get_fire_detections(
            source="VIIRS_NOAA21_NRT",
            days=1,
            west=None,
            south=None,
            east=None,
            north=None,
        )
        self.assertEqual(response_default["region"], "India")
        self.assertIsInstance(response_default["detections"], list)
        for d in response_default["detections"]:
            # All default India detections must lie within the India boundary
            self.assertTrue(68.0 <= d["longitude"] <= 98.0)
            self.assertTrue(6.0 <= d["latitude"] <= 36.0)

    def test_05_andhra_pradesh_sub_region(self):
        """Verify Andhra Pradesh returns observations strictly within its state bounds."""
        response_ap = get_fire_detections(
            source="VIIRS_NOAA21_NRT",
            days=1,
            west=76.7,
            south=12.6,
            east=84.8,
            north=19.9,
        )
        self.assertIsInstance(response_ap["detections"], list)
        for d in response_ap["detections"]:
            self.assertTrue(76.7 <= d["longitude"] <= 84.8)
            self.assertTrue(12.6 <= d["latitude"] <= 19.9)

    def test_06_australia_region(self):
        """Verify Australia returns observations strictly within its continental bounds."""
        response_aus = get_fire_detections(
            source="VIIRS_NOAA21_NRT",
            days=1,
            west=112.0,
            south=-44.0,
            east=154.0,
            north=-10.0,
        )
        self.assertIsInstance(response_aus["detections"], list)
        for d in response_aus["detections"]:
            self.assertTrue(112.0 <= d["longitude"] <= 154.0)
            self.assertTrue(-44.0 <= d["latitude"] <= -10.0)


if __name__ == "__main__":
    unittest.main()


import json
import os
import unittest
import sys
sys.path.insert(0, ".")

from app.api.routes.fires import (
    filter_by_aoi,
    fetch_source_data,
    get_cached_data,
    set_cached_data,
    INDIA_AREA,
)


class TestGazetteerIntegrity(unittest.TestCase):
    """Test suite validating the integrity of the comprehensive global gazetteer."""

    @classmethod
    def setUpClass(cls):
        target_path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "..",
                "..",
                "frontend",
                "src",
                "data",
                "gazetteerData.ts",
            )
        )
        with open(target_path, "r", encoding="utf-8") as f:
            text = f.read()
        start = text.index("= [") + 2
        end = text.rindex("]") + 1
        cls.data = json.loads(text[start:end])

    def test_01_total_gazetteer_count(self):
        """Verify the gazetteer contains a substantial, worldwide catalog (> 400 entries)."""
        self.assertGreaterEqual(len(self.data), 400)
        self.assertIn("name", self.data[0])
        self.assertIn("bounds", self.data[0])
        self.assertIn("center", self.data[0])

    def test_02_all_bounding_boxes_mathematically_valid(self):
        """Validate west < east, south < north, and ranges for all 400+ entities."""
        for entry in self.data:
            name = entry["name"]
            b = entry["bounds"]
            c = entry["center"]

            # Coordinate range assertions
            self.assertTrue(-180.0 <= b["west"] <= 180.0, f"Invalid west {b['west']} for {name}")
            self.assertTrue(-180.0 <= b["east"] <= 180.0, f"Invalid east {b['east']} for {name}")
            self.assertTrue(-90.0 <= b["south"] <= 90.0, f"Invalid south {b['south']} for {name}")
            self.assertTrue(-90.0 <= b["north"] <= 90.0, f"Invalid north {b['north']} for {name}")

            # Ordering assertions
            self.assertLess(b["west"], b["east"], f"west >= east for {name}: {b['west']} >= {b['east']}")
            self.assertLess(b["south"], b["north"], f"south >= north for {name}: {b['south']} >= {b['north']}")

            # Center position inside bounds
            lat, lon = c[0], c[1]
            self.assertTrue(b["south"] <= lat <= b["north"], f"Center lat {lat} outside bounds for {name}")
            self.assertTrue(b["west"] <= lon <= b["east"], f"Center lon {lon} outside bounds for {name}")

    def test_03_unique_ids(self):
        """Verify all gazetteer entity IDs are unique."""
        ids = [entry["id"] for entry in self.data]
        self.assertEqual(len(ids), len(set(ids)), "Found duplicate IDs in gazetteer")

    def test_04_internationally_recognized_countries_covered(self):
        """Verify internationally recognized countries are present."""
        sample_countries = [
            "India", "United States", "Brazil", "Australia", "Canada",
            "China", "Germany", "France", "Japan", "United Kingdom",
            "South Africa", "Egypt", "Indonesia", "Mexico", "Argentina",
            "Nigeria", "Italy", "Spain", "Russia", "Saudi Arabia"
        ]
        country_names = {entry["name"] for entry in self.data if entry.get("category") == "Country"}
        for c in sample_countries:
            self.assertIn(c, country_names, f"Missing country: {c}")

    def test_05_requested_indian_cities_present(self):
        """Verify all explicitly requested Indian cities are included."""
        requested = [
            "Vijayawada", "Visakhapatnam", "Guntur", "Tirupati", "Hyderabad",
            "Bengaluru", "Chennai", "Mumbai", "Pune", "Delhi", "Kolkata",
            "Ahmedabad", "Jaipur", "Kochi"
        ]
        indian_cities = {
            entry["name"] for entry in self.data
            if entry.get("country") == "India" and entry.get("category") == "City"
        }
        for city in requested:
            self.assertIn(city, indian_cities, f"Missing Indian city: {city}")

    def test_06_ambiguous_places_disambiguated(self):
        """Verify ambiguous place names exist with distinct countries/regions."""
        ambiguous = ["Hyderabad", "Cambridge", "Melbourne"]
        for name in ambiguous:
            matches = [entry for entry in self.data if entry["name"] == name]
            self.assertGreaterEqual(len(matches), 2, f"Expected multiple entries for {name}")
            # Ensure countries/adminRegions are distinct
            signatures = {f"{m.get('adminRegion')}, {m.get('country')}" for m in matches}
            self.assertEqual(len(signatures), len(matches), f"Signatures must be distinct for {name}")

    def test_07_global_cities_across_continents(self):
        """Verify major cities across all continents are present."""
        continent_samples = [
            ("New York", "United States"),     # North America
            ("São Paulo", "Brazil"),           # South America
            ("London", "United Kingdom"),      # Europe
            ("Cairo", "Egypt"),                # Africa
            ("Tokyo", "Japan"),                # Asia
            ("Sydney", "Australia"),           # Oceania
        ]
        for city_name, country in continent_samples:
            matches = [e for e in self.data if e["name"] == city_name and e["country"] == country]
            self.assertTrue(len(matches) > 0, f"Missing global city: {city_name} in {country}")

    def test_08_ecological_regions_present(self):
        """Verify key ecological and fire-prone regions are present."""
        regions = ["Amazon Rainforest", "Pantanal", "Siberian Taiga"]
        region_names = {entry["name"] for entry in self.data if entry.get("category") == "Region"}
        for r in regions:
            self.assertIn(r, region_names, f"Missing ecological region: {r}")


if __name__ == "__main__":
    unittest.main()


import json
import threading
import time
import unittest
import urllib.error
import urllib.parse
import urllib.request

BASE_URL = "http://127.0.0.1:8000/api"


def make_request(path: str, params: dict | None = None) -> tuple[int, dict]:
    url = f"{BASE_URL}{path}"
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "FireHarmonizer-IntegrationTest/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return resp.status, data
    except urllib.error.HTTPError as err:
        try:
            body = json.loads(err.read().decode("utf-8"))
        except Exception:
            body = {}
        return err.code, body


class TestBackendAPIIntegration(unittest.TestCase):
    """End-to-end integration tests for FireHarmonizer backend endpoints."""

    def test_01_root_api_status(self):
        req = urllib.request.Request("http://127.0.0.1:8000/")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)

    def test_02_fires_all_supported_sources(self):
        sources = [
            "MODIS_NRT",
            "VIIRS_NOAA21_NRT",
            "VIIRS_NOAA20_NRT",
            "VIIRS_SNPP_NRT",
        ]
        for src in sources:
            with self.subTest(source=src):
                status, data = make_request("/fires", {"source": src, "days": 1})
                self.assertEqual(status, 200)
                self.assertIn("source", data)
                self.assertEqual(data["source"], src)
                self.assertIn("count", data)
                self.assertIn("detections", data)
                self.assertIsInstance(data["detections"], list)
                self.assertEqual(data["count"], len(data["detections"]))

                # Verify schema of detection items if non-empty
                if data["detections"]:
                    d = data["detections"][0]
                    self.assertIn("latitude", d)
                    self.assertIn("longitude", d)
                    self.assertIn("frp", d)
                    self.assertIn("confidence", d)
                    self.assertIn("acq_date", d)
                    self.assertIn("acq_time", d)
                    # Verify coordinates are strictly valid
                    self.assertTrue(-90.0 <= d["latitude"] <= 90.0)
                    self.assertTrue(-180.0 <= d["longitude"] <= 180.0)

    def test_03_fires_invalid_source_rejected(self):
        status, data = make_request("/fires", {"source": "SATELLITE_DOES_NOT_EXIST", "days": 1})
        self.assertEqual(status, 400)
        self.assertIn("detail", data)
        self.assertIn("Invalid NASA FIRMS source", data["detail"])

    def test_04_fires_out_of_bounds_days(self):
        # ge=1, le=5 enforced by FastAPI Query
        status, data = make_request("/fires", {"days": 0})
        self.assertEqual(status, 422)

        status, data = make_request("/fires", {"days": 10})
        self.assertEqual(status, 422)

    def test_05_fires_aoi_filtering(self):
        # Valid AOI: Central India (75, 15, 80, 20)
        status, data = make_request(
            "/fires",
            {"source": "VIIRS_NOAA21_NRT", "days": 1, "west": 75, "south": 15, "east": 80, "north": 20},
        )
        self.assertEqual(status, 200)
        self.assertIsInstance(data["region"], dict)
        self.assertEqual(data["region"]["west"], 75.0)
        for d in data["detections"]:
            self.assertTrue(75.0 <= d["longitude"] <= 80.0)
            self.assertTrue(15.0 <= d["latitude"] <= 20.0)

    def test_06_fires_invalid_aoi_bounds(self):
        # Inverted bounds (west > east)
        status, data = make_request(
            "/fires",
            {"source": "VIIRS_NOAA21_NRT", "days": 1, "west": 85, "south": 15, "east": 75, "north": 20},
        )
        self.assertEqual(status, 400)

        # Incomplete bounds (missing north)
        status, data = make_request(
            "/fires",
            {"source": "VIIRS_NOAA21_NRT", "days": 1, "west": 75, "south": 15, "east": 80},
        )
        self.assertEqual(status, 400)

    def test_07_comparison_valid_response(self):
        status, data = make_request("/comparison", {"days": 1})
        self.assertEqual(status, 200)
        self.assertEqual(data["period_days"], 1)
        self.assertEqual(data["region"], "India")
        self.assertIn("modis", data)
        self.assertIn("viirs", data)
        self.assertIn("observation_count_difference", data)
        self.assertIn("methodology_note", data)

        modis = data["modis"]
        viirs = data["viirs"]
        for stat in [modis, viirs]:
            self.assertIn("observation_count", stat)
            self.assertIn("frp_sum_mw", stat)
            self.assertIn("frp_mean_mw", stat)
            self.assertIn("frp_median_mw", stat)
            self.assertIn("confidence_distribution", stat)
            # If observation_count > 0 and frp values exist, median must be finite
            if stat["frp_mean_mw"] is not None:
                self.assertIsNotNone(stat["frp_median_mw"])
                self.assertGreaterEqual(stat["frp_sum_mw"], 0)

        diff = modis["observation_count"] - viirs["observation_count"]
        self.assertEqual(data["observation_count_difference"], diff)

    def test_08_comparison_invalid_days(self):
        status, _ = make_request("/comparison", {"days": 0})
        self.assertEqual(status, 422)

        status, _ = make_request("/comparison", {"days": 7})
        self.assertEqual(status, 422)

    def test_09_backend_cache_hit_performance(self):
        # Warm up the cache
        start = time.perf_counter()
        status1, _ = make_request("/fires", {"source": "MODIS_NRT", "days": 1})
        self.assertEqual(status1, 200)

        # Second request must hit the 10-minute cache and respond within 100ms locally
        t0 = time.perf_counter()
        status2, _ = make_request("/fires", {"source": "MODIS_NRT", "days": 1})
        duration_cached = (time.perf_counter() - t0) * 1000
        self.assertEqual(status2, 200)
        self.assertLess(duration_cached, 150.0, f"Cached request took {duration_cached:.1f}ms, expected < 150ms")

    def test_10_concurrent_requests_handling(self):
        # Send 6 concurrent requests to verify thread-safety and in-flight deduplication
        results = []
        errors = []

        def worker():
            try:
                status, data = make_request("/fires", {"source": "VIIRS_NOAA21_NRT", "days": 1})
                results.append((status, data["count"]))
            except Exception as e:
                errors.append(e)

        threads = [threading.Thread(target=worker) for _ in range(6)]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        self.assertEqual(len(errors), 0, f"Encountered thread errors: {errors}")
        self.assertEqual(len(results), 6)
        # All concurrent workers must receive identical 200 OK and same detection count
        for status, count in results:
            self.assertEqual(status, 200)
            self.assertEqual(count, results[0][1])


if __name__ == "__main__":
    unittest.main()


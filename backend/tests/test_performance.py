import sys
sys.path.insert(0, ".")
import time
from concurrent.futures import ThreadPoolExecutor
from app.api.routes.fires import fetch_source_data, get_sensor_comparison

print("--- Test 1: In-Flight Request Deduplication ---")
t0 = time.time()
with ThreadPoolExecutor(max_workers=2) as ex:
    f1 = ex.submit(fetch_source_data, "VIIRS_NOAA21_NRT", 5)
    f2 = ex.submit(fetch_source_data, "VIIRS_NOAA21_NRT", 5)
    r1 = f1.result()
    r2 = f2.result()
dt = time.time() - t0
print(f"Two concurrent requests completed in: {dt:.2f}s | Result 1: {len(r1)} items | Result 2: {len(r2)} items")

print("\n--- Test 2: In-Memory TTL Cache Hit ---")
t0 = time.time()
r3 = fetch_source_data("VIIRS_NOAA21_NRT", 5)
dt = (time.time() - t0) * 1000
print(f"Cache hit completed in: {dt:.3f} ms | Result: {len(r3)} items")

print("\n--- Test 3: Concurrent Sensor Comparison ---")
t0 = time.time()
comp = get_sensor_comparison(5)
dt = time.time() - t0
print(f"Comparison completed in: {dt:.2f}s | MODIS: {comp['modis']['observation_count']} | VIIRS: {comp['viirs']['observation_count']}")

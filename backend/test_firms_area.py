import os
import requests
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("FIRMS_MAP_KEY", "").strip()
print("Key length:", len(key))

# Test Australia
url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{key}/VIIRS_NOAA21_NRT/112,-44,154,-10/1"
r = requests.get(url, timeout=30)
print("Australia status:", r.status_code, "lines:", len(r.text.splitlines()))

# Test Brazil
url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{key}/VIIRS_NOAA21_NRT/-74,-34,-34,6/1"
r = requests.get(url, timeout=30)
print("Brazil status:", r.status_code, "lines:", len(r.text.splitlines()))


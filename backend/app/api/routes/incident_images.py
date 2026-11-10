
import time
from datetime import datetime, timedelta, timezone
from typing import Any
from threading import Lock

import requests
from fastapi import APIRouter, HTTPException, Query

router = APIRouter()

NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse"
GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc"

HEADERS = {
    "User-Agent": "FireHarmonizer/1.0 (fire incident research application)"
}

# Simple in-memory cache
CACHE: dict[str, dict[str, Any]] = {}
CACHE_TTL = 1800  # 30 minutes
CACHE_LOCK = Lock()

# Cache helpers
def get_cached(key: str):
    with CACHE_LOCK:
        item = CACHE.get(key)

        if item and time.time() - item["time"] < CACHE_TTL:
            return item["data"]

        if item:
            CACHE.pop(key, None)

    return None


def set_cached(key: str, data: Any):
    with CACHE_LOCK:
        CACHE[key] = {
            "time": time.time(),
            "data": data,
        }


def get_location_name(latitude: float, longitude: float) -> str:
    cache_key = f"location:{round(latitude, 3)}:{round(longitude, 3)}"

    cached = get_cached(cache_key)
    if cached:
        return cached

    try:
        response = requests.get(
            NOMINATIM_URL,
            params={
                "lat": latitude,
                "lon": longitude,
                "format": "jsonv2",
                "zoom": 10,
            },
            headers=HEADERS,
            timeout=12,
        )

        response.raise_for_status()

        data = response.json()
        address = data.get("address", {})

        location = (
            address.get("city")
            or address.get("town")
            or address.get("village")
            or address.get("municipality")
            or address.get("county")
            or address.get("state")
            or "India"
        )

        set_cached(cache_key, location)
        return location

    except (requests.RequestException, ValueError):
        return "India"


def empty_response(
    latitude: float,
    longitude: float,
    incident_date: str | None,
    location: str,
    message: str,
):
    return {
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "incident_date": incident_date,
        "count": 0,
        "images": [],
        "message": message,
    }


@router.get("/incident-images")
def get_incident_images(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
    incident_date: str | None = Query(
        default=None,
        description="NASA detection date in YYYY-MM-DD format",
    ),
):
    """
    Find related fire incident news photographs.

    These photographs are not automatically verified
    as images of the exact satellite hotspot.
    """

    # Validate date
    selected_date = None

    if incident_date:
        try:
            selected_date = datetime.strptime(
                incident_date,
                "%Y-%m-%d",
            ).replace(tzinfo=timezone.utc)

        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="incident_date must use YYYY-MM-DD format.",
            )

        now = datetime.now(timezone.utc)

        if selected_date > now:
            raise HTTPException(
                status_code=400,
                detail="Incident date cannot be in the future.",
            )

        if now - selected_date > timedelta(days=89):
            return empty_response(
                latitude,
                longitude,
                incident_date,
                "India",
                "GDELT search supports recent news only. "
                "This detection is outside the supported search window.",
            )

    # Cache the complete result per coordinate/date
    cache_key = (
        f"incident:{round(latitude, 3)}:"
        f"{round(longitude, 3)}:{incident_date or 'recent'}"
    )

    cached_result = get_cached(cache_key)

    if cached_result is not None:
        return cached_result

    location = get_location_name(latitude, longitude)

    query = (
        '("wildfire" OR "forest fire" OR "wild fire" '
        'OR "fire outbreak" OR "forest blaze") '
        f'"{location}"'
    )

    params: dict[str, Any] = {
        "query": query,
        "mode": "artlist",
        "format": "json",
        "maxrecords": 10,
        "sort": "datedesc",
    }

    if selected_date:
        next_date = selected_date + timedelta(days=1)

        params["startdatetime"] = selected_date.strftime(
            "%Y%m%d000000"
        )
        params["enddatetime"] = next_date.strftime(
            "%Y%m%d000000"
        )
    else:
        params["timespan"] = "30d"

    data = None
    last_error = None

    # Retry only temporary rate-limit/server errors.
    for attempt in range(2):
        try:
            response = requests.get(
                GDELT_URL,
                params=params,
                headers=HEADERS,
                timeout=20,
            )

            if response.status_code == 429:
                last_error = "GDELT rate limit reached."

                if attempt == 0:
                    time.sleep(3)
                    continue

                break

            response.raise_for_status()
            data = response.json()
            break

        except requests.Timeout:
            last_error = "GDELT request timed out."

        except requests.RequestException as error:
            last_error = str(error)

            if (
                getattr(error.response, "status_code", 0) >= 500
                and attempt == 0
            ):
                time.sleep(2)
                continue

            break

        except ValueError:
            last_error = "GDELT returned invalid JSON."
            break

    if data is None:
        result = empty_response(
            latitude,
            longitude,
            incident_date,
            location,
            (
                f"{last_error} Please try again later. "
                "No photographs are available right now."
            ),
        )

        # Short cache for failed requests to avoid repeated calls
        set_cached(cache_key, result)
        return result

    articles = data.get("articles", [])
    images = []
    seen_urls = set()

    for article in articles:
        image_url = article.get("socialimage")
        article_url = article.get("url")

        if not image_url or not article_url:
            continue

        if not image_url.startswith(("https://", "http://")):
            continue

        if not article_url.startswith(("https://", "http://")):
            continue

        if image_url in seen_urls:
            continue

        seen_urls.add(image_url)

        images.append({
            "title": article.get(
                "title",
                "Wildfire news report",
            ),
            "image_url": image_url,
            "article_url": article_url,
            "source": article.get("domain", "News source"),
            "published_at": article.get("seendate"),
            "location": location,
            "image_type": "Related news photograph",
            "verified_for_exact_hotspot": False,
        })

    result = {
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "incident_date": incident_date,
        "count": len(images),
        "images": images,
        "message": (
            "Related news photographs found. "
            "They are not confirmed images of the exact fire detection."
            if images
            else "No matching news photographs were found "
            "for this location and date."
        ),
    }

    set_cached(cache_key, result)

    return result

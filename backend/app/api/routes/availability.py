
import os
import requests
import pandas as pd
from io import StringIO
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

MAP_KEY = (os.getenv("FIRMS_MAP_KEY") or "").strip()


@router.get("/availability")
def get_availability():
    if not MAP_KEY:
        raise HTTPException(
            status_code=500,
            detail="NASA MAP_KEY is missing",
        )

    url = (
        "https://firms.modaps.eosdis.nasa.gov/api/"
        f"data_availability/csv/{MAP_KEY}/all"
    )

    try:
        response = requests.get(url, timeout=20)
        response.raise_for_status()

        df = pd.read_csv(StringIO(response.text))

        return {
            "sensors": df.to_dict(orient="records")
        }

    except requests.RequestException as error:
        raise HTTPException(
            status_code=502,
            detail=f"NASA availability API failed: {error}",
        )

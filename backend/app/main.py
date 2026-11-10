
import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.api.routes.fires import router as fires_router
from app.api.routes.availability import router as availability_router
from app.api.routes.incident_images import router as incident_images_router

app = FastAPI(
    title="FireHarmonizer API",
    description="NASA MODIS and VIIRS fire detection and comparison API",
    version="0.2.0",
)


# CORS Configuration
# Default development origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:3000",
]

# Allow custom production domains via ALLOWED_ORIGINS (comma-separated) or FRONTEND_URL
extra_origins = os.getenv("ALLOWED_ORIGINS", "")
if extra_origins:
    origins.extend([origin.strip() for origin in extra_origins.split(",") if origin.strip()])

frontend_url = os.getenv("FRONTEND_URL", "").strip()
if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # Matches localhost/127.0.0.1 on any port, and any *.vercel.app deployment URL
    allow_origin_regex=r"^(https?://(localhost|127\.0\.0\.1)(:\d+)?|https://.*\.vercel\.app)$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    origin = request.headers.get("origin", "*")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
        },
    )


# Root Endpoint
@app.get("/")
def root():
    return {
        "project": "FireHarmonizer",
        "status": "online",
        "version": "0.2.0",
        "modules": [
            "Fire Detections",
            "Data Availability",
            "MODIS-VIIRS Comparison",
            "Incident Images",
        ],
    }


# Health Check
@app.get("/health")
def health_check():
    firms_key = (os.getenv("FIRMS_MAP_KEY") or "").strip()
    return {
        "status": "healthy",
        "service": "FireHarmonizer API",
        "firms_configured": bool(firms_key),
    }


# Register Routers
app.include_router(
    fires_router,
    prefix="/api",
    tags=["Fire Detections and Comparison"],
)

app.include_router(
    availability_router,
    prefix="/api",
    tags=["Data Availability"],
)
app.include_router(
    incident_images_router,
    prefix="/api",
    tags=["Incident Images"],
)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)


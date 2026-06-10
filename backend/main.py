from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from config import settings
from core.errors import register_error_handlers
from core.rate_limit import limiter
from api.v1.router import router as api_router
from models.common import HealthResponse


app = FastAPI(
    title="AI Exam Coach API",
    version="0.1.0",
    description="Syllabus-aware AI for Tamil Nadu +1 and +2 students",
    docs_url="/api/docs" if settings.app_env == "development" else None,
    redoc_url=None,
)

# Per-IP rate limiting (slowapi) — see core/rate_limit.py.
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

_origins = (
    ["*"] if settings.app_env == "development"
    else settings.allowed_origins.split(",")
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=_origins != ["*"],
    # Tightened in security audit: only the methods/headers the API uses,
    # instead of wildcards.
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Session-Token"],
)

register_error_handlers(app)
app.include_router(api_router)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check(response: Response):
    ollama_status = "unknown"
    supabase_status = "unknown"
    chroma_status = "unknown"

    try:
        import httpx
        async with httpx.AsyncClient() as client:
            r = await client.get(f"{settings.ollama_base_url}/api/tags", timeout=3.0)
            ollama_status = "ok" if r.status_code == 200 else "error"
    except Exception:
        ollama_status = "unavailable"

    try:
        from db.client import get_db
        db = get_db()
        db.table("subjects").select("id").limit(1).execute()
        supabase_status = "ok"
    except Exception:
        supabase_status = "unavailable"

    try:
        from modules.content_pipeline import get_collection_stats
        stats = get_collection_stats()
        chroma_status = f"ok ({stats['total_chunks']} chunks)"
    except Exception:
        chroma_status = "unavailable"

    any_down = any(
        s in ("unavailable", "error")
        for s in [ollama_status, supabase_status, chroma_status]
    )
    if any_down:
        response.status_code = 503
    return HealthResponse(
        status="degraded" if any_down else "ok",
        ollama=ollama_status,
        supabase=supabase_status,
        chromadb=chroma_status,
    )

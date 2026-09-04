import logging
import time

import httpx
from fastapi import FastAPI, HTTPException, Response
from fastapi.concurrency import run_in_threadpool
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

# Startup visibility for the auth fast path: with no JWT secret, core/auth.py
# silently skips local verification and every authenticated request pays a
# remote GoTrue round-trip. Logged via uvicorn.error — the app configures no
# logging of its own, and uvicorn's default config only attaches handlers to
# its own loggers. Fires once per worker.
if not settings.supabase_jwt_secret:
    logging.getLogger("uvicorn.error").warning(
        "SUPABASE_JWT_SECRET is unset — local JWT verification is disabled and "
        "every authenticated request performs a remote GoTrue round-trip "
        "(latency optimisation INACTIVE)."
    )


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


# ── Temporary latency diagnostic (Yadhum perf investigation, 2026-09) ───────
# Unauthenticated by design — gated only by DIAG_TOKEN so it can be deployed
# briefly without exposing the app. Disabled entirely (404) unless DIAG_TOKEN
# is set. Remove this endpoint, and diag_token in config.py, once the
# keep-alive/CPU-throttle question below is settled.

_DIAG_NOOP_ITERATIONS = 200_000  # tuned to ~1ms of pure-Python work


def _diag_noop_ms() -> float:
    start = time.perf_counter()
    total = 0
    for i in range(_DIAG_NOOP_ITERATIONS):
        total += i * i
    return (time.perf_counter() - start) * 1000


def _diag_supabase_call_ms() -> float:
    from db.client import get_db
    start = time.perf_counter()
    get_db().table("subjects").select("id").limit(1).execute()
    return (time.perf_counter() - start) * 1000


@app.get("/health/diag", tags=["Health"])
async def health_diag(token: str = ""):
    if not settings.diag_token or token != settings.diag_token:
        raise HTTPException(status_code=404, detail="Not found")

    t_noop_ms = _diag_noop_ms()
    t_call1_ms = await run_in_threadpool(_diag_supabase_call_ms)
    t_call2_ms = await run_in_threadpool(_diag_supabase_call_ms)
    t_call3_ms = await run_in_threadpool(_diag_supabase_call_ms)

    start = time.perf_counter()
    try:
        async with httpx.AsyncClient() as fresh_client:
            await fresh_client.get(f"{settings.supabase_url}/rest/v1/", timeout=10.0)
    except Exception:
        pass
    t_dns_tcp_tls_ms = (time.perf_counter() - start) * 1000

    return {
        "t_noop_ms":         round(t_noop_ms, 2),
        "t_call1_ms":        round(t_call1_ms, 2),
        "t_call2_ms":        round(t_call2_ms, 2),
        "t_call3_ms":        round(t_call3_ms, 2),
        "t_dns_tcp_tls_ms":  round(t_dns_tcp_tls_ms, 2),
    }

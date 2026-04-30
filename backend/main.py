from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from core.errors import register_error_handlers
from api.v1.router import router as api_router
from models.common import HealthResponse


app = FastAPI(
    title="AI Exam Coach API",
    version="0.1.0",
    description="Syllabus-aware AI for Tamil Nadu +1 and +2 students",
    docs_url="/api/docs" if settings.app_env == "development" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_error_handlers(app)
app.include_router(api_router)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
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

    return HealthResponse(
        status="ok",
        env=settings.app_env,
        ollama=ollama_status,
        supabase=supabase_status,
        chromadb=chroma_status,
    )

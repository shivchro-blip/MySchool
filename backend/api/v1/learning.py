from fastapi import APIRouter, Depends, HTTPException, Request
from models import ExplainRequest, ExplainResponse
from api.v1.deps import verify_session
from core.errors import AIUnavailableError, RateLimitError
from core.rate_limit import limiter, AI_CALL_LIMIT
from modules.learning import explain_topic

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
@limiter.limit(AI_CALL_LIMIT)
async def explain_topic_endpoint(
    request: Request,
    body: ExplainRequest,
    user: dict = Depends(verify_session),
):
    try:
        return await explain_topic(request=body, user_id=user["id"])
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/content/{chapter_slug}")
async def get_chapter_content(
    chapter_slug: str,
    chunk_type: str | None = None,
    language: str = "en",
    # Auth added in security audit: every legitimate consumer (web app,
    # TWA) is logged in; no reason to serve chapter content anonymously.
    user: dict = Depends(verify_session),
):
    from db.repositories import SyllabusRepository
    repo = SyllabusRepository()
    ch = repo.get_chapter_by_slug(chapter_slug)
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")
    chunks = repo.get_validated_chunks_by_chapter(
        ch["id"],
        chunk_type=chunk_type,
        language=language,
    )
    return {"chapter_id": ch["id"], "chunks": chunks}

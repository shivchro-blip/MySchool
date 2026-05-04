from fastapi import APIRouter, Depends, HTTPException
from models import ExplainRequest, ExplainResponse
from api.v1.deps import get_current_user
from core.errors import AIUnavailableError, RateLimitError
from modules.learning import explain_topic

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_topic_endpoint(
    request: ExplainRequest,
    user: dict = Depends(get_current_user),
):
    try:
        return await explain_topic(request=request, user_id=user["id"])
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

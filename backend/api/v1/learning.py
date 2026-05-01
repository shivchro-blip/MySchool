from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import ExplainRequest, ExplainResponse
from core.auth import get_current_user
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


@router.get("/content/{chapter_id}")
async def get_chapter_content(
    chapter_id: UUID,
    chunk_type: str | None = None,
    language: str = "en",
):
    from db.repositories import SyllabusRepository
    chunks = SyllabusRepository().get_validated_chunks_by_chapter(
        str(chapter_id),
        chunk_type=chunk_type,
        language=language,
    )
    return {"chapter_id": str(chapter_id), "chunks": chunks}

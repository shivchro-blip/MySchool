from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import ExplainRequest, ExplainResponse
from core.auth import get_current_user
from core.rate_limit import check_rate_limit
from core.errors import AIUnavailableError
from modules.learning import explain_topic

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_topic_endpoint(
    request: ExplainRequest,
    user: dict = Depends(get_current_user),
):
    """
    Generate AI explanation for a chapter or topic.

    - Retrieves relevant content from ChromaDB
    - Calls Ollama (or OpenRouter fallback)
    - Returns structured explanation with key points and exam tip
    - Supports English and Tamil responses
    - Results cached for 7 days
    """
    await check_rate_limit(user["id"])
    try:
        response = await explain_topic(request=request, user_id=user["id"])
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/content/{chapter_id}")
async def get_chapter_content(
    chapter_id: UUID,
    chunk_type: str | None = None,
    language: str = "en",
):
    """Return validated content chunks for a chapter. Public endpoint."""
    from db.client import get_db
    db = get_db()
    query = (
        db.table("content_chunks")
        .select("id, chunk_type, content, language, section_header")
        .eq("chapter_id", str(chapter_id))
        .eq("is_validated", True)
        .eq("language", language)
    )
    if chunk_type:
        query = query.eq("chunk_type", chunk_type)
    result = query.order("chunk_type").execute()
    return {"chapter_id": str(chapter_id), "chunks": result.data}

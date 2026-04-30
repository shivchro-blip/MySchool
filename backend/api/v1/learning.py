from fastapi import APIRouter, Depends
from uuid import UUID
from models import ExplainRequest, ExplainResponse
from core.auth import get_current_user
from core.rate_limit import check_rate_limit, increment_ai_call_count

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_topic(
    request: ExplainRequest,
    user: dict = Depends(get_current_user),
):
    """
    Generate AI explanation for a chapter/topic.
    Phase 4 will implement full AI logic — returns stub now.
    """
    await check_rate_limit(user["id"])

    stub_response = ExplainResponse(
        chapter_id=request.chapter_id,
        topic_id=request.topic_id,
        language=request.language,
        explanation="This is a stub explanation. Full AI implementation coming in Phase 4.",
        key_points=[
            "Key point 1 — coming in Phase 4",
            "Key point 2 — coming in Phase 4",
        ],
        exam_tip="Exam tip coming in Phase 4.",
        source_chunks=0,
        model_used="stub",
        cached=False,
    )

    await increment_ai_call_count(user["id"])
    return stub_response


@router.get("/content/{chapter_id}")
async def get_chapter_content(chapter_id: UUID, chunk_type: str | None = None):
    """Return validated content chunks for a chapter. Public endpoint."""
    from db.client import get_db
    db = get_db()
    query = (
        db.table("content_chunks")
        .select("*")
        .eq("chapter_id", str(chapter_id))
        .eq("is_validated", True)
    )
    if chunk_type:
        query = query.eq("chunk_type", chunk_type)
    result = query.order("chunk_type").execute()
    return result.data

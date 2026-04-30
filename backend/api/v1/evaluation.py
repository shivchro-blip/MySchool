from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import (
    SubmitAnswerRequest,
    EvaluationResponse,
    RetryRequest,
    ProgressResponse,
)
from core.auth import get_current_user
from core.rate_limit import check_rate_limit
from core.errors import NotFoundError, AIUnavailableError
from modules.evaluation import evaluate_answer, retry_evaluation
from db import responses as responses_db

router = APIRouter()


@router.post("/submit", response_model=EvaluationResponse)
async def submit_answer(
    request: SubmitAnswerRequest,
    user: dict = Depends(get_current_user),
):
    """
    Submit a student answer for AI evaluation.

    - Loads question rubric and answer key from database
    - Retrieves relevant content from ChromaDB for context
    - Calls Ollama (with OpenRouter fallback) to evaluate
    - Returns marks, feedback, and an improved model answer
    - Results cached to avoid duplicate AI calls
    """
    await check_rate_limit(user["id"])
    try:
        return await evaluate_answer(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.post("/retry", response_model=EvaluationResponse)
async def retry_answer(
    request: RetryRequest,
    user: dict = Depends(get_current_user),
):
    """
    Re-submit an improved answer for re-evaluation.
    Compares new answer against original attempt.
    Increments attempt number automatically.
    """
    await check_rate_limit(user["id"])
    try:
        return await retry_evaluation(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(user: dict = Depends(get_current_user)):
    """Return a student's overall progress and average scores."""
    all_responses = await responses_db.get_responses_by_user(user["id"], limit=100)
    total = len(all_responses)
    avg_score = 0.0

    if total > 0:
        scores = [
            (r["ai_score"] / r["max_score"]) * 100
            for r in all_responses
            if r.get("ai_score") is not None
        ]
        avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0

    by_chapter: dict[str, dict] = {}
    for r in all_responses:
        q = r.get("questions") or {}
        chapter_id = str(q.get("chapter_id", "unknown"))
        if chapter_id not in by_chapter:
            by_chapter[chapter_id] = {
                "chapter_id": chapter_id,
                "attempts": 0,
                "total_score": 0.0,
                "total_possible": 0,
            }
        by_chapter[chapter_id]["attempts"] += 1
        if r.get("ai_score") is not None:
            by_chapter[chapter_id]["total_score"] += r["ai_score"]
            by_chapter[chapter_id]["total_possible"] += r["max_score"]

    chapter_summary = [
        {
            "chapter_id": ch["chapter_id"],
            "attempts": ch["attempts"],
            "average_score": (
                round((ch["total_score"] / ch["total_possible"]) * 100, 1)
                if ch["total_possible"] > 0 else 0.0
            ),
        }
        for ch in by_chapter.values()
    ]

    return ProgressResponse(
        user_id=UUID(user["id"]),
        total_attempts=total,
        average_score=avg_score,
        by_chapter=chapter_summary,
    )


@router.get("/history")
async def get_history(
    user: dict = Depends(get_current_user),
    limit: int = 20,
):
    """Return the student's recent answer history with question text and scores."""
    data = await responses_db.get_responses_by_user(user["id"], limit=limit)
    return {"history": data, "total": len(data)}

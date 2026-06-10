from fastapi import APIRouter, Depends, HTTPException, Query, Request
from uuid import UUID
from models import (
    SubmitAnswerRequest,
    EvaluationResponse,
    RetryRequest,
    ProgressResponse,
)
from api.v1.deps import verify_session
from core.errors import NotFoundError, AIUnavailableError, RateLimitError
from core.rate_limit import limiter, AI_CALL_LIMIT
from modules.evaluation import evaluate_answer, retry_evaluation
from db.repositories import ResponsesRepository

router = APIRouter()


@router.post("/submit", response_model=EvaluationResponse)
@limiter.limit(AI_CALL_LIMIT)
async def submit_answer(
    request: Request,
    body: SubmitAnswerRequest,
    user: dict = Depends(verify_session),
):
    try:
        return await evaluate_answer(request=body, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.post("/retry", response_model=EvaluationResponse)
@limiter.limit(AI_CALL_LIMIT)
async def retry_answer(
    request: Request,
    body: RetryRequest,
    user: dict = Depends(verify_session),
):
    try:
        return await retry_evaluation(request=body, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(user: dict = Depends(verify_session)):
    repo          = ResponsesRepository()
    all_responses = repo.get_by_user(user["id"], limit=100)
    total         = len(all_responses)
    avg_score     = 0.0

    if total > 0:
        scores = [
            (r["ai_score"] / r["max_score"]) * 100
            for r in all_responses
            if r.get("ai_score") is not None
        ]
        avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0

    by_chapter: dict[str, dict] = {}
    for r in all_responses:
        q          = r.get("questions") or {}
        chapter_id = str(q.get("chapter_id", "unknown"))
        if chapter_id not in by_chapter:
            by_chapter[chapter_id] = {
                "chapter_id":     chapter_id,
                "attempts":       0,
                "total_score":    0.0,
                "total_possible": 0,
            }
        by_chapter[chapter_id]["attempts"] += 1
        if r.get("ai_score") is not None:
            by_chapter[chapter_id]["total_score"]    += r["ai_score"]
            by_chapter[chapter_id]["total_possible"] += r["max_score"]

    chapter_summary = [
        {
            "chapter_id":    ch["chapter_id"],
            "attempts":      ch["attempts"],
            "average_score": round(
                (ch["total_score"] / ch["total_possible"]) * 100, 1
            ) if ch["total_possible"] > 0 else 0.0,
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
    user: dict = Depends(verify_session),
    # Bounded in security audit: was an unbounded client-controlled value.
    limit: int = Query(default=20, ge=1, le=100),
):
    data = ResponsesRepository().get_by_user(user["id"], limit=limit)
    return {"history": data, "total": len(data)}

from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import (
    SubmitAnswerRequest,
    EvaluationResponse,
    FeedbackDetail,
    RetryRequest,
    ProgressResponse,
)
from core.auth import get_current_user
from core.rate_limit import check_rate_limit, increment_ai_call_count
from db import responses as responses_db
from db import questions as questions_db
from core.errors import NotFoundError

router = APIRouter()


@router.post("/submit", response_model=EvaluationResponse)
async def submit_answer(
    request: SubmitAnswerRequest,
    user: dict = Depends(get_current_user),
):
    """Submit a student answer for AI evaluation. Phase 5 implements full AI logic."""
    await check_rate_limit(user["id"])

    question = await questions_db.get_question_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    saved = await responses_db.save_response(
        user_id=user["id"],
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=question["marks"],
        attempt_number=request.attempt_number,
    )

    stub_feedback = FeedbackDetail(
        strengths=["Good attempt — AI evaluation coming in Phase 5"],
        weaknesses=["Full feedback coming in Phase 5"],
        missing_points=["Missing points analysis coming in Phase 5"],
        structure_comment="Structure analysis coming in Phase 5.",
        grammar_comment="Grammar check coming in Phase 5.",
    )

    stub_response = EvaluationResponse(
        response_id=UUID(saved["id"]),
        question_id=request.question_id,
        marks_awarded=0.0,
        marks_total=question["marks"],
        percentage=0.0,
        feedback=stub_feedback,
        improved_answer="Improved answer coming in Phase 5.",
        model_used="stub",
        cached=False,
    )

    await increment_ai_call_count(user["id"])
    return stub_response


@router.post("/retry", response_model=EvaluationResponse)
async def retry_answer(
    request: RetryRequest,
    user: dict = Depends(get_current_user),
):
    """Submit improved answer for re-evaluation. Phase 5 implements this."""
    await check_rate_limit(user["id"])
    raise HTTPException(status_code=501, detail="Retry endpoint coming in Phase 5.")


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(user: dict = Depends(get_current_user)):
    """Return a student's overall progress and scores."""
    responses = await responses_db.get_responses_by_user(user["id"])
    total = len(responses)
    scores = [
        r["ai_score"] / r["max_score"] * 100
        for r in responses
        if r.get("ai_score") is not None
    ]
    avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0
    return ProgressResponse(
        user_id=UUID(user["id"]),
        total_attempts=total,
        average_score=avg_score,
        by_chapter=[],
    )

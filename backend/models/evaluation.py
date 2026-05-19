from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime


class SubmitAnswerRequest(BaseModel):
    question_id: UUID
    student_answer: str = Field(min_length=10, max_length=5000)
    attempt_number: int = Field(default=1, ge=1, le=5)


class FeedbackDetail(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    missing_points: list[str]
    structure_comment: str
    grammar_comment: str


class EvaluationResponse(BaseModel):
    response_id: UUID
    question_id: UUID
    marks_awarded: float
    marks_total: int
    percentage: float
    feedback: FeedbackDetail
    improved_answer: str
    model_used: str
    cached: bool = False


class RetryRequest(BaseModel):
    response_id: UUID
    new_answer: str = Field(min_length=10, max_length=5000)


class ProgressResponse(BaseModel):
    user_id: UUID
    total_attempts: int
    average_score: float
    by_chapter: list[dict]

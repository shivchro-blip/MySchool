from pydantic import BaseModel, Field
from typing import Literal
from uuid import UUID


class ExplainRequest(BaseModel):
    chapter_id: UUID
    topic_id: UUID | None = None
    question: str = Field(
        default="",
        max_length=500,
        description="Optional student question about the topic",
    )
    language: Literal["en", "ta"] = "en"


class ExplainResponse(BaseModel):
    chapter_id: UUID
    topic_id: UUID | None
    language: str
    explanation: str
    key_points: list[str]
    exam_tip: str
    source_chunks: int = Field(description="Number of content chunks used")
    model_used: str
    cached: bool = False

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime


class SubjectResponse(BaseModel):
    id: UUID
    code: str
    name: str
    class_level: str = Field(alias="class")
    is_active: bool
    created_at: datetime

    model_config = {"populate_by_name": True}


class ChapterResponse(BaseModel):
    id: UUID
    subject_id: UUID
    number: int
    title: str
    content_type: str
    is_active: bool


class TopicResponse(BaseModel):
    id: UUID
    chapter_id: UUID
    title: str
    order_index: int


class SyllabusTreeResponse(BaseModel):
    subject: SubjectResponse
    chapters: list[ChapterResponse]

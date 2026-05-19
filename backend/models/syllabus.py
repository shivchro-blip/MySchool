"""
Syllabus Pydantic models.
All Literal types are derived from core/tn_board.py constants
so the API enforces Tamil Nadu board constraints at the boundary.
"""

from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from datetime import datetime
from typing import Literal

from core.tn_board import (
    VALID_CLASS_LEVELS,
    VALID_CONTENT_TYPES,
    VALID_CHUNK_TYPES,
    VALID_QUESTION_TYPES,
    VALID_MARK_LEVELS,
    VALID_LANGUAGES,
    validate_class_level,
    validate_content_type,
    validate_marks,
)

# Build Literal types dynamically from TN board constants
# If a new class level or content type is added to tn_board.py,
# these models update automatically.
ClassLevelType   = Literal["+1", "+2"]
ContentTypeType  = Literal["prose", "poem", "grammar", "vocabulary"]
ChunkTypeType    = Literal[
    "summary", "explanation", "key_points", "example",
    "glossary", "exam_tip", "author_info", "theme", "character"
]
QuestionTypeType = Literal[
    "short_answer", "paragraph", "essay", "fill_blank", "match"
]
LanguageType     = Literal["en", "ta"]


class SubjectResponse(BaseModel):
    id:          UUID
    code:        str
    name:        str
    slug:        str
    class_level: ClassLevelType = Field(alias="class")
    is_active:   bool
    created_at:  datetime

    model_config = {"populate_by_name": True}


class ChapterResponse(BaseModel):
    id:           UUID
    subject_id:   UUID
    number:       int
    title:        str
    slug:         str
    content_type: ContentTypeType
    is_active:    bool

    @field_validator("content_type")
    @classmethod
    def content_type_must_be_valid(cls, v: str) -> str:
        return validate_content_type(v)


class TopicResponse(BaseModel):
    id:          UUID
    chapter_id:  UUID
    title:       str
    order_index: int


class SyllabusTreeResponse(BaseModel):
    subject:  SubjectResponse
    chapters: list[ChapterResponse]


class ContentChunkResponse(BaseModel):
    id:             UUID
    chunk_type:     ChunkTypeType
    content:        str
    language:       LanguageType
    section_header: str | None
    is_validated:   bool


class QuestionResponse(BaseModel):
    id:            UUID
    chapter_id:    UUID
    topic_id:      UUID | None
    question_text: str
    marks:         int
    question_type: QuestionTypeType
    answer_key:    dict | None
    rubric:        dict | None
    is_validated:  bool

    @field_validator("marks")
    @classmethod
    def marks_must_be_valid(cls, v: int) -> int:
        return validate_marks(v)

from fastapi import APIRouter, HTTPException
from uuid import UUID
from models import ChapterResponse, TopicResponse, SubjectResponse
from db.repositories import SyllabusRepository, QuestionsRepository

router = APIRouter()


@router.get("/subjects", response_model=list[SubjectResponse])
async def get_subjects():
    return SyllabusRepository().get_all_subjects()


@router.get("/subjects/{subject_id}/chapters", response_model=list[ChapterResponse])
async def get_chapters(subject_id: UUID):
    data = SyllabusRepository().get_chapters_by_subject(str(subject_id))
    if not data:
        raise HTTPException(status_code=404, detail="Subject not found or has no chapters")
    return data


@router.get("/chapters/{chapter_id}/topics", response_model=list[TopicResponse])
async def get_topics(chapter_id: UUID):
    return SyllabusRepository().get_topics_by_chapter(str(chapter_id))


@router.get("/chapters/{chapter_id}/questions")
async def get_questions(chapter_id: UUID, marks: int | None = None):
    return QuestionsRepository().get_by_chapter(str(chapter_id), marks=marks)

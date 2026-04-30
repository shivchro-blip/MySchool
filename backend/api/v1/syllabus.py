from fastapi import APIRouter, HTTPException
from uuid import UUID
from db import syllabus as syllabus_db
from db import questions as questions_db
from models import ChapterResponse, TopicResponse, SubjectResponse

router = APIRouter()


@router.get("/subjects", response_model=list[SubjectResponse])
async def get_subjects():
    return await syllabus_db.get_all_subjects()


@router.get("/subjects/{subject_id}/chapters", response_model=list[ChapterResponse])
async def get_chapters(subject_id: UUID):
    data = await syllabus_db.get_chapters_by_subject(str(subject_id))
    if not data:
        raise HTTPException(status_code=404, detail="Subject not found or has no chapters")
    return data


@router.get("/chapters/{chapter_id}/topics", response_model=list[TopicResponse])
async def get_topics(chapter_id: UUID):
    return await syllabus_db.get_topics_by_chapter(str(chapter_id))


@router.get("/chapters/{chapter_id}/questions")
async def get_questions(chapter_id: UUID, marks: int | None = None):
    return await questions_db.get_questions_by_chapter(str(chapter_id), marks=marks)

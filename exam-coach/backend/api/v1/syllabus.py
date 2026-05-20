from fastapi import APIRouter, HTTPException
from models import ChapterResponse, TopicResponse, SubjectResponse
from db.repositories import SyllabusRepository, QuestionsRepository

router = APIRouter()


@router.get("/subjects", response_model=list[SubjectResponse])
async def get_subjects():
    return SyllabusRepository().get_all_subjects()


@router.get("/subjects/{subject_slug}/chapters", response_model=list[ChapterResponse])
async def get_chapters(subject_slug: str):
    repo = SyllabusRepository()
    subj = repo.get_subject_by_slug(subject_slug)
    if not subj:
        raise HTTPException(status_code=404, detail="Subject not found")
    data = repo.get_chapters_by_subject(subj["id"])
    if not data:
        raise HTTPException(status_code=404, detail="Subject has no chapters")
    return data


@router.get("/chapters/{chapter_slug}/topics", response_model=list[TopicResponse])
async def get_topics(chapter_slug: str):
    repo = SyllabusRepository()
    ch = repo.get_chapter_by_slug(chapter_slug)
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return repo.get_topics_by_chapter(ch["id"])


@router.get("/chapters/{chapter_slug}/questions")
async def get_questions(chapter_slug: str, marks: int | None = None):
    repo = SyllabusRepository()
    ch = repo.get_chapter_by_slug(chapter_slug)
    if not ch:
        raise HTTPException(status_code=404, detail="Chapter not found")
    return QuestionsRepository().get_by_chapter(ch["id"], marks=marks)

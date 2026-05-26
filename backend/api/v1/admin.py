import re
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, Field
from uuid import UUID
from api.v1.deps import get_admin_user
from db.client import get_db

router = APIRouter()

STRUCTURED_CONTENT_DIR = Path(__file__).resolve().parents[2] / "content" / "structured"
MAX_HTML_IMPORT_BYTES = 5 * 1024 * 1024
HTML_CONTENT_TYPES = {"text/html", "application/xhtml+xml"}


# ── Pydantic models ─────────────────────────────────────────────────────────

class ReviewEvaluationRequest(BaseModel):
    human_score: float = Field(ge=0, le=10)
    human_notes: str   = Field(default="", max_length=1000)


class CreateQuestionRequest(BaseModel):
    subject_id:    UUID
    chapter_id:    UUID
    topic_id:      UUID | None = None
    question_text: str  = Field(min_length=10, max_length=1000)
    marks:         int  = Field(ge=1, le=10)
    question_type: str
    answer_key:    dict | None = None
    rubric:        dict | None = None
    source:        str  = "manual"


class UpdateQuestionRequest(BaseModel):
    question_text: str  | None = None
    answer_key:    dict | None = None
    rubric:        dict | None = None
    is_validated:  bool | None = None
    is_active:     bool | None = None


class TriggerPipelineRequest(BaseModel):
    subject_id:  UUID
    chapter_id:  UUID
    topic_id:    UUID | None = None
    json_path:   str = Field(description="Path to structured JSON in content/structured/")


# ── Content validation ───────────────────────────────────────────────────────

@router.get("/content/pending")
async def get_pending_content(
    limit: int = 50,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    result = (
        db.table("content_chunks")
        .select(
            "id, chunk_type, content, language, section_header, "
            "created_at, subjects(name, class), chapters(title, number)"
        )
        .eq("is_validated", False)
        .order("created_at", desc=False)
        .limit(limit)
        .execute()
    )
    return {
        "pending": result.data,
        "total":   len(result.data),
    }


@router.post("/content/validate/{chunk_id}")
async def validate_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    result = (
        db.table("content_chunks")
        .update({"is_validated": True})
        .eq("id", str(chunk_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Chunk not found")
    return {"status": "validated", "chunk_id": str(chunk_id)}


@router.post("/content/invalidate/{chunk_id}")
async def invalidate_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    db.table("content_chunks").update(
        {"is_validated": False}
    ).eq("id", str(chunk_id)).execute()
    return {"status": "invalidated", "chunk_id": str(chunk_id)}


@router.delete("/content/{chunk_id}")
async def delete_chunk(
    chunk_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    db.table("content_chunks").delete().eq("id", str(chunk_id)).execute()
    return {"status": "deleted", "chunk_id": str(chunk_id)}


@router.put("/content/{chunk_id}")
async def edit_chunk(
    chunk_id: UUID,
    body: dict,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    allowed = {k: v for k, v in body.items()
               if k in ("content", "chunk_type", "section_header")}
    if not allowed:
        raise HTTPException(status_code=400, detail="No valid fields to update")
    result = (
        db.table("content_chunks")
        .update(allowed)
        .eq("id", str(chunk_id))
        .execute()
    )
    return result.data[0] if result.data else {}


# ── Evaluation review ────────────────────────────────────────────────────────

@router.get("/evaluations/pending")
async def get_pending_evaluations(
    limit: int = 50,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    result = (
        db.table("responses")
        .select(
            "id, student_answer, ai_score, max_score, ai_feedback, "
            "improved_answer, attempt_number, created_at, "
            "questions(question_text, marks), users(full_name)"
        )
        .eq("is_human_reviewed", False)
        .not_.is_("ai_score", "null")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return {
        "pending": result.data,
        "total":   len(result.data),
    }


@router.post("/evaluations/{response_id}/review")
async def review_evaluation(
    response_id: UUID,
    body: ReviewEvaluationRequest,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    result = (
        db.table("responses")
        .update({
            "human_score":       body.human_score,
            "human_notes":       body.human_notes,
            "is_human_reviewed": True,
        })
        .eq("id", str(response_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Response not found")
    return {"status": "reviewed", "response_id": str(response_id)}


# ── Question management ──────────────────────────────────────────────────────

@router.get("/questions")
async def get_all_questions(
    chapter_id: str | None = None,
    validated:  bool | None = None,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    query = (
        db.table("questions")
        .select(
            "*, subjects(name, class), chapters(title, number)"
        )
        .order("created_at", desc=True)
    )
    if chapter_id:
        query = query.eq("chapter_id", chapter_id)
    if validated is not None:
        query = query.eq("is_validated", validated)
    result = query.execute()
    return {"questions": result.data, "total": len(result.data)}


@router.post("/questions")
async def create_question(
    body: CreateQuestionRequest,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    result = db.table("questions").insert({
        "subject_id":    str(body.subject_id),
        "chapter_id":    str(body.chapter_id),
        "topic_id":      str(body.topic_id) if body.topic_id else None,
        "question_text": body.question_text,
        "marks":         body.marks,
        "question_type": body.question_type,
        "answer_key":    body.answer_key,
        "rubric":        body.rubric,
        "source":        body.source,
        "is_validated":  False,
    }).execute()
    return result.data[0]


@router.put("/questions/{question_id}")
async def update_question(
    question_id: UUID,
    body: UpdateQuestionRequest,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    update_data = body.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = (
        db.table("questions")
        .update(update_data)
        .eq("id", str(question_id))
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Question not found")
    return result.data[0]


@router.delete("/questions/{question_id}")
async def delete_question(
    question_id: UUID,
    admin: dict = Depends(get_admin_user),
):
    db = get_db()
    db.table("questions").update(
        {"is_active": False}
    ).eq("id", str(question_id)).execute()
    return {"status": "deactivated", "question_id": str(question_id)}


# ── Stats and monitoring ─────────────────────────────────────────────────────

@router.get("/stats")
async def get_system_stats(
    admin: dict = Depends(get_admin_user),
):
    db = get_db()

    users_result     = db.table("users").select("id", count="exact").execute()
    chunks_result    = db.table("content_chunks").select("id, is_validated", count="exact").execute()
    questions_result = db.table("questions").select("id, is_validated", count="exact").execute()
    responses_result = db.table("responses").select("id, ai_score, max_score").execute()
    cache_result     = db.table("ai_cache").select("id, hit_count").execute()
    logs_result      = (
        db.table("usage_logs")
        .select("action, was_cached, model_used")
        .order("created_at", desc=True)
        .limit(500)
        .execute()
    )

    chunks    = chunks_result.data or []
    questions = questions_result.data or []
    responses = responses_result.data or []
    logs      = logs_result.data or []
    cache     = cache_result.data or []

    validated_chunks    = sum(1 for c in chunks    if c["is_validated"])
    validated_questions = sum(1 for q in questions if q["is_validated"])

    scored = [r for r in responses if r.get("ai_score") is not None]
    avg_score = 0.0
    if scored:
        pcts = [(r["ai_score"] / r["max_score"]) * 100 for r in scored]
        avg_score = round(sum(pcts) / len(pcts), 1)

    total_hits   = sum(c.get("hit_count", 1) for c in cache)
    cached_calls = sum(1 for l in logs if l["was_cached"])
    total_calls  = len(logs)

    return {
        "users": {
            "total": users_result.count or 0,
        },
        "content": {
            "total_chunks":     len(chunks),
            "validated_chunks": validated_chunks,
            "pending_chunks":   len(chunks) - validated_chunks,
        },
        "questions": {
            "total":     len(questions),
            "validated": validated_questions,
            "pending":   len(questions) - validated_questions,
        },
        "evaluations": {
            "total":              len(responses),
            "scored":             len(scored),
            "average_score_pct":  avg_score,
        },
        "cache": {
            "total_entries": len(cache),
            "total_hits":    total_hits,
            "cached_calls":  cached_calls,
            "cache_hit_rate": (
                round((cached_calls / total_calls) * 100, 1)
                if total_calls > 0 else 0.0
            ),
        },
        "ai_calls": {
            "total":     total_calls,
            "by_model":  _group_by(logs, "model_used"),
            "by_action": _group_by(logs, "action"),
        },
    }


def _group_by(items: list[dict], key: str) -> dict:
    result: dict[str, int] = {}
    for item in items:
        val = item.get(key, "unknown")
        result[val] = result.get(val, 0) + 1
    return result


# ── HTML practice import ─────────────────────────────────────────────────────

@router.post("/questions/import-html")
async def import_practice_html(
    chapter_slug: str = Form(...),
    file: UploadFile = File(...),
    admin: dict = Depends(get_admin_user),
):
    html = await _read_html_upload(file)
    try:
        questions = _parse_practice_html(html)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not questions:
        raise HTTPException(status_code=400, detail="No questions extracted from HTML")

    db = get_db()
    chapter = (
        db.table("chapters")
        .select("id, subject_id")
        .eq("slug", chapter_slug)
        .maybe_single()
        .execute()
    ).data
    if not chapter:
        raise HTTPException(status_code=404, detail=f"Chapter not found: {chapter_slug}")

    rows = [
        {
            "subject_id":    chapter["subject_id"],
            "chapter_id":    chapter["id"],
            "question_text": q["question_text"],
            "marks":         q["marks"],
            "question_type": q["question_type"],
            "answer_key":    q["answer_key"],
            "rubric":        q.get("rubric"),
            "source":        "manual",
            "is_validated":  False,
        }
        for q in questions
    ]

    result = db.table("questions").insert(rows).execute()
    return {"inserted": len(result.data), "chapter_slug": chapter_slug}


async def _read_html_upload(file: UploadFile) -> str:
    content_type = (file.content_type or "").split(";", 1)[0].lower()
    if content_type not in HTML_CONTENT_TYPES:
        raise HTTPException(status_code=415, detail="Only HTML uploads are supported")

    known_size = getattr(file, "size", None)
    if known_size is not None and known_size > MAX_HTML_IMPORT_BYTES:
        raise HTTPException(status_code=413, detail="HTML upload is too large")

    chunks: list[bytes] = []
    total = 0
    while True:
        chunk = await file.read(1024 * 1024)
        if not chunk:
            break
        total += len(chunk)
        if total > MAX_HTML_IMPORT_BYTES:
            raise HTTPException(status_code=413, detail="HTML upload is too large")
        chunks.append(chunk)

    try:
        return b"".join(chunks).decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="HTML upload must be UTF-8")


def _unescape_js(s: str) -> str:
    return s.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\")


def _extract_js_array(script: str, var_name: str) -> str:
    """Return content inside const <var_name>=[...] using bracket counting."""
    marker = f"const {var_name}=["
    pos = script.find(marker)
    if pos == -1:
        return ""
    pos += len(marker)
    depth = 1
    i = pos
    while i < len(script) and depth > 0:
        if script[i] == "[":
            depth += 1
        elif script[i] == "]":
            depth -= 1
        i += 1
    return script[pos : i - 1]


def _parse_p2(script: str) -> list[dict]:
    content = _extract_js_array(script, "P2Qs")
    if not content:
        return []

    entry_re = re.compile(
        r'\{verse:`([^`]*)`[^[]*\[(.*?)\]\s*\}',
        re.DOTALL,
    )
    sub_re = re.compile(
        r"\{q:'((?:[^'\\]|\\.)*)',\s*a:'((?:[^'\\]|\\.)*)'\}",
        re.DOTALL,
    )

    results = []
    for entry in entry_re.finditer(content):
        verse = entry.group(1).strip()
        subs = [
            {"q": _unescape_js(m.group(1)), "a": _unescape_js(m.group(2))}
            for m in sub_re.finditer(entry.group(2))
        ]
        if not subs:
            continue

        sub_lines = "\n".join(
            f"({chr(97 + i)}) {s['q']}" for i, s in enumerate(subs)
        )
        question_text = (
            f'Read the following lines carefully and answer the questions:\n\n'
            f'"{verse}"\n\n{sub_lines}'
        )
        answer_key = {f"sub_{chr(97 + i)}": s for i, s in enumerate(subs)}

        results.append({
            "question_text": question_text,
            "marks":         2,
            "question_type": "short_answer",
            "answer_key":    answer_key,
        })

    return results


def _parse_p3_p4(script: str, var_name: str, question_type: str) -> list[dict]:
    content = _extract_js_array(script, var_name)
    if not content:
        return []

    pattern = re.compile(
        r"\{q:'((?:[^'\\]|\\.)*)',\s*mark:'(\d+)',\s*ans:'((?:[^'\\]|\\.)*)'\}",
        re.DOTALL,
    )

    return [
        {
            "question_text": _unescape_js(m.group(1)),
            "marks":         int(m.group(2)),
            "question_type": question_type,
            "answer_key":    {"model_answer": _unescape_js(m.group(3))},
        }
        for m in pattern.finditer(content)
    ]


def _parse_practice_html(html: str) -> list[dict]:
    m = re.search(r"<script>(.*?)</script>", html, re.DOTALL)
    if not m:
        raise ValueError("No <script> block found in HTML")
    script = m.group(1)

    questions = []
    questions.extend(_parse_p2(script))
    questions.extend(_parse_p3_p4(script, "P3Qs", "paragraph"))
    questions.extend(_parse_p3_p4(script, "P4Qs", "essay"))
    return questions


def _resolve_structured_json_path(json_path: str) -> Path:
    base_dir = STRUCTURED_CONTENT_DIR.resolve()
    raw_path = Path(json_path)

    if raw_path.is_absolute():
        candidate = raw_path.resolve()
    else:
        cwd_candidate = (Path.cwd() / raw_path).resolve()
        if _is_relative_to(cwd_candidate, base_dir):
            candidate = cwd_candidate
        elif len(raw_path.parts) >= 2 and raw_path.parts[:2] == ("content", "structured"):
            candidate = (base_dir / Path(*raw_path.parts[2:])).resolve()
        else:
            candidate = (base_dir / raw_path).resolve()

    if candidate.suffix.lower() != ".json":
        raise HTTPException(status_code=400, detail="json_path must point to a .json file")
    if not _is_relative_to(candidate, base_dir):
        raise HTTPException(
            status_code=400,
            detail="json_path must stay within content/structured/",
        )
    return candidate


def _is_relative_to(path: Path, base: Path) -> bool:
    try:
        path.relative_to(base)
    except ValueError:
        return False
    return True


# ── Content pipeline trigger ─────────────────────────────────────────────────

@router.post("/pipeline/trigger")
async def trigger_pipeline(
    body: TriggerPipelineRequest,
    admin: dict = Depends(get_admin_user),
):
    from modules.content_pipeline import (
        load_structured_json,
        embed_chunks,
        load_chunks_to_db,
    )

    json_path = _resolve_structured_json_path(body.json_path)
    if not json_path.exists():
        raise HTTPException(
            status_code=400,
            detail=f"JSON file not found: {body.json_path}. "
                   f"Run scripts/pdf_extract.py first.",
        )

    chunks = load_structured_json(str(json_path))
    if not chunks:
        raise HTTPException(status_code=400, detail="JSON file is empty")

    embed_chunks(chunks)

    count = await load_chunks_to_db(
        chunks=chunks,
        subject_id=str(body.subject_id),
        chapter_id=str(body.chapter_id),
        topic_id=str(body.topic_id) if body.topic_id else None,
    )

    return {
        "status":          "ok",
        "chunks_embedded": len(chunks),
        "chunks_inserted": count,
        "json_path":       body.json_path,
    }

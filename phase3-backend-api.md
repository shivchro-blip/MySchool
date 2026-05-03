# AI Exam Coach — Phase 3: Backend API Skeleton
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the complete FastAPI backend skeleton.
All routes, Pydantic models, middleware, and error handling.
AI logic is NOT implemented yet — that is Phase 4 and 5.
Every endpoint returns a structured stub response so the
frontend can be built against it in Phase 6.

---

## Step 1: Install additional packages

```bash
cd backend
pip install python-jose[cryptography] passlib[bcrypt] slowapi
```

Add to backend/pyproject.toml dependencies:
```toml
"python-jose[cryptography]",
"passlib[bcrypt]",
"slowapi",
```

---

## Step 2: Create all files with exactly the content shown

---

### FILE: backend/models/syllabus.py

```python
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
```

---

### FILE: backend/models/learning.py

```python
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
```

---

### FILE: backend/models/evaluation.py

```python
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
```

---

### FILE: backend/models/user.py

```python
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Literal
from datetime import datetime


class UserProfileResponse(BaseModel):
    id: UUID
    full_name: str | None
    class_level: str | None
    school: str | None
    plan: Literal["free", "paid"]
    daily_ai_calls: int
    created_at: datetime


class UpdateProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, max_length=100)
    class_level: str | None = Field(default=None)
    school: str | None = Field(default=None, max_length=200)


class UsageStatsResponse(BaseModel):
    daily_ai_calls: int
    daily_limit: int
    calls_remaining: int
    plan: str
```

---

### FILE: backend/models/common.py

```python
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    env: str
    ollama: str
    supabase: str
    chromadb: str


class ErrorResponse(BaseModel):
    error: str
    detail: str | None = None
    code: str | None = None


class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    page_size: int
    has_more: bool
```

---

### FILE: backend/models/__init__.py

```python
from .syllabus import (
    SubjectResponse,
    ChapterResponse,
    TopicResponse,
    SyllabusTreeResponse,
)
from .learning import ExplainRequest, ExplainResponse
from .evaluation import (
    SubmitAnswerRequest,
    EvaluationResponse,
    RetryRequest,
    ProgressResponse,
    FeedbackDetail,
)
from .user import UserProfileResponse, UpdateProfileRequest, UsageStatsResponse
from .common import HealthResponse, ErrorResponse, PaginatedResponse

__all__ = [
    "SubjectResponse",
    "ChapterResponse",
    "TopicResponse",
    "SyllabusTreeResponse",
    "ExplainRequest",
    "ExplainResponse",
    "SubmitAnswerRequest",
    "EvaluationResponse",
    "RetryRequest",
    "ProgressResponse",
    "FeedbackDetail",
    "UserProfileResponse",
    "UpdateProfileRequest",
    "UsageStatsResponse",
    "HealthResponse",
    "ErrorResponse",
    "PaginatedResponse",
]
```

---

### FILE: backend/core/__init__.py

```python
```

---

### FILE: backend/core/errors.py

```python
# Centralised error handling
# All custom exceptions and FastAPI exception handlers live here

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


class AppError(Exception):
    def __init__(
        self,
        message: str,
        code: str = "APP_ERROR",
        status_code: int = 400,
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class NotFoundError(AppError):
    def __init__(self, resource: str, id: str):
        super().__init__(
            message=f"{resource} not found: {id}",
            code="NOT_FOUND",
            status_code=404,
        )


class RateLimitError(AppError):
    def __init__(self):
        super().__init__(
            message="Daily AI call limit reached. Upgrade to paid plan for more.",
            code="RATE_LIMIT",
            status_code=429,
        )


class AIUnavailableError(AppError):
    def __init__(self):
        super().__init__(
            message="AI service is temporarily unavailable. Please try again.",
            code="AI_UNAVAILABLE",
            status_code=503,
        )


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.message,
                "code": exc.code,
            },
        )

    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc):
        return JSONResponse(
            status_code=404,
            content={
                "error": f"Route not found: {request.url.path}",
                "code": "ROUTE_NOT_FOUND",
            },
        )

    @app.exception_handler(500)
    async def server_error_handler(request: Request, exc):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal server error",
                "code": "SERVER_ERROR",
            },
        )
```

---

### FILE: backend/core/rate_limit.py

```python
# Rate limiting
# Free users: 20 AI calls per day
# Paid users: unlimited

from fastapi import Depends, HTTPException
from db.client import get_db
from core.errors import RateLimitError

FREE_DAILY_LIMIT = 20


async def check_rate_limit(user_id: str) -> None:
    """
    Check if a user has exceeded their daily AI call limit.
    Raises RateLimitError if limit is exceeded.
    Uses the users.daily_ai_calls counter in Supabase.
    """
    db = get_db()
    result = (
        db.table("users")
        .select("plan, daily_ai_calls")
        .eq("id", user_id)
        .single()
        .execute()
    )

    if not result.data:
        return

    user = result.data
    if user["plan"] == "paid":
        return

    if user["daily_ai_calls"] >= FREE_DAILY_LIMIT:
        raise RateLimitError()


async def increment_ai_call_count(user_id: str) -> None:
    """Increment the daily AI call counter for a user."""
    db = get_db()
    result = (
        db.table("users")
        .select("daily_ai_calls")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if result.data:
        current = result.data["daily_ai_calls"]
        db.table("users").update(
            {"daily_ai_calls": current + 1}
        ).eq("id", user_id).execute()
```

---

### FILE: backend/core/auth.py

```python
# Auth helpers
# Validates Supabase JWT tokens from request headers
# All protected routes use get_current_user dependency

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.client import get_db

bearer_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    """
    Validate the Supabase JWT from Authorization header.
    Returns the user dict from Supabase auth.
    Raises 401 if token is missing or invalid.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token required",
        )

    db = get_db()
    try:
        user = db.auth.get_user(credentials.credentials)
        if not user or not user.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
            )
        return {"id": str(user.user.id), "email": user.user.email}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict | None:
    """
    Same as get_current_user but returns None instead of 401.
    Use for endpoints that work for both guests and logged-in users.
    """
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except Exception:
        return None
```

---

### FILE: backend/api/__init__.py

```python
```

---

### FILE: backend/api/v1/__init__.py

```python
```

---

### FILE: backend/api/v1/router.py

```python
# Main API v1 router
# Registers all sub-routers

from fastapi import APIRouter
from .syllabus import router as syllabus_router
from .learning import router as learning_router
from .evaluation import router as evaluation_router
from .users import router as users_router

router = APIRouter(prefix="/api/v1")

router.include_router(syllabus_router,   prefix="/syllabus",    tags=["Syllabus"])
router.include_router(learning_router,   prefix="/learning",    tags=["Learning"])
router.include_router(evaluation_router, prefix="/evaluation",  tags=["Evaluation"])
router.include_router(users_router,      prefix="/users",       tags=["Users"])
```

---

### FILE: backend/api/v1/syllabus.py

```python
# Syllabus routes
# Public endpoints — no auth required
# GET /api/v1/syllabus/subjects
# GET /api/v1/syllabus/subjects/{subject_id}/chapters
# GET /api/v1/syllabus/chapters/{chapter_id}/topics
# GET /api/v1/syllabus/chapters/{chapter_id}/questions

from fastapi import APIRouter, HTTPException
from uuid import UUID
from db import syllabus as syllabus_db
from db import questions as questions_db
from models import ChapterResponse, TopicResponse, SubjectResponse

router = APIRouter()


@router.get("/subjects", response_model=list[SubjectResponse])
async def get_subjects():
    """Return all active subjects."""
    data = await syllabus_db.get_all_subjects()
    return data


@router.get(
    "/subjects/{subject_id}/chapters",
    response_model=list[ChapterResponse],
)
async def get_chapters(subject_id: UUID):
    """Return all active chapters for a subject."""
    data = await syllabus_db.get_chapters_by_subject(str(subject_id))
    if not data:
        raise HTTPException(status_code=404, detail="Subject not found or has no chapters")
    return data


@router.get(
    "/chapters/{chapter_id}/topics",
    response_model=list[TopicResponse],
)
async def get_topics(chapter_id: UUID):
    """Return all topics for a chapter."""
    data = await syllabus_db.get_topics_by_chapter(str(chapter_id))
    return data


@router.get("/chapters/{chapter_id}/questions")
async def get_questions(
    chapter_id: UUID,
    marks: int | None = None,
):
    """
    Return questions for a chapter.
    Optionally filter by marks (1, 2, 5, or 10).
    """
    data = await questions_db.get_questions_by_chapter(
        str(chapter_id),
        marks=marks,
    )
    return data
```

---

### FILE: backend/api/v1/learning.py

```python
# Learning routes
# POST /api/v1/learning/explain
# GET  /api/v1/learning/content/{chapter_id}

from fastapi import APIRouter, Depends
from uuid import UUID
from models import ExplainRequest, ExplainResponse
from core.auth import get_current_user
from core.rate_limit import check_rate_limit, increment_ai_call_count

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_topic(
    request: ExplainRequest,
    user: dict = Depends(get_current_user),
):
    """
    Generate an AI explanation for a chapter/topic.
    Retrieves relevant content from ChromaDB then calls Ollama.
    Phase 4 will implement the full AI logic.
    """
    await check_rate_limit(user["id"])

    # --- Phase 4 will replace this stub ---
    stub_response = ExplainResponse(
        chapter_id=request.chapter_id,
        topic_id=request.topic_id,
        language=request.language,
        explanation=(
            "This is a stub explanation. "
            "Full AI implementation coming in Phase 4."
        ),
        key_points=[
            "Key point 1 — coming in Phase 4",
            "Key point 2 — coming in Phase 4",
        ],
        exam_tip="Exam tip coming in Phase 4.",
        source_chunks=0,
        model_used="stub",
        cached=False,
    )
    # --------------------------------------

    await increment_ai_call_count(user["id"])
    return stub_response


@router.get("/content/{chapter_id}")
async def get_chapter_content(
    chapter_id: UUID,
    chunk_type: str | None = None,
):
    """
    Return stored content chunks for a chapter.
    Optionally filter by chunk_type (summary, theme, glossary etc).
    Public endpoint — no auth required.
    """
    from db.client import get_db
    db = get_db()

    query = (
        db.table("content_chunks")
        .select("*")
        .eq("chapter_id", str(chapter_id))
        .eq("is_validated", True)
    )
    if chunk_type:
        query = query.eq("chunk_type", chunk_type)

    result = query.order("chunk_type").execute()
    return result.data
```

---

### FILE: backend/api/v1/evaluation.py

```python
# Evaluation routes
# POST /api/v1/evaluation/submit
# POST /api/v1/evaluation/retry
# GET  /api/v1/evaluation/progress

from fastapi import APIRouter, Depends
from uuid import UUID, uuid4
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
    """
    Submit a student answer for AI evaluation.
    Saves response to DB, calls AI evaluator, returns scored feedback.
    Phase 5 will implement the full AI evaluation logic.
    """
    await check_rate_limit(user["id"])

    # Verify question exists
    question = await questions_db.get_question_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    # Save the answer first
    saved = await responses_db.save_response(
        user_id=user["id"],
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=question["marks"],
        attempt_number=request.attempt_number,
    )

    # --- Phase 5 will replace this stub ---
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
    # --------------------------------------

    await increment_ai_call_count(user["id"])
    return stub_response


@router.post("/retry", response_model=EvaluationResponse)
async def retry_answer(
    request: RetryRequest,
    user: dict = Depends(get_current_user),
):
    """
    Submit an improved answer for re-evaluation.
    Increments attempt_number automatically.
    Phase 5 will implement the full logic.
    """
    await check_rate_limit(user["id"])

    # Stub — Phase 5 implements this
    raise NotImplementedError("Retry endpoint coming in Phase 5.")


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(
    user: dict = Depends(get_current_user),
):
    """
    Return a student's overall progress and scores.
    """
    responses = await responses_db.get_responses_by_user(user["id"])

    total = len(responses)
    avg_score = 0.0
    if total > 0:
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
```

---

### FILE: backend/api/v1/users.py

```python
# User routes
# GET  /api/v1/users/me
# PUT  /api/v1/users/me
# GET  /api/v1/users/me/usage

from fastapi import APIRouter, Depends
from uuid import UUID
from models import UserProfileResponse, UpdateProfileRequest, UsageStatsResponse
from core.auth import get_current_user
from core.rate_limit import FREE_DAILY_LIMIT

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
async def get_profile(user: dict = Depends(get_current_user)):
    """Return the current student's profile."""
    from db.client import get_db
    db = get_db()
    result = (
        db.table("users")
        .select("*")
        .eq("id", user["id"])
        .single()
        .execute()
    )
    if not result.data:
        raise Exception("User profile not found")
    return result.data


@router.put("/me", response_model=UserProfileResponse)
async def update_profile(
    body: UpdateProfileRequest,
    user: dict = Depends(get_current_user),
):
    """Update the current student's profile."""
    from db.client import get_db
    db = get_db()
    update_data = body.model_dump(exclude_none=True)
    result = (
        db.table("users")
        .update(update_data)
        .eq("id", user["id"])
        .execute()
    )
    return result.data[0]


@router.get("/me/usage", response_model=UsageStatsResponse)
async def get_usage(user: dict = Depends(get_current_user)):
    """Return the current student's AI usage stats."""
    from db.client import get_db
    db = get_db()
    result = (
        db.table("users")
        .select("plan, daily_ai_calls")
        .eq("id", user["id"])
        .single()
        .execute()
    )
    data = result.data or {"plan": "free", "daily_ai_calls": 0}
    limit = FREE_DAILY_LIMIT if data["plan"] == "free" else 9999
    return UsageStatsResponse(
        daily_ai_calls=data["daily_ai_calls"],
        daily_limit=limit,
        calls_remaining=max(0, limit - data["daily_ai_calls"]),
        plan=data["plan"],
    )
```

---

### FILE: backend/main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from core.errors import register_error_handlers
from api.v1.router import router as api_router
from models.common import HealthResponse


app = FastAPI(
    title="AI Exam Coach API",
    version="0.1.0",
    description="Syllabus-aware AI for Tamil Nadu +1 and +2 students",
    docs_url="/api/docs" if settings.app_env == "development" else None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_error_handlers(app)
app.include_router(api_router)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    System health check.
    Verifies Ollama, Supabase, and ChromaDB connections.
    """
    ollama_status = "unknown"
    supabase_status = "unknown"
    chroma_status = "unknown"

    # Check Ollama
    try:
        import httpx
        async with httpx.AsyncClient() as client:
            r = await client.get(
                f"{settings.ollama_base_url}/api/tags",
                timeout=3.0,
            )
            ollama_status = "ok" if r.status_code == 200 else "error"
    except Exception:
        ollama_status = "unavailable"

    # Check Supabase
    try:
        from db.client import get_db
        db = get_db()
        db.table("subjects").select("id").limit(1).execute()
        supabase_status = "ok"
    except Exception:
        supabase_status = "unavailable"

    # Check ChromaDB
    try:
        from modules.content_pipeline import get_collection_stats
        stats = get_collection_stats()
        chroma_status = f"ok ({stats['total_chunks']} chunks)"
    except Exception:
        chroma_status = "unavailable"

    return HealthResponse(
        status="ok",
        env=settings.app_env,
        ollama=ollama_status,
        supabase=supabase_status,
        chromadb=chroma_status,
    )
```

---

### FILE: backend/tests/test_health.py

```python
# Health endpoint test
# Run: pytest backend/tests/test_health.py

import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_has_required_fields():
    response = client.get("/health")
    data = response.json()
    assert "status" in data
    assert "env" in data
    assert "ollama" in data
    assert "supabase" in data
    assert "chromadb" in data


def test_docs_available_in_dev():
    response = client.get("/api/docs")
    assert response.status_code == 200
```

---

### FILE: backend/tests/test_syllabus.py

```python
# Syllabus endpoint tests
# Run: pytest backend/tests/test_syllabus.py

import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app

client = TestClient(app)


def test_get_subjects_returns_list():
    response = client.get("/api/v1/syllabus/subjects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_subjects_has_eng1():
    response = client.get("/api/v1/syllabus/subjects")
    codes = [s["code"] for s in response.json()]
    assert "ENG1" in codes
```

---

## Step 3: Create the core and api folder markers

```bash
mkdir -p backend/core
mkdir -p backend/api/v1
touch backend/core/__init__.py
touch backend/api/__init__.py
touch backend/api/v1/__init__.py
```

---

## Step 4: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ← current
```

---

## Step 5: Commit to git

```bash
git add .
git commit -m "Phase 3: Backend API skeleton — routes, Pydantic models, auth, error handling"
```

---

## Step 6: Start the backend and verify all routes load

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Then open in browser: http://localhost:8000/api/docs

Verify these routes are listed in Swagger:

```
GET  /health
GET  /api/v1/syllabus/subjects
GET  /api/v1/syllabus/subjects/{subject_id}/chapters
GET  /api/v1/syllabus/chapters/{chapter_id}/topics
GET  /api/v1/syllabus/chapters/{chapter_id}/questions
POST /api/v1/learning/explain
GET  /api/v1/learning/content/{chapter_id}
POST /api/v1/evaluation/submit
POST /api/v1/evaluation/retry
GET  /api/v1/evaluation/progress
GET  /api/v1/users/me
PUT  /api/v1/users/me
GET  /api/v1/users/me/usage
```

---

## Step 7: Run the tests

```bash
cd backend
pytest tests/test_health.py -v
pytest tests/test_syllabus.py -v
```

Both should pass.

---

## Step 8: Print completion summary

```
✓ backend/models/syllabus.py        — Pydantic models for syllabus
✓ backend/models/learning.py        — Pydantic models for learning
✓ backend/models/evaluation.py      — Pydantic models for evaluation
✓ backend/models/user.py            — Pydantic models for users
✓ backend/models/common.py          — shared models
✓ backend/models/__init__.py        — model exports
✓ backend/core/errors.py            — custom exceptions + handlers
✓ backend/core/rate_limit.py        — free/paid rate limiting
✓ backend/core/auth.py              — Supabase JWT validation
✓ backend/api/v1/router.py          — main v1 router
✓ backend/api/v1/syllabus.py        — syllabus endpoints (public)
✓ backend/api/v1/learning.py        — learning endpoints (stub)
✓ backend/api/v1/evaluation.py      — evaluation endpoints (stub)
✓ backend/api/v1/users.py           — user profile endpoints
✓ backend/main.py                   — updated with all routers
✓ backend/tests/test_health.py      — health tests
✓ backend/tests/test_syllabus.py    — syllabus tests
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Run: uvicorn main:app --reload --port 8000
2. Open: http://localhost:8000/api/docs
3. Verify all 13 routes are listed
4. Run: pytest tests/ -v

Phase 3 complete.
Next: Phase 4 — Learning Module AI (Ollama integration, ChromaDB retrieval, explain endpoint)
```

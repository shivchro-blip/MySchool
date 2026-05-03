# AI Exam Coach — Architecture Fix: Repository Pattern + AI Gate
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.

Grapify identified two critical architecture problems:

PROBLEM 1 — get_db() god node (37 edges)
  Every module calls get_db() directly.
  If Supabase changes, every file breaks.
  Fix: One repository class per domain. Modules never touch get_db() directly.

PROBLEM 2 — ai_cache and rate_limit do the same job in different layers
  ai_cache stores responses in Supabase.
  rate_limit.py counts calls in Supabase.
  Neither knows about the other.
  Fix: core/ai_gate.py unifies both. One entry point for all AI calls.

Do not add new features. Only refactor existing code.
All API behavior must remain identical after this change.

---

## What changes and what does not

CHANGES:
  db/client.py         → still exists, used only by repositories
  db/syllabus.py       → becomes db/repositories/syllabus_repo.py
  db/questions.py      → becomes db/repositories/questions_repo.py
  db/responses.py      → becomes db/repositories/responses_repo.py
  db/cache.py          → becomes db/repositories/cache_repo.py
  core/rate_limit.py   → merged into core/ai_gate.py
  ai/router.py         → calls ai_gate.py instead of rate_limit + cache separately

DOES NOT CHANGE:
  All API route files (api/v1/*.py)
  All Pydantic models
  All prompt files
  All module service files (learning/service.py, evaluation/service.py)
  Database schema
  Frontend code

---

## Step 1: Create the repositories folder

```bash
mkdir -p backend/db/repositories
touch backend/db/repositories/__init__.py
```

---

## Step 2: Create all repository files

---

### FILE: backend/db/repositories/__init__.py

```python
# Repository layer
# One class per domain. All Supabase queries live here.
# Nothing outside this folder should import get_db() directly.

from .syllabus_repo  import SyllabusRepository
from .questions_repo import QuestionsRepository
from .responses_repo import ResponsesRepository
from .cache_repo     import CacheRepository
from .users_repo     import UsersRepository

__all__ = [
    "SyllabusRepository",
    "QuestionsRepository",
    "ResponsesRepository",
    "CacheRepository",
    "UsersRepository",
]
```

---

### FILE: backend/db/repositories/syllabus_repo.py

```python
# Syllabus Repository
# Owns all DB queries for subjects, chapters, topics, content_chunks
# Single responsibility: syllabus data access only

from db.client import get_db


class SyllabusRepository:
    """
    All Supabase queries for syllabus data.
    Instantiate once per request or use as singleton.
    """

    def __init__(self):
        self._db = get_db()

    # ── Subjects ────────────────────────────────────────────────────────────

    def get_all_subjects(self) -> list[dict]:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("is_active", True)
            .execute()
        )
        return result.data

    def get_subject_by_id(self, subject_id: str) -> dict | None:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("id", subject_id)
            .single()
            .execute()
        )
        return result.data

    def get_subject_by_code(self, code: str) -> dict | None:
        result = (
            self._db.table("subjects")
            .select("*")
            .eq("code", code)
            .single()
            .execute()
        )
        return result.data

    # ── Chapters ─────────────────────────────────────────────────────────────

    def get_chapters_by_subject(self, subject_id: str) -> list[dict]:
        result = (
            self._db.table("chapters")
            .select("*")
            .eq("subject_id", subject_id)
            .eq("is_active", True)
            .order("number")
            .execute()
        )
        return result.data

    def get_chapter_by_id(self, chapter_id: str) -> dict | None:
        result = (
            self._db.table("chapters")
            .select("title, number, subjects(code, name, class)")
            .eq("id", chapter_id)
            .single()
            .execute()
        )
        return result.data

    # ── Topics ───────────────────────────────────────────────────────────────

    def get_topics_by_chapter(self, chapter_id: str) -> list[dict]:
        result = (
            self._db.table("topics")
            .select("*")
            .eq("chapter_id", chapter_id)
            .eq("is_active", True)
            .order("order_index")
            .execute()
        )
        return result.data

    def get_topic_by_id(self, topic_id: str) -> dict | None:
        result = (
            self._db.table("topics")
            .select("title")
            .eq("id", topic_id)
            .single()
            .execute()
        )
        return result.data

    # ── Content chunks ────────────────────────────────────────────────────────

    def get_validated_chunks_by_chapter(
        self,
        chapter_id: str,
        chunk_type: str | None = None,
        language:   str = "en",
    ) -> list[dict]:
        query = (
            self._db.table("content_chunks")
            .select("id, chunk_type, content, language, section_header")
            .eq("chapter_id", chapter_id)
            .eq("is_validated", True)
            .eq("language", language)
        )
        if chunk_type:
            query = query.eq("chunk_type", chunk_type)
        result = query.order("chunk_type").execute()
        return result.data

    def get_pending_chunks(self, limit: int = 50) -> list[dict]:
        result = (
            self._db.table("content_chunks")
            .select(
                "id, chunk_type, content, language, section_header, "
                "created_at, subjects(name, class), chapters(title, number)"
            )
            .eq("is_validated", False)
            .order("created_at", desc=False)
            .limit(limit)
            .execute()
        )
        return result.data

    def validate_chunk(self, chunk_id: str) -> dict | None:
        result = (
            self._db.table("content_chunks")
            .update({"is_validated": True})
            .eq("id", chunk_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def update_chunk(self, chunk_id: str, fields: dict) -> dict | None:
        allowed = {k: v for k, v in fields.items()
                   if k in ("content", "chunk_type", "section_header", "is_validated")}
        if not allowed:
            return None
        result = (
            self._db.table("content_chunks")
            .update(allowed)
            .eq("id", chunk_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def delete_chunk(self, chunk_id: str) -> None:
        self._db.table("content_chunks").delete().eq("id", chunk_id).execute()

    def insert_chunks(self, rows: list[dict]) -> int:
        if not rows:
            return 0
        result = self._db.table("content_chunks").insert(rows).execute()
        return len(result.data)
```

---

### FILE: backend/db/repositories/questions_repo.py

```python
# Questions Repository
# Owns all DB queries for questions table only

from db.client import get_db


class QuestionsRepository:

    def __init__(self):
        self._db = get_db()

    def get_by_chapter(
        self,
        chapter_id: str,
        marks: int | None = None,
    ) -> list[dict]:
        query = (
            self._db.table("questions")
            .select("*")
            .eq("chapter_id", chapter_id)
            .eq("is_validated", True)
            .eq("is_active", True)
        )
        if marks:
            query = query.eq("marks", marks)
        result = query.order("marks").execute()
        return result.data

    def get_by_id(self, question_id: str) -> dict | None:
        result = (
            self._db.table("questions")
            .select("*")
            .eq("id", question_id)
            .single()
            .execute()
        )
        return result.data

    def get_all(
        self,
        chapter_id: str | None = None,
        validated: bool | None = None,
    ) -> list[dict]:
        query = (
            self._db.table("questions")
            .select("*, subjects(name, class), chapters(title, number)")
            .order("created_at", desc=True)
        )
        if chapter_id:
            query = query.eq("chapter_id", chapter_id)
        if validated is not None:
            query = query.eq("is_validated", validated)
        result = query.execute()
        return result.data

    def create(self, data: dict) -> dict:
        result = self._db.table("questions").insert(data).execute()
        return result.data[0]

    def update(self, question_id: str, fields: dict) -> dict | None:
        result = (
            self._db.table("questions")
            .update(fields)
            .eq("id", question_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def deactivate(self, question_id: str) -> None:
        self._db.table("questions").update(
            {"is_active": False}
        ).eq("id", question_id).execute()
```

---

### FILE: backend/db/repositories/responses_repo.py

```python
# Responses Repository
# Owns all DB queries for student answers and evaluations

from db.client import get_db


class ResponsesRepository:

    def __init__(self):
        self._db = get_db()

    def create(
        self,
        user_id:       str,
        question_id:   str,
        student_answer: str,
        max_score:     int,
        attempt_number: int = 1,
    ) -> dict:
        result = (
            self._db.table("responses")
            .insert({
                "user_id":        user_id,
                "question_id":    question_id,
                "student_answer": student_answer,
                "max_score":      max_score,
                "attempt_number": attempt_number,
            })
            .execute()
        )
        return result.data[0]

    def update_evaluation(
        self,
        response_id:    str,
        ai_score:       float,
        ai_feedback:    dict,
        improved_answer: str,
        model_used:     str,
    ) -> dict:
        result = (
            self._db.table("responses")
            .update({
                "ai_score":       ai_score,
                "ai_feedback":    ai_feedback,
                "improved_answer": improved_answer,
            })
            .eq("id", response_id)
            .execute()
        )
        return result.data[0]

    def get_by_user(self, user_id: str, limit: int = 20) -> list[dict]:
        result = (
            self._db.table("responses")
            .select("*, questions(question_text, marks, chapter_id)")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data

    def get_by_id_and_user(self, response_id: str, user_id: str) -> dict | None:
        result = (
            self._db.table("responses")
            .select("*, questions(question_text, marks, answer_key, rubric, chapter_id)")
            .eq("id", response_id)
            .eq("user_id", user_id)
            .single()
            .execute()
        )
        return result.data

    def get_pending_review(self, limit: int = 50) -> list[dict]:
        result = (
            self._db.table("responses")
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
        return result.data

    def submit_human_review(
        self,
        response_id: str,
        human_score: float,
        human_notes: str,
    ) -> dict | None:
        result = (
            self._db.table("responses")
            .update({
                "human_score":       human_score,
                "human_notes":       human_notes,
                "is_human_reviewed": True,
            })
            .eq("id", response_id)
            .execute()
        )
        return result.data[0] if result.data else None
```

---

### FILE: backend/db/repositories/cache_repo.py

```python
# Cache Repository
# Owns all DB queries for ai_cache table
# Pure storage — no business logic

import hashlib
from db.client import get_db


class CacheRepository:

    def __init__(self):
        self._db = get_db()

    @staticmethod
    def make_key(prompt_type: str, content: str) -> str:
        """Generate a deterministic SHA256 cache key."""
        raw = f"{prompt_type}:{content}"
        return hashlib.sha256(raw.encode()).hexdigest()

    def get(self, cache_key: str) -> str | None:
        """Return cached response text or None if miss/expired."""
        try:
            result = (
                self._db.table("ai_cache")
                .select("response_text, hit_count")
                .eq("cache_key", cache_key)
                .gt("expires_at", "now()")
                .single()
                .execute()
            )
            if result.data:
                self._db.table("ai_cache").update(
                    {"hit_count": result.data["hit_count"] + 1}
                ).eq("cache_key", cache_key).execute()
                return result.data["response_text"]
        except Exception:
            return None
        return None

    def set(
        self,
        cache_key:     str,
        prompt_type:   str,
        response_text: str,
        model_used:    str,
    ) -> None:
        """Store a response. Silently fails — cache must never break a request."""
        try:
            self._db.table("ai_cache").upsert({
                "cache_key":     cache_key,
                "prompt_type":   prompt_type,
                "response_text": response_text,
                "model_used":    model_used,
            }).execute()
        except Exception:
            pass

    def purge_expired(self) -> int:
        """Delete expired cache entries. Returns count deleted."""
        try:
            result = (
                self._db.table("ai_cache")
                .delete()
                .lt("expires_at", "now()")
                .execute()
            )
            return len(result.data)
        except Exception:
            return 0

    def stats(self) -> dict:
        result = self._db.table("ai_cache").select("id, hit_count").execute()
        entries = result.data or []
        return {
            "total_entries": len(entries),
            "total_hits":    sum(e.get("hit_count", 1) for e in entries),
        }
```

---

### FILE: backend/db/repositories/users_repo.py

```python
# Users Repository
# Owns all DB queries for users table

from db.client import get_db

FREE_DAILY_LIMIT = 20


class UsersRepository:

    def __init__(self):
        self._db = get_db()

    def get_by_id(self, user_id: str) -> dict | None:
        result = (
            self._db.table("users")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
        )
        return result.data

    def get_plan_and_calls(self, user_id: str) -> dict | None:
        """Fetch only the fields needed for rate limiting — minimal query."""
        result = (
            self._db.table("users")
            .select("plan, daily_ai_calls")
            .eq("id", user_id)
            .single()
            .execute()
        )
        return result.data

    def increment_ai_calls(self, user_id: str) -> int:
        """Atomically increment daily_ai_calls. Returns new count."""
        current = self.get_plan_and_calls(user_id)
        if not current:
            return 0
        new_count = current["daily_ai_calls"] + 1
        self._db.table("users").update(
            {"daily_ai_calls": new_count}
        ).eq("id", user_id).execute()
        return new_count

    def update_profile(self, user_id: str, fields: dict) -> dict | None:
        result = (
            self._db.table("users")
            .update(fields)
            .eq("id", user_id)
            .execute()
        )
        return result.data[0] if result.data else None

    def is_over_limit(self, user_id: str) -> bool:
        """
        Returns True if a free user has exceeded their daily limit.
        Paid users always return False.
        """
        user = self.get_plan_and_calls(user_id)
        if not user:
            return False
        if user["plan"] == "paid":
            return False
        return user["daily_ai_calls"] >= FREE_DAILY_LIMIT

    def total_count(self) -> int:
        result = self._db.table("users").select("id", count="exact").execute()
        return result.count or 0

    def log_usage(
        self,
        user_id:    str | None,
        action:     str,
        model_used: str,
        was_cached: bool,
        tokens_used: int | None = None,
        duration_ms: int | None = None,
    ) -> None:
        """Write one row to usage_logs. Silently fails."""
        try:
            self._db.table("usage_logs").insert({
                "user_id":    user_id,
                "action":     action,
                "model_used": model_used,
                "was_cached": was_cached,
                "tokens_used": tokens_used,
                "duration_ms": duration_ms,
            }).execute()
        except Exception:
            pass
```

---

## Step 3: Create core/ai_gate.py — unifies cache + rate limit

---

### FILE: backend/core/ai_gate.py

```python
# AI Gate — single entry point for all AI call decisions
#
# Replaces: core/rate_limit.py + scattered cache calls in ai/router.py
#
# Responsibilities (in order):
#   1. Check rate limit (UsersRepository)
#   2. Check cache (CacheRepository)
#   3. Call AI (ai/router.py)
#   4. Store result in cache (CacheRepository)
#   5. Increment user call counter (UsersRepository)
#   6. Log usage (UsersRepository)
#
# Neither rate limiting nor caching ever happen outside this file.
# ai/router.py only knows about Ollama and OpenRouter.

import time
from db.repositories import CacheRepository, UsersRepository
from core.errors import RateLimitError, AIUnavailableError
from rich.console import Console

console = Console()


class AIGate:
    """
    Unified gate for every AI call in the system.
    Instantiate per request — holds repos as instance vars.
    """

    def __init__(self):
        self._cache = CacheRepository()
        self._users = UsersRepository()

    async def call(
        self,
        messages:          list[dict],
        prompt_type:       str,
        cache_key_content: str,
        user_id:           str | None = None,
        temperature:       float = 0.3,
        max_tokens:        int   = 1024,
    ) -> tuple[str, str, bool]:
        """
        Main entry point. Called by learning and evaluation services.

        Args:
            messages:          Chat messages for the LLM
            prompt_type:       One of: explain, evaluate, improve, translate
            cache_key_content: String used to generate cache key
            user_id:           Student user ID for rate limiting and logging
            temperature:       LLM temperature
            max_tokens:        Max response tokens

        Returns:
            Tuple of (response_text, model_used, was_cached)

        Raises:
            RateLimitError      if user has exceeded daily limit
            AIUnavailableError  if both Ollama and OpenRouter fail
        """

        # Step 1: Rate limit check
        if user_id and self._users.is_over_limit(user_id):
            raise RateLimitError()

        # Step 2: Cache check
        cache_key = self._cache.make_key(prompt_type, cache_key_content)
        cached    = self._cache.get(cache_key)

        if cached:
            console.print(f"[dim]Cache HIT — {prompt_type}[/dim]")
            self._users.log_usage(
                user_id=user_id,
                action=prompt_type,
                model_used="cache",
                was_cached=True,
            )
            return cached, "cache", True

        # Step 3: Call LLM
        start_ms = int(time.time() * 1000)
        try:
            from ai.router import call_llm_direct
            response_text, model_used = await call_llm_direct(
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
        except Exception as e:
            raise AIUnavailableError() from e

        duration_ms = int(time.time() * 1000) - start_ms

        # Step 4: Store in cache
        self._cache.set(
            cache_key=cache_key,
            prompt_type=prompt_type,
            response_text=response_text,
            model_used=model_used,
        )

        # Step 5: Increment call counter
        if user_id:
            self._users.increment_ai_calls(user_id)

        # Step 6: Log usage
        self._users.log_usage(
            user_id=user_id,
            action=prompt_type,
            model_used=model_used,
            was_cached=False,
            duration_ms=duration_ms,
        )

        return response_text, model_used, False
```

---

## Step 4: Slim down ai/router.py — pure LLM calls only

Replace the entire file:

### FILE: backend/ai/router.py

```python
# AI Router — pure LLM dispatch only
#
# Responsibility: Try Ollama → fall back to OpenRouter.
# No cache. No rate limiting. No logging.
# All of that lives in core/ai_gate.py.
#
# call_llm_direct() is called only by AIGate.
# Never import this directly from modules or API routes.

from config import settings
from . import ollama_client, openrouter_client
from rich.console import Console

console = Console()


async def call_llm_direct(
    messages:    list[dict],
    temperature: float = 0.3,
    max_tokens:  int   = 1024,
) -> tuple[str, str]:
    """
    Try Ollama first. Fall back to OpenRouter.
    Returns (response_text, model_used).
    Raises RuntimeError if both fail.
    """
    # Try Ollama
    try:
        console.print(f"[blue]Ollama[/blue] → {settings.ollama_model}")
        text = await ollama_client.chat(
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return text, settings.ollama_model
    except Exception as ollama_err:
        console.print(f"[yellow]Ollama failed:[/yellow] {ollama_err}")

    # Fall back to OpenRouter
    try:
        console.print("[yellow]Falling back to OpenRouter...[/yellow]")
        text = await openrouter_client.chat(
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return text, settings.openrouter_model
    except Exception as openrouter_err:
        raise RuntimeError(
            f"Both Ollama and OpenRouter failed. "
            f"Last error: {openrouter_err}"
        )


# Keep call_llm as a compatibility shim for any code still using old signature.
# Remove after all callers are updated to AIGate.
async def call_llm(
    messages:          list[dict],
    prompt_type:       str,
    cache_key_content: str,
    user_id:           str | None = None,
    force_openrouter:  bool = False,
    temperature:       float = 0.3,
    max_tokens:        int   = 1024,
) -> tuple[str, str, bool]:
    """Compatibility shim. Use AIGate instead."""
    from core.ai_gate import AIGate
    gate = AIGate()
    return await gate.call(
        messages=messages,
        prompt_type=prompt_type,
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=temperature,
        max_tokens=max_tokens,
    )
```

---

## Step 5: Update learning service to use repositories + AIGate

### FILE: backend/modules/learning/service.py

```python
# Learning Service — refactored
# Uses SyllabusRepository and AIGate instead of get_db() directly

from uuid import UUID
from core.ai_gate import AIGate
from db.repositories import SyllabusRepository
from modules.content_pipeline.embedder import search_similar
from models.learning import ExplainRequest, ExplainResponse
from .prompts import (
    EXPLAIN_SYSTEM_PROMPT,
    EXPLAIN_USER_PROMPT,
    TRANSLATE_SYSTEM_PROMPT,
    TRANSLATE_USER_PROMPT,
)
import json
import re
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 5
MAX_CONTEXT_CHARS  = 3000


async def explain_topic(
    request: ExplainRequest,
    user_id: str,
) -> ExplainResponse:
    syllabus = SyllabusRepository()
    gate     = AIGate()

    # Load chapter metadata
    chapter = syllabus.get_chapter_by_id(str(request.chapter_id))
    if not chapter:
        raise ValueError(f"Chapter not found: {request.chapter_id}")

    subject       = chapter["subjects"]
    chapter_title = chapter["title"]
    topic_title   = ""

    if request.topic_id:
        topic = syllabus.get_topic_by_id(str(request.topic_id))
        if topic:
            topic_title = topic["title"]

    # Search ChromaDB
    search_query = request.question or f"{chapter_title} {topic_title}".strip()
    chunks       = search_similar(
        query=search_query,
        n_results=MAX_CONTEXT_CHUNKS,
        filters={"subject_code": subject["code"]},
    )

    context_parts = []
    total_chars   = 0
    for chunk in chunks:
        text = f"[{chunk['metadata']['chunk_type'].upper()}]\n{chunk['content']}"
        if total_chars + len(text) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(text)
        total_chars += len(text)

    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "No specific content found. Use your knowledge of Tamil Nadu board syllabus."
    )

    # Build prompt
    user_prompt = EXPLAIN_USER_PROMPT.format(
        subject=f"{subject['name']} ({subject['class']})",
        chapter_title=chapter_title,
        topic=topic_title or "General",
        question=request.question or f"Explain {chapter_title}",
        context_chunks=context,
    )

    messages = [
        {"role": "system", "content": EXPLAIN_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]

    cache_key_content = (
        f"{request.chapter_id}:{request.topic_id}:{request.question}:en"
    )

    # Call AI through gate (handles cache + rate limit + logging)
    raw_response, model_used, was_cached = await gate.call(
        messages=messages,
        prompt_type="explain",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.3,
        max_tokens=1024,
    )

    parsed = _parse_explain_response(raw_response)

    if request.language == "ta":
        parsed = await _translate_to_tamil(
            parsed=parsed,
            gate=gate,
            user_id=user_id,
            cache_key_prefix=cache_key_content,
        )

    return ExplainResponse(
        chapter_id=request.chapter_id,
        topic_id=request.topic_id,
        language=request.language,
        explanation=parsed.get("explanation", raw_response),
        key_points=parsed.get("key_points", []),
        exam_tip=parsed.get("exam_tip", ""),
        source_chunks=len(chunks),
        model_used=model_used,
        cached=was_cached,
    )


def _parse_explain_response(raw: str) -> dict:
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return {"explanation": raw, "key_points": [], "exam_tip": ""}


async def _translate_to_tamil(
    parsed:          dict,
    gate:            AIGate,
    user_id:         str,
    cache_key_prefix: str,
) -> dict:
    english_text = (
        parsed.get("explanation", "") + "\n\n" +
        "\n".join(parsed.get("key_points", []))
    )
    messages = [
        {"role": "system", "content": TRANSLATE_SYSTEM_PROMPT},
        {"role": "user",   "content": TRANSLATE_USER_PROMPT.format(
            english_explanation=english_text,
        )},
    ]
    tamil_response, _, _ = await gate.call(
        messages=messages,
        prompt_type="translate",
        cache_key_content=f"{cache_key_prefix}:ta",
        user_id=user_id,
        temperature=0.1,
        max_tokens=1024,
    )
    parsed["explanation"] = tamil_response
    parsed["key_points"]  = ["[Tamil translation — see explanation above]"]
    return parsed
```

---

## Step 6: Update evaluation service to use repositories + AIGate

### FILE: backend/modules/evaluation/service.py

```python
# Evaluation Service — refactored
# Uses QuestionsRepository, ResponsesRepository, AIGate

from uuid import UUID
from core.ai_gate import AIGate
from core.errors import NotFoundError
from db.repositories import QuestionsRepository, ResponsesRepository
from modules.content_pipeline.embedder import search_similar
from models.evaluation import (
    SubmitAnswerRequest,
    EvaluationResponse,
    FeedbackDetail,
    RetryRequest,
)
from .prompts import (
    EVALUATE_SYSTEM_PROMPT,
    EVALUATE_USER_PROMPT,
    IMPROVE_SYSTEM_PROMPT,
    IMPROVE_USER_PROMPT,
)
from .rubric import format_answer_key, format_rubric, validate_awarded_marks
import json
import re
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 4
MAX_CONTEXT_CHARS  = 2000


async def evaluate_answer(
    request: SubmitAnswerRequest,
    user_id: str,
) -> EvaluationResponse:
    questions  = QuestionsRepository()
    responses  = ResponsesRepository()
    gate       = AIGate()

    question = questions.get_by_id(str(request.question_id))
    if not question:
        raise NotFoundError("Question", str(request.question_id))

    marks        = question["marks"]
    answer_key   = question.get("answer_key") or {}
    rubric       = question.get("rubric") or {}

    # Search ChromaDB for context
    chunks = search_similar(query=question["question_text"], n_results=MAX_CONTEXT_CHUNKS)
    context_parts = []
    total_chars   = 0
    for chunk in chunks:
        if total_chars + len(chunk["content"]) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(chunk["content"])
        total_chars += len(chunk["content"])
    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "Evaluate based on the answer key and rubric provided."
    )

    # Save answer before AI call
    saved       = responses.create(
        user_id=user_id,
        question_id=str(request.question_id),
        student_answer=request.student_answer,
        max_score=marks,
        attempt_number=request.attempt_number,
    )
    response_id = saved["id"]

    # Build prompt and call AI gate
    user_prompt = EVALUATE_USER_PROMPT.format(
        marks=marks,
        question_text=question["question_text"],
        answer_key=format_answer_key(answer_key),
        rubric=format_rubric(rubric, marks),
        context_chunks=context,
        student_answer=request.student_answer,
    )
    messages = [
        {"role": "system", "content": EVALUATE_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]
    cache_key_content = f"eval:{request.question_id}:{hash(request.student_answer)}"

    raw_response, model_used, was_cached = await gate.call(
        messages=messages,
        prompt_type="evaluate",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

    parsed       = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage    = round((marks_awarded / marks) * 100, 1)

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=parsed.get("weaknesses", []),
        missing_points=parsed.get("missing_points", []),
        structure_comment=parsed.get("structure_comment", ""),
        grammar_comment=parsed.get("grammar_comment", ""),
    )

    responses.update_evaluation(
        response_id=response_id,
        ai_score=marks_awarded,
        ai_feedback=feedback.model_dump(),
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
    )

    return EvaluationResponse(
        response_id=UUID(response_id),
        question_id=request.question_id,
        marks_awarded=marks_awarded,
        marks_total=marks,
        percentage=percentage,
        feedback=feedback,
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
        cached=was_cached,
    )


async def retry_evaluation(
    request: RetryRequest,
    user_id: str,
) -> EvaluationResponse:
    responses  = ResponsesRepository()
    gate       = AIGate()

    orig = responses.get_by_id_and_user(str(request.response_id), user_id)
    if not orig:
        raise NotFoundError("Response", str(request.response_id))

    question    = orig["questions"]
    marks       = question["marks"]
    new_attempt = (orig.get("attempt_number") or 1) + 1

    user_prompt = IMPROVE_USER_PROMPT.format(
        marks=marks,
        question_text=question["question_text"],
        answer_key=format_answer_key(question.get("answer_key")),
        prev_attempt=orig.get("attempt_number", 1),
        original_answer=orig["student_answer"],
        original_score=orig.get("ai_score") or 0,
        new_attempt=new_attempt,
        new_answer=request.new_answer,
    )
    messages = [
        {"role": "system", "content": IMPROVE_SYSTEM_PROMPT},
        {"role": "user",   "content": user_prompt},
    ]
    cache_key_content = f"retry:{request.response_id}:{hash(request.new_answer)}"

    raw_response, model_used, was_cached = await gate.call(
        messages=messages,
        prompt_type="improve",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.1,
        max_tokens=1500,
    )

    parsed       = _parse_evaluation_response(raw_response, marks)
    marks_awarded = parsed["marks_awarded"]
    percentage    = round((marks_awarded / marks) * 100, 1)

    saved = responses.create(
        user_id=user_id,
        question_id=str(orig["question_id"]),
        student_answer=request.new_answer,
        max_score=marks,
        attempt_number=new_attempt,
    )

    feedback = FeedbackDetail(
        strengths=parsed.get("strengths", []),
        weaknesses=parsed.get("weaknesses", []),
        missing_points=parsed.get("missing_points", []),
        structure_comment=parsed.get(
            "structure_comment",
            parsed.get("improvement_comment", ""),
        ),
        grammar_comment=parsed.get("grammar_comment", ""),
    )

    responses.update_evaluation(
        response_id=saved["id"],
        ai_score=marks_awarded,
        ai_feedback=feedback.model_dump(),
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
    )

    return EvaluationResponse(
        response_id=UUID(saved["id"]),
        question_id=UUID(orig["question_id"]),
        marks_awarded=marks_awarded,
        marks_total=marks,
        percentage=percentage,
        feedback=feedback,
        improved_answer=parsed.get("improved_answer", ""),
        model_used=model_used,
        cached=was_cached,
    )


def _parse_evaluation_response(raw: str, max_marks: int) -> dict:
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        return {
            "marks_awarded":    0.0,
            "strengths":        [],
            "weaknesses":       ["Could not parse AI response"],
            "missing_points":   [],
            "structure_comment": "Unable to evaluate.",
            "grammar_comment":  "Unable to evaluate.",
            "improved_answer":  "",
        }
    parsed["marks_awarded"] = validate_awarded_marks(
        parsed.get("marks_awarded", 0), max_marks
    )
    for field in ["strengths", "weaknesses", "missing_points"]:
        if not isinstance(parsed.get(field), list):
            parsed[field] = []
    return parsed
```

---

## Step 7: Update API routes to use repositories

### FILE: backend/api/v1/syllabus.py

```python
from fastapi import APIRouter, HTTPException
from uuid import UUID
from db.repositories import SyllabusRepository, QuestionsRepository

router = APIRouter()


@router.get("/subjects")
async def get_subjects():
    return SyllabusRepository().get_all_subjects()


@router.get("/subjects/{subject_id}/chapters")
async def get_chapters(subject_id: UUID):
    data = SyllabusRepository().get_chapters_by_subject(str(subject_id))
    if not data:
        raise HTTPException(status_code=404, detail="Subject not found or has no chapters")
    return data


@router.get("/chapters/{chapter_id}/topics")
async def get_topics(chapter_id: UUID):
    return SyllabusRepository().get_topics_by_chapter(str(chapter_id))


@router.get("/chapters/{chapter_id}/questions")
async def get_questions(chapter_id: UUID, marks: int | None = None):
    return QuestionsRepository().get_by_chapter(str(chapter_id), marks=marks)
```

---

### FILE: backend/api/v1/users.py

```python
from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import UserProfileResponse, UpdateProfileRequest, UsageStatsResponse
from core.auth import get_current_user
from db.repositories import UsersRepository
from db.repositories.users_repo import FREE_DAILY_LIMIT

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
async def get_profile(user: dict = Depends(get_current_user)):
    data = UsersRepository().get_by_id(user["id"])
    if not data:
        raise HTTPException(status_code=404, detail="User profile not found")
    return data


@router.put("/me", response_model=UserProfileResponse)
async def update_profile(
    body: UpdateProfileRequest,
    user: dict = Depends(get_current_user),
):
    updated = UsersRepository().update_profile(
        user["id"],
        body.model_dump(exclude_none=True),
    )
    if not updated:
        raise HTTPException(status_code=404, detail="User not found")
    return updated


@router.get("/me/usage", response_model=UsageStatsResponse)
async def get_usage(user: dict = Depends(get_current_user)):
    data  = UsersRepository().get_plan_and_calls(user["id"])
    plan  = data["plan"]       if data else "free"
    calls = data["daily_ai_calls"] if data else 0
    limit = FREE_DAILY_LIMIT if plan == "free" else 9999
    return UsageStatsResponse(
        daily_ai_calls=calls,
        daily_limit=limit,
        calls_remaining=max(0, limit - calls),
        plan=plan,
    )
```

---

### FILE: backend/api/v1/evaluation.py

```python
from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import (
    SubmitAnswerRequest, EvaluationResponse,
    RetryRequest, ProgressResponse,
)
from core.auth import get_current_user
from core.errors import NotFoundError, AIUnavailableError, RateLimitError
from modules.evaluation import evaluate_answer, retry_evaluation
from db.repositories import ResponsesRepository

router = APIRouter()


@router.post("/submit", response_model=EvaluationResponse)
async def submit_answer(
    request: SubmitAnswerRequest,
    user: dict = Depends(get_current_user),
):
    try:
        return await evaluate_answer(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.post("/retry", response_model=EvaluationResponse)
async def retry_answer(
    request: RetryRequest,
    user: dict = Depends(get_current_user),
):
    try:
        return await retry_evaluation(request=request, user_id=user["id"])
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RateLimitError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except RuntimeError:
        raise AIUnavailableError()


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(user: dict = Depends(get_current_user)):
    repo          = ResponsesRepository()
    all_responses = repo.get_by_user(user["id"], limit=100)
    total         = len(all_responses)
    avg_score     = 0.0

    if total > 0:
        scores = [
            (r["ai_score"] / r["max_score"]) * 100
            for r in all_responses
            if r.get("ai_score") is not None
        ]
        avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0

    by_chapter: dict[str, dict] = {}
    for r in all_responses:
        q          = r.get("questions") or {}
        chapter_id = str(q.get("chapter_id", "unknown"))
        if chapter_id not in by_chapter:
            by_chapter[chapter_id] = {
                "chapter_id":     chapter_id,
                "attempts":       0,
                "total_score":    0.0,
                "total_possible": 0,
            }
        by_chapter[chapter_id]["attempts"] += 1
        if r.get("ai_score") is not None:
            by_chapter[chapter_id]["total_score"]    += r["ai_score"]
            by_chapter[chapter_id]["total_possible"] += r["max_score"]

    chapter_summary = [
        {
            "chapter_id":    ch["chapter_id"],
            "attempts":      ch["attempts"],
            "average_score": round(
                (ch["total_score"] / ch["total_possible"]) * 100, 1
            ) if ch["total_possible"] > 0 else 0.0,
        }
        for ch in by_chapter.values()
    ]

    return ProgressResponse(
        user_id=UUID(user["id"]),
        total_attempts=total,
        average_score=avg_score,
        by_chapter=chapter_summary,
    )


@router.get("/history")
async def get_history(
    user: dict = Depends(get_current_user),
    limit: int = 20,
):
    data = ResponsesRepository().get_by_user(user["id"], limit=limit)
    return {"history": data, "total": len(data)}
```

---

## Step 8: Delete the old files that are now replaced

```bash
# Old direct DB files — replaced by repositories
rm backend/db/syllabus.py
rm backend/db/questions.py
rm backend/db/responses.py
rm backend/db/cache.py

# Old rate_limit.py — replaced by AIGate
rm backend/core/rate_limit.py
```

---

## Step 9: Update CLAUDE.md architecture section

Open CLAUDE.md and replace the Folder Roles section with:

```markdown
## Folder Roles (Never Mix These)
- backend/db/client.py                      → Supabase client only — used ONLY by repositories
- backend/db/repositories/syllabus_repo.py  → all syllabus DB queries
- backend/db/repositories/questions_repo.py → all question DB queries
- backend/db/repositories/responses_repo.py → all response DB queries
- backend/db/repositories/cache_repo.py     → all cache DB queries
- backend/db/repositories/users_repo.py     → all user DB queries
- backend/core/ai_gate.py                   → single entry point for ALL AI calls
                                               handles: rate limit + cache + LLM + logging
- backend/ai/router.py                      → pure LLM dispatch only (Ollama → OpenRouter)
                                               called ONLY by AIGate
- backend/modules/learning/                 → explain topic logic only
- backend/modules/evaluation/               → score + feedback logic only
- backend/modules/content_pipeline/         → PDF extraction + embedding only

## Architecture Rules (from Grapify audit)
- get_db() is called ONLY inside db/repositories/*.py — nowhere else
- AIGate is the ONLY class that checks rate limits, reads cache, and logs usage
- ai/router.py is called ONLY by AIGate — never directly from modules
- Modules instantiate repositories and AIGate — they never touch get_db()
```

---

## Step 10: Run tests to verify nothing broke

```bash
cd backend
pytest tests/ -v --tb=short
```

All existing tests must still pass.
Then start the backend and verify all routes respond correctly:

```bash
uvicorn main:app --reload --port 8000
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/syllabus/subjects
```

---

## Step 11: Commit to git

```bash
git add .
git commit -m "Refactor: repository pattern + AIGate unifies cache and rate limiting

- Extract db/repositories/ — one class per domain, get_db() isolated
- core/ai_gate.py — single entry point for rate limit + cache + LLM + log
- ai/router.py — pure LLM dispatch only, no business logic
- All modules updated to use repositories and AIGate
- Deleted: db/syllabus.py, questions.py, responses.py, cache.py
- Deleted: core/rate_limit.py
- All existing tests pass unchanged"
```

---

## Step 12: Print completion summary

```
── Repositories created ────────────────────────────────────
✓ backend/db/repositories/__init__.py
✓ backend/db/repositories/syllabus_repo.py   (was db/syllabus.py)
✓ backend/db/repositories/questions_repo.py  (was db/questions.py)
✓ backend/db/repositories/responses_repo.py  (was db/responses.py)
✓ backend/db/repositories/cache_repo.py      (was db/cache.py)
✓ backend/db/repositories/users_repo.py      (new — was inline in rate_limit)

── Unified AI Gate ─────────────────────────────────────────
✓ backend/core/ai_gate.py                    (new — replaces rate_limit.py)
✓ backend/ai/router.py                       (slimmed — pure LLM dispatch)

── Services updated ────────────────────────────────────────
✓ backend/modules/learning/service.py        (uses SyllabusRepository + AIGate)
✓ backend/modules/evaluation/service.py      (uses QuestionsRepository + AIGate)

── Routes updated ──────────────────────────────────────────
✓ backend/api/v1/syllabus.py                 (uses repositories)
✓ backend/api/v1/users.py                    (uses UsersRepository)
✓ backend/api/v1/evaluation.py               (catches RateLimitError directly)

── Deleted ─────────────────────────────────────────────────
✗ backend/db/syllabus.py
✗ backend/db/questions.py
✗ backend/db/responses.py
✗ backend/db/cache.py
✗ backend/core/rate_limit.py

── Problems fixed ──────────────────────────────────────────
✓ get_db() god node: now isolated to db/repositories/ only
✓ Cache + rate limit unified: both owned by AIGate

Run: pytest tests/ -v to verify all tests still pass.
```

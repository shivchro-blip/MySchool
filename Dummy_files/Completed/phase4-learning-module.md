# AI Exam Coach — Phase 4: Learning Module (AI)
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase wires Ollama into the learning module.
The /api/v1/learning/explain endpoint goes from stub to fully working.

Flow for every explain request:
  1. Receive student request (chapter + topic + question)
  2. Search ChromaDB for relevant content chunks
  3. Build a structured prompt with retrieved context
  4. Call Ollama (or OpenRouter fallback)
  5. Check cache first — skip AI call if hit
  6. Parse and return structured response
  7. Log usage to Supabase

Do not touch the evaluation module yet — that is Phase 5.

---

## Step 1: Verify Ollama is running

```bash
ollama list
```

You should see mistral:7b-instruct in the list.
If not, run: ollama pull mistral:7b-instruct

---

## Step 2: Create all files with exactly the content shown

---

### FILE: backend/ai/ollama_client.py

```python
# Ollama Client
# Handles all communication with local Ollama server
# Never call this directly from modules — use router.py

import httpx
from config import settings
from rich.console import Console

console = Console()

OLLAMA_GENERATE_URL = f"{settings.ollama_base_url}/api/generate"
OLLAMA_CHAT_URL = f"{settings.ollama_base_url}/api/chat"
OLLAMA_TAGS_URL = f"{settings.ollama_base_url}/api/tags"

DEFAULT_TIMEOUT = 120.0


async def is_ollama_available() -> bool:
    """Check if Ollama server is reachable."""
    try:
        async with httpx.AsyncClient() as client:
            r = await client.get(OLLAMA_TAGS_URL, timeout=3.0)
            return r.status_code == 200
    except Exception:
        return False


async def chat(
    messages: list[dict],
    model: str | None = None,
    temperature: float = 0.3,
    max_tokens: int = 1024,
) -> str:
    """
    Send a chat request to Ollama.
    messages format: [{"role": "system"|"user"|"assistant", "content": "..."}]
    Returns the assistant reply as a plain string.
    """
    model = model or settings.ollama_model

    payload = {
        "model": model,
        "messages": messages,
        "stream": False,
        "options": {
            "temperature": temperature,
            "num_predict": max_tokens,
            "top_p": 0.9,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
            response = await client.post(OLLAMA_CHAT_URL, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["message"]["content"].strip()
    except httpx.TimeoutException:
        raise RuntimeError(
            f"Ollama request timed out after {DEFAULT_TIMEOUT}s. "
            "Is the model loaded? Try: ollama run mistral:7b-instruct"
        )
    except httpx.HTTPStatusError as e:
        raise RuntimeError(f"Ollama HTTP error: {e.response.status_code}")
    except Exception as e:
        raise RuntimeError(f"Ollama error: {str(e)}")


async def get_loaded_models() -> list[str]:
    """Return list of available model names."""
    try:
        async with httpx.AsyncClient() as client:
            r = await client.get(OLLAMA_TAGS_URL, timeout=5.0)
            data = r.json()
            return [m["name"] for m in data.get("models", [])]
    except Exception:
        return []
```

---

### FILE: backend/ai/openrouter_client.py

```python
# OpenRouter Client
# Fallback AI when Ollama is unavailable
# Only used for paid users or when Ollama fails
# Never call this directly from modules — use router.py

import httpx
from config import settings

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_TIMEOUT = 60.0


async def chat(
    messages: list[dict],
    model: str | None = None,
    temperature: float = 0.3,
    max_tokens: int = 1024,
) -> str:
    """
    Send a chat request to OpenRouter.
    Same interface as ollama_client.chat for easy swapping.
    Returns the assistant reply as a plain string.
    """
    if not settings.openrouter_api_key:
        raise RuntimeError(
            "OPENROUTER_API_KEY not set in .env. "
            "Add it to use OpenRouter as fallback."
        )

    model = model or settings.openrouter_model

    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://examcoach.local",
        "X-Title": "AI Exam Coach",
    }

    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    try:
        async with httpx.AsyncClient(timeout=DEFAULT_TIMEOUT) as client:
            response = await client.post(
                OPENROUTER_URL,
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
    except httpx.TimeoutException:
        raise RuntimeError("OpenRouter request timed out.")
    except httpx.HTTPStatusError as e:
        raise RuntimeError(
            f"OpenRouter HTTP error: {e.response.status_code} — "
            f"{e.response.text[:200]}"
        )
    except Exception as e:
        raise RuntimeError(f"OpenRouter error: {str(e)}")
```

---

### FILE: backend/ai/router.py

```python
# AI Router — fully implemented
# Rule 1: Always try Ollama first
# Rule 2: Fall back to OpenRouter if Ollama fails or user is on paid plan
# Rule 3: Check cache before any AI call
# Rule 4: Log every call to usage_logs

from config import settings
from db.cache import get_cached_response, save_cached_response, make_cache_key
from db.client import get_db
from . import ollama_client, openrouter_client
from rich.console import Console

console = Console()


async def call_llm(
    messages: list[dict],
    prompt_type: str,
    cache_key_content: str,
    user_id: str | None = None,
    force_openrouter: bool = False,
    temperature: float = 0.3,
    max_tokens: int = 1024,
) -> tuple[str, str, bool]:
    """
    Main entry point for all LLM calls.

    Args:
        messages:           Chat messages list (system + user)
        prompt_type:        One of: explain, evaluate, improve, translate
        cache_key_content:  String used to generate cache key
        user_id:            For usage logging (optional)
        force_openrouter:   Skip Ollama and go straight to OpenRouter
        temperature:        LLM temperature (lower = more deterministic)
        max_tokens:         Max tokens in response

    Returns:
        Tuple of (response_text, model_used, was_cached)
    """

    # Step 1: Check cache
    cache_key = make_cache_key(prompt_type, cache_key_content)
    cached = await get_cached_response(cache_key)
    if cached:
        console.print(f"[dim]Cache hit for {prompt_type}[/dim]")
        await _log_usage(
            user_id=user_id,
            action=prompt_type,
            model_used="cache",
            was_cached=True,
        )
        return cached, "cache", True

    # Step 2: Try Ollama (unless forced to OpenRouter)
    model_used = settings.ollama_model
    response_text = None

    if not force_openrouter:
        try:
            console.print(f"[blue]Ollama[/blue] calling {settings.ollama_model}...")
            response_text = await ollama_client.chat(
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            model_used = settings.ollama_model
            console.print("[green]Ollama[/green] response received")
        except Exception as e:
            console.print(f"[yellow]Ollama failed:[/yellow] {e}")
            console.print("[yellow]Falling back to OpenRouter...[/yellow]")
            response_text = None

    # Step 3: Fall back to OpenRouter
    if response_text is None:
        try:
            response_text = await openrouter_client.chat(
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            model_used = settings.openrouter_model
            console.print("[blue]OpenRouter[/blue] response received")
        except Exception as e:
            raise RuntimeError(
                f"Both Ollama and OpenRouter failed. Last error: {e}"
            )

    # Step 4: Save to cache
    await save_cached_response(
        cache_key=cache_key,
        prompt_type=prompt_type,
        response_text=response_text,
        model_used=model_used,
    )

    # Step 5: Log usage
    await _log_usage(
        user_id=user_id,
        action=prompt_type,
        model_used=model_used,
        was_cached=False,
    )

    return response_text, model_used, False


async def _log_usage(
    user_id: str | None,
    action: str,
    model_used: str,
    was_cached: bool,
) -> None:
    """Log AI call to usage_logs table."""
    try:
        db = get_db()
        db.table("usage_logs").insert({
            "user_id": user_id,
            "action": action,
            "model_used": model_used,
            "was_cached": was_cached,
        }).execute()
    except Exception:
        pass  # Never let logging fail a user request
```

---

### FILE: backend/ai/__init__.py

```python
# AI layer
# All LLM calls go through router.py
# Never import ollama_client or openrouter_client directly from modules

from .router import call_llm

__all__ = ["call_llm"]
```

---

### FILE: backend/modules/learning/prompts.py

```python
# Learning module prompts
# All prompt templates for the learning module live here
# Keep prompts versioned and named clearly

EXPLAIN_SYSTEM_PROMPT = """You are an expert Tamil Nadu State Board teacher for +1 and +2 students.
Your job is to explain lessons clearly so students can score well in board exams.

Rules:
- Use simple English that a 16-year-old student can understand
- Always include exam-relevant points
- Structure your response exactly as JSON
- Be concise but complete
- Base your explanation ONLY on the provided content chunks
- Do not invent facts not present in the content"""


EXPLAIN_USER_PROMPT = """Subject: {subject}
Chapter: {chapter_title}
Topic: {topic}
Student Question: {question}

Content from textbook:
{context_chunks}

Respond with ONLY this JSON structure, no other text:
{{
  "explanation": "Clear 3-5 sentence explanation of the topic",
  "key_points": [
    "Point 1 — exam-ready, one sentence",
    "Point 2 — exam-ready, one sentence",
    "Point 3 — exam-ready, one sentence"
  ],
  "exam_tip": "One specific tip for how this topic is tested in board exams"
}}"""


TRANSLATE_SYSTEM_PROMPT = """You are a Tamil language expert who helps students understand
English lessons in Tamil. Translate the explanation clearly into Tamil.
Keep technical terms in English but explain everything else in Tamil."""


TRANSLATE_USER_PROMPT = """Translate this explanation into Tamil for a Tamil Nadu student:

{english_explanation}

Respond with ONLY the Tamil translation, no English."""
```

---

### FILE: backend/modules/learning/service.py

```python
# Learning Service
# Core business logic for the learning module
# Retrieves content from ChromaDB and calls AI router

import json
import re
from uuid import UUID

from ai.router import call_llm
from modules.content_pipeline.embedder import search_similar
from db.client import get_db
from models.learning import ExplainRequest, ExplainResponse
from .prompts import (
    EXPLAIN_SYSTEM_PROMPT,
    EXPLAIN_USER_PROMPT,
    TRANSLATE_SYSTEM_PROMPT,
    TRANSLATE_USER_PROMPT,
)
from rich.console import Console

console = Console()

MAX_CONTEXT_CHUNKS = 5
MAX_CONTEXT_CHARS = 3000


async def explain_topic(
    request: ExplainRequest,
    user_id: str,
) -> ExplainResponse:
    """
    Full explain flow:
    1. Look up chapter metadata from Supabase
    2. Search ChromaDB for relevant chunks
    3. Build prompt with context
    4. Call AI router (cache → Ollama → OpenRouter)
    5. Parse JSON response
    6. Optionally translate to Tamil
    7. Return ExplainResponse
    """

    # Step 1: Get chapter metadata
    db = get_db()
    chapter_result = (
        db.table("chapters")
        .select("title, number, subjects(code, name, class)")
        .eq("id", str(request.chapter_id))
        .single()
        .execute()
    )

    if not chapter_result.data:
        raise ValueError(f"Chapter not found: {request.chapter_id}")

    chapter = chapter_result.data
    subject = chapter["subjects"]
    chapter_title = chapter["title"]
    topic_title = ""

    if request.topic_id:
        topic_result = (
            db.table("topics")
            .select("title")
            .eq("id", str(request.topic_id))
            .single()
            .execute()
        )
        if topic_result.data:
            topic_title = topic_result.data["title"]

    # Step 2: Build search query
    search_query = request.question or f"{chapter_title} {topic_title}".strip()
    console.print(f"[blue]Searching[/blue] ChromaDB: {search_query[:60]}...")

    chunks = search_similar(
        query=search_query,
        n_results=MAX_CONTEXT_CHUNKS,
        filters={"subject_code": subject["code"]},
    )

    # Step 3: Build context string
    context_parts = []
    total_chars = 0
    for chunk in chunks:
        chunk_text = (
            f"[{chunk['metadata']['chunk_type'].upper()}]\n{chunk['content']}"
        )
        if total_chars + len(chunk_text) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(chunk_text)
        total_chars += len(chunk_text)

    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "No specific content found. Use your knowledge of Tamil Nadu board syllabus."
    )

    console.print(f"[dim]Context: {len(chunks)} chunks, {total_chars} chars[/dim]")

    # Step 4: Build messages
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

    # Step 5: Cache key (deterministic per chapter+topic+question)
    cache_key_content = (
        f"{request.chapter_id}:{request.topic_id}:{request.question}:en"
    )

    # Step 6: Call AI
    raw_response, model_used, was_cached = await call_llm(
        messages=messages,
        prompt_type="explain",
        cache_key_content=cache_key_content,
        user_id=user_id,
        temperature=0.3,
        max_tokens=1024,
    )

    # Step 7: Parse JSON response
    parsed = _parse_explain_response(raw_response)

    # Step 8: Translate to Tamil if requested
    if request.language == "ta":
        parsed = await _translate_to_tamil(
            parsed=parsed,
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
    """
    Parse JSON from AI response.
    Handles cases where the model wraps JSON in markdown code blocks.
    Returns a dict with explanation, key_points, exam_tip.
    """
    # Strip markdown code fences if present
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip()
    cleaned = cleaned.rstrip("```").strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        console.print("[yellow]JSON parse failed — using raw response[/yellow]")
        return {
            "explanation": raw,
            "key_points": [],
            "exam_tip": "",
        }


async def _translate_to_tamil(
    parsed: dict,
    user_id: str,
    cache_key_prefix: str,
) -> dict:
    """
    Translate the explanation and key points to Tamil.
    Returns updated parsed dict with Tamil content.
    """
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

    tamil_response, _, _ = await call_llm(
        messages=messages,
        prompt_type="translate",
        cache_key_content=f"{cache_key_prefix}:ta",
        user_id=user_id,
        temperature=0.1,
        max_tokens=1024,
    )

    parsed["explanation"] = tamil_response
    parsed["key_points"] = [
        f"[Tamil translation — see explanation above]"
    ]
    return parsed
```

---

### FILE: backend/modules/learning/__init__.py

```python
# Learning Module
# Responsibilities: syllabus navigation, concept explanation
# Do NOT put LLM calls here — all go through ai/router.py

from .service import explain_topic

__all__ = ["explain_topic"]
```

---

### FILE: backend/api/v1/learning.py

```python
# Learning routes — fully implemented
# POST /api/v1/learning/explain
# GET  /api/v1/learning/content/{chapter_id}

from fastapi import APIRouter, Depends, HTTPException
from uuid import UUID
from models import ExplainRequest, ExplainResponse
from core.auth import get_current_user
from core.rate_limit import check_rate_limit
from core.errors import AIUnavailableError
from modules.learning import explain_topic

router = APIRouter()


@router.post("/explain", response_model=ExplainResponse)
async def explain_topic_endpoint(
    request: ExplainRequest,
    user: dict = Depends(get_current_user),
):
    """
    Generate an AI explanation for a chapter or topic.

    - Retrieves relevant content from ChromaDB
    - Calls Ollama (or OpenRouter fallback)
    - Returns structured explanation with key points and exam tip
    - Supports English and Tamil responses
    - Results are cached for 7 days
    """
    await check_rate_limit(user["id"])

    try:
        response = await explain_topic(
            request=request,
            user_id=user["id"],
        )
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError as e:
        raise AIUnavailableError()


@router.get("/content/{chapter_id}")
async def get_chapter_content(
    chapter_id: UUID,
    chunk_type: str | None = None,
    language: str = "en",
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
        .select("id, chunk_type, content, language, section_header")
        .eq("chapter_id", str(chapter_id))
        .eq("is_validated", True)
        .eq("language", language)
    )
    if chunk_type:
        query = query.eq("chunk_type", chunk_type)

    result = query.order("chunk_type").execute()
    return {"chapter_id": str(chapter_id), "chunks": result.data}
```

---

### FILE: backend/tests/test_learning.py

```python
# Learning module tests
# Run: pytest backend/tests/test_learning.py -v
# Note: these tests use mocks so Ollama does not need to be running

import pytest
from unittest.mock import AsyncMock, patch
from modules.learning.service import _parse_explain_response


def test_parse_clean_json():
    raw = '''{"explanation": "Test explanation.", "key_points": ["Point 1"], "exam_tip": "Study this."}'''
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Test explanation."
    assert len(result["key_points"]) == 1
    assert result["exam_tip"] == "Study this."


def test_parse_json_with_markdown_fences():
    raw = """```json
{"explanation": "Test.", "key_points": ["P1", "P2"], "exam_tip": "Tip."}
```"""
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Test."
    assert len(result["key_points"]) == 2


def test_parse_invalid_json_returns_raw():
    raw = "This is not JSON at all."
    result = _parse_explain_response(raw)
    assert result["explanation"] == raw
    assert result["key_points"] == []
    assert result["exam_tip"] == ""


def test_parse_json_without_fences():
    raw = '{"explanation": "Direct JSON.", "key_points": [], "exam_tip": ""}'
    result = _parse_explain_response(raw)
    assert result["explanation"] == "Direct JSON."
```

---

### FILE: scripts/test_ollama.py

```python
# Quick Ollama connection test
# Run: python scripts/test_ollama.py
# Use this to verify Ollama is working before running the full backend

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from ai.ollama_client import is_ollama_available, chat, get_loaded_models
from rich.console import Console

console = Console()


async def main():
    console.rule("[bold]Ollama Connection Test[/bold]")

    # Check availability
    console.print("\n[blue]Step 1:[/blue] Checking Ollama server...")
    available = await is_ollama_available()
    if not available:
        console.print("[red]FAIL[/red] Ollama is not running.")
        console.print("Start it with: ollama serve")
        sys.exit(1)
    console.print("[green]OK[/green] Ollama server is reachable")

    # Check models
    console.print("\n[blue]Step 2:[/blue] Checking loaded models...")
    models = await get_loaded_models()
    console.print(f"  Available models: {models}")
    if not any("mistral" in m for m in models):
        console.print("[yellow]WARN[/yellow] mistral:7b-instruct not found")
        console.print("Pull it with: ollama pull mistral:7b-instruct")
    else:
        console.print("[green]OK[/green] mistral:7b-instruct is available")

    # Test a simple chat
    console.print("\n[blue]Step 3:[/blue] Testing chat response...")
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant. Reply in exactly 10 words.",
        },
        {
            "role": "user",
            "content": "What is the capital of France?",
        },
    ]

    try:
        response = await chat(messages=messages, max_tokens=50)
        console.print(f"  Response: [italic]{response}[/italic]")
        console.print("[green]OK[/green] Chat is working")
    except Exception as e:
        console.print(f"[red]FAIL[/red] Chat error: {e}")
        sys.exit(1)

    # Test JSON response
    console.print("\n[blue]Step 4:[/blue] Testing JSON response format...")
    json_messages = [
        {
            "role": "system",
            "content": "Always respond with valid JSON only. No other text.",
        },
        {
            "role": "user",
            "content": 'Return this JSON: {"status": "ok", "test": true}',
        },
    ]

    try:
        import json
        response = await chat(messages=json_messages, max_tokens=50)
        parsed = json.loads(response.strip())
        console.print(f"  Parsed JSON: {parsed}")
        console.print("[green]OK[/green] JSON responses working")
    except Exception as e:
        console.print(f"[yellow]WARN[/yellow] JSON parsing issue: {e}")
        console.print("  This may cause issues with the explain endpoint.")

    console.rule("[bold green]Ollama Test Complete[/bold green]")
    console.print("\nOllama is ready. Start the backend with:")
    console.print("  cd backend && uvicorn main:app --reload --port 8000")


if __name__ == "__main__":
    asyncio.run(main())
```

---

## Step 3: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ← current
```

---

## Step 4: Commit to git

```bash
git add .
git commit -m "Phase 4: Learning module — Ollama client, AI router, explain endpoint"
```

---

## Step 5: Run tests in this order

```bash
# 1. Verify Ollama is working
python scripts/test_ollama.py

# 2. Run unit tests (no Ollama needed)
cd backend
pytest tests/test_learning.py -v

# 3. Start the backend
uvicorn main:app --reload --port 8000
```

---

## Step 6: Test the explain endpoint manually

Open http://localhost:8000/api/docs

Find POST /api/v1/learning/explain and test with this body.
Replace chapter_id with a real UUID from your Supabase chapters table:

```json
{
  "chapter_id": "<paste-chapter-uuid-from-supabase>",
  "question": "What is the theme of The Last Lesson?",
  "language": "en"
}
```

Expected response shape:
```json
{
  "chapter_id": "...",
  "topic_id": null,
  "language": "en",
  "explanation": "The Last Lesson explores...",
  "key_points": [
    "The story is set in Alsace...",
    "M. Hamel represents...",
    "Franz learns the value..."
  ],
  "exam_tip": "Questions often ask about the theme of patriotism...",
  "source_chunks": 4,
  "model_used": "mistral:7b-instruct",
  "cached": false
}
```

Test Tamil translation:
```json
{
  "chapter_id": "<paste-chapter-uuid-from-supabase>",
  "question": "What is the theme of The Last Lesson?",
  "language": "ta"
}
```

---

## Step 7: Print completion summary

```
✓ backend/ai/ollama_client.py         — Ollama chat + health check
✓ backend/ai/openrouter_client.py     — OpenRouter fallback
✓ backend/ai/router.py                — cache → Ollama → OpenRouter flow
✓ backend/ai/__init__.py              — exports call_llm
✓ backend/modules/learning/prompts.py — explain + translate prompts
✓ backend/modules/learning/service.py — full explain business logic
✓ backend/modules/learning/__init__.py — module exports
✓ backend/api/v1/learning.py          — endpoint updated (no longer stub)
✓ backend/tests/test_learning.py      — JSON parse unit tests
✓ scripts/test_ollama.py              — Ollama connectivity test
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Run: python scripts/test_ollama.py
2. Run: pytest tests/test_learning.py -v
3. Run: uvicorn main:app --reload --port 8000
4. Test POST /api/v1/learning/explain via Swagger UI
5. Verify response has explanation, key_points, and exam_tip

Phase 4 complete.
Next: Phase 5 — Evaluation Module (answer scoring, rubric-based feedback, improved answer)
```

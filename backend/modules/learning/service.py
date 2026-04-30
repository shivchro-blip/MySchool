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

    search_query = request.question or f"{chapter_title} {topic_title}".strip()
    console.print(f"[blue]Searching[/blue] ChromaDB: {search_query[:60]}...")

    chunks = search_similar(
        query=search_query,
        n_results=MAX_CONTEXT_CHUNKS,
        filters={"subject_code": subject["code"]},
    )

    context_parts = []
    total_chars = 0
    for chunk in chunks:
        chunk_text = f"[{chunk['metadata']['chunk_type'].upper()}]\n{chunk['content']}"
        if total_chars + len(chunk_text) > MAX_CONTEXT_CHARS:
            break
        context_parts.append(chunk_text)
        total_chars += len(chunk_text)

    context = "\n\n---\n\n".join(context_parts) if context_parts else (
        "No specific content found. Use your knowledge of Tamil Nadu board syllabus."
    )

    console.print(f"[dim]Context: {len(chunks)} chunks, {total_chars} chars[/dim]")

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

    raw_response, model_used, was_cached = await call_llm(
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
    """Parse JSON from AI response. Handles markdown code fences."""
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
    parsed["key_points"] = ["[Tamil translation — see explanation above]"]
    return parsed

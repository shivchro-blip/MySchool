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

    Returns:
        Tuple of (response_text, model_used, was_cached)
    """
    # Step 1: Check cache
    cache_key = make_cache_key(prompt_type, cache_key_content)
    cached = await get_cached_response(cache_key)
    if cached:
        console.print(f"[dim]Cache hit for {prompt_type}[/dim]")
        await _log_usage(user_id=user_id, action=prompt_type, model_used="cache", was_cached=True)
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
            raise RuntimeError(f"Both Ollama and OpenRouter failed. Last error: {e}")

    # Step 4: Save to cache
    await save_cached_response(
        cache_key=cache_key,
        prompt_type=prompt_type,
        response_text=response_text,
        model_used=model_used,
    )

    # Step 5: Log usage
    await _log_usage(user_id=user_id, action=prompt_type, model_used=model_used, was_cached=False)

    return response_text, model_used, False


async def _log_usage(
    user_id: str | None,
    action: str,
    model_used: str,
    was_cached: bool,
) -> None:
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

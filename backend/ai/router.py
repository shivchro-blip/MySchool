from config import settings
from . import ollama_client, openrouter_client
from rich.console import Console

console = Console()


async def call_llm_direct(
    messages: list[dict],
    temperature: float = 0.3,
    max_tokens: int = 1024,
) -> tuple[str, str]:
    """
    Try Ollama first, fall back to OpenRouter.
    Returns (response_text, model_used).
    Raises RuntimeError if both fail.
    Called only by AIGate — never import directly from modules or routes.
    """
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
            f"Both Ollama and OpenRouter failed. Last error: {openrouter_err}"
        )


async def call_llm(
    messages: list[dict],
    prompt_type: str,
    cache_key_content: str,
    user_id: str | None = None,
    force_openrouter: bool = False,
    temperature: float = 0.3,
    max_tokens: int = 1024,
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

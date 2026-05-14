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



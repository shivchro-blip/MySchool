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
    Send chat request to OpenRouter.
    Same interface as ollama_client.chat for easy swapping.
    Returns assistant reply as plain string.
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
            response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
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

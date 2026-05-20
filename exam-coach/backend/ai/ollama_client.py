import httpx
from config import settings
from rich.console import Console

console = Console()

OLLAMA_GENERATE_URL = f"{settings.ollama_base_url}/api/generate"
OLLAMA_CHAT_URL = f"{settings.ollama_base_url}/api/chat"
OLLAMA_TAGS_URL = f"{settings.ollama_base_url}/api/tags"

DEFAULT_TIMEOUT = 120.0


async def is_ollama_available() -> bool:
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
    Send chat request to Ollama.
    messages: [{"role": "system"|"user"|"assistant", "content": "..."}]
    Returns assistant reply as plain string.
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
    try:
        async with httpx.AsyncClient() as client:
            r = await client.get(OLLAMA_TAGS_URL, timeout=5.0)
            data = r.json()
            return [m["name"] for m in data.get("models", [])]
    except Exception:
        return []

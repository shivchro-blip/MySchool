import time
from db.repositories import CacheRepository, UsersRepository
from core.errors import RateLimitError, AIUnavailableError
from rich.console import Console

console = Console()


class AIGate:
    """
    Single entry point for every AI call.
    Handles in order: rate limit → cache → LLM → cache write → increment → log.
    Neither rate limiting nor caching happens outside this class.
    """

    def __init__(self):
        self._cache = CacheRepository()
        self._users = UsersRepository()

    async def call(
        self,
        messages: list[dict],
        prompt_type: str,
        cache_key_content: str,
        user_id: str | None = None,
        temperature: float = 0.3,
        max_tokens: int = 1024,
    ) -> tuple[str, str, bool]:
        """
        Returns (response_text, model_used, was_cached).
        Raises RateLimitError or AIUnavailableError.
        """
        if user_id and self._users.is_over_limit(user_id):
            raise RateLimitError()

        cache_key = self._cache.make_key(prompt_type, cache_key_content)
        cached = self._cache.get(cache_key)

        if cached:
            console.print(f"[dim]Cache HIT — {prompt_type}[/dim]")
            self._users.log_usage(
                user_id=user_id,
                action=prompt_type,
                model_used="cache",
                was_cached=True,
            )
            return cached, "cache", True

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

        self._cache.set(
            cache_key=cache_key,
            prompt_type=prompt_type,
            response_text=response_text,
            model_used=model_used,
        )

        if user_id:
            self._users.increment_ai_calls(user_id)

        self._users.log_usage(
            user_id=user_id,
            action=prompt_type,
            model_used=model_used,
            was_cached=False,
            duration_ms=duration_ms,
        )

        return response_text, model_used, False

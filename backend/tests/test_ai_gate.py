import asyncio
from unittest.mock import AsyncMock, patch

from core.ai_gate import AIGate
from core.errors import RateLimitError


class FakeCacheRepository:
    def __init__(self, cached: str | None = None):
        self.cached = cached
        self.get_calls = 0

    def make_key(self, prompt_type: str, cache_key_content: str) -> str:
        return f"{prompt_type}:{cache_key_content}"

    def get(self, cache_key: str) -> str | None:
        self.get_calls += 1
        return self.cached

    def set(self, **kwargs) -> None:
        pass


class FakeUsersRepository:
    def __init__(self, limit: int):
        self.limit = limit
        self.count = 0
        self.logs = []

    def consume_ai_call(self, user_id: str) -> int | None:
        if self.count >= self.limit:
            return None
        self.count += 1
        return self.count

    def log_usage(self, **kwargs) -> None:
        self.logs.append(kwargs)


async def _call_gate(gate: AIGate):
    try:
        return await gate.call(
            messages=[{"role": "user", "content": "hello"}],
            prompt_type="evaluate",
            cache_key_content="same-answer",
            user_id="user-1",
        )
    except RateLimitError as exc:
        return exc


def test_concurrent_over_limit_ai_calls_are_rejected():
    users = FakeUsersRepository(limit=1)
    cache = FakeCacheRepository()
    llm = AsyncMock(return_value=("ok", "test-model"))

    with (
        patch("core.ai_gate.UsersRepository", return_value=users),
        patch("core.ai_gate.CacheRepository", return_value=cache),
        patch("ai.router.call_llm_direct", new=llm),
    ):
        gate = AIGate()

        async def run_calls():
            return await asyncio.gather(_call_gate(gate), _call_gate(gate))

        results = asyncio.run(run_calls())

    assert sum(isinstance(result, RateLimitError) for result in results) == 1
    assert users.count == 1
    assert llm.await_count == 1


def test_cache_hits_consume_ai_quota():
    users = FakeUsersRepository(limit=1)
    cache = FakeCacheRepository(cached="cached response")

    with (
        patch("core.ai_gate.UsersRepository", return_value=users),
        patch("core.ai_gate.CacheRepository", return_value=cache),
    ):
        result = asyncio.run(_call_gate(AIGate()))

    assert result == ("cached response", "cache", True)
    assert users.count == 1
    assert users.logs[0]["was_cached"] is True

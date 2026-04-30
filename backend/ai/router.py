# AI Router — stub
# Phase 4 will implement this fully
# Rule: Try Ollama first, fall back to OpenRouter

from config import settings


async def call_llm(prompt: str, system: str = "") -> str:
    """
    Main entry point for all LLM calls.
    Tries Ollama first, falls back to OpenRouter.
    """
    # TODO: implement in Phase 4
    raise NotImplementedError("AI router not implemented yet. Coming in Phase 4.")

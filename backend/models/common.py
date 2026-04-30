from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    env: str
    ollama: str
    supabase: str
    chromadb: str


class ErrorResponse(BaseModel):
    error: str
    detail: str | None = None
    code: str | None = None


class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    page_size: int
    has_more: bool

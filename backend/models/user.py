from pydantic import BaseModel, Field
from uuid import UUID
from typing import Literal
from datetime import datetime


class UserProfileResponse(BaseModel):
    id: UUID
    full_name: str | None
    class_level: str | None
    school: str | None
    plan: Literal["free", "paid"]
    daily_ai_calls: int
    created_at: datetime


class UpdateProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, max_length=100)
    class_level: str | None = Field(default=None)
    school: str | None = Field(default=None, max_length=200)


class UsageStatsResponse(BaseModel):
    daily_ai_calls: int
    daily_limit: int
    calls_remaining: int
    plan: str

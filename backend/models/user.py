from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from typing import Literal
from datetime import datetime


class UserProfileResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: UUID
    full_name: str | None
    class_level: str | None = Field(default=None, alias='class')
    school: str | None
    plan: Literal["free", "paid"]
    daily_ai_calls: int
    onboarding_completed: bool = False
    created_at: datetime


class UpdateProfileRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str | None = Field(default=None, max_length=100)
    class_level: str | None = Field(default=None, alias='class')
    school: str | None = Field(default=None, max_length=200)
    onboarding_completed: bool | None = Field(default=None)


class UsageStatsResponse(BaseModel):
    daily_ai_calls: int
    daily_limit: int
    calls_remaining: int
    plan: str

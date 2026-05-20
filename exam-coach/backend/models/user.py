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
    age_confirmation: Literal["adult", "minor_with_consent"] | None = None
    terms_accepted_at: datetime | None = None
    privacy_accepted_at: datetime | None = None
    subjects: list[str] = []
    onboarding_completed: bool = False


class UpdateProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, max_length=100)
    class_level: str | None = Field(default=None, pattern=r"^\+(1|2)$")
    school: str | None = Field(default=None, max_length=200)
    subjects: list[str] | None = Field(default=None, max_length=10)
    onboarding_completed: bool | None = None
    age_confirmation: Literal["adult", "minor_with_consent"] | None = None
    terms_accepted_at: datetime | None = None
    privacy_accepted_at: datetime | None = None


class UsageStatsResponse(BaseModel):
    daily_ai_calls: int
    daily_limit: int
    calls_remaining: int
    plan: str

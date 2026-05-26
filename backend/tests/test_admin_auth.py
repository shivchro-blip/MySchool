import asyncio
from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from core import admin_auth


def test_user_metadata_admin_role_is_rejected(monkeypatch):
    async def fake_resolve_user(credentials):
        return SimpleNamespace(
            id="00000000-0000-0000-0000-000000000099",
            email="student@test.com",
            user_metadata={"role": "admin"},
            app_metadata={},
        )

    monkeypatch.setattr(admin_auth, "_resolve_user", fake_resolve_user)

    with pytest.raises(HTTPException) as exc_info:
        asyncio.run(admin_auth.get_admin_user(None))

    assert exc_info.value.status_code == 403


def test_app_metadata_admin_role_is_accepted(monkeypatch):
    async def fake_resolve_user(credentials):
        return SimpleNamespace(
            id="00000000-0000-0000-0000-000000000098",
            email="admin@test.com",
            user_metadata={},
            app_metadata={"role": "admin"},
        )

    monkeypatch.setattr(admin_auth, "_resolve_user", fake_resolve_user)

    admin = asyncio.run(admin_auth.get_admin_user(None))

    assert admin == {
        "id": "00000000-0000-0000-0000-000000000098",
        "email": "admin@test.com",
        "role": "admin",
    }

"""
Auth dependency tests — local JWT verification, remote fallback, and the
login/sign-up profile routes.
Run: pytest backend/tests/test_auth.py -v
"""

import asyncio
import sys
import time
from datetime import datetime
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.testclient import TestClient
from jose import jwk, jwt

sys.path.insert(0, str(Path(__file__).parent.parent))

import core.auth as auth
from core.admin_auth import get_admin_user
from db.repositories.users_repo import UsersRepository
from main import app

SUPABASE_URL = "https://proj.supabase.co"
ISSUER       = f"{SUPABASE_URL}/auth/v1"
SECRET       = "test-jwt-secret-that-is-long-enough-for-hs256"
USER_ID      = "11111111-1111-1111-1111-111111111111"

PROFILE_ROW = {
    "id": USER_ID, "full_name": None, "class_level": "+1", "school": None,
    "plan": "free", "daily_ai_calls": 0, "created_at": "2026-01-01T00:00:00+00:00",
    "subjects": ["english"], "onboarding_completed": True,
}


@pytest.fixture(autouse=True)
def auth_settings(monkeypatch):
    monkeypatch.setattr(auth.settings, "supabase_url", SUPABASE_URL)
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", SECRET)
    monkeypatch.setattr(auth.settings, "supabase_jwt_issuer", "")
    monkeypatch.setattr(auth.settings, "auth_local_jwt", True)
    monkeypatch.setattr(auth.settings, "auth_remote_cache_seconds", 60)
    auth._jwks.reset()
    auth._remote_cache.reset()
    yield
    auth._jwks.reset()
    auth._remote_cache.reset()


@pytest.fixture
def no_remote():
    """Fail the test if the blocking Supabase Auth round trip is used."""
    with patch.object(UsersRepository, "get_auth_user",
                      side_effect=AssertionError("remote auth must not be called")) as m:
        yield m


def claims(**overrides):
    now = int(time.time())
    base = {
        "sub": USER_ID, "aud": "authenticated", "role": "authenticated",
        "email": "student@test.com", "iss": ISSUER, "iat": now, "exp": now + 3600,
        "user_metadata": {}, "app_metadata": {"provider": "email"},
    }
    base.update(overrides)
    return {k: v for k, v in base.items() if v is not None}


def hs_token(secret=SECRET, **overrides):
    return jwt.encode(claims(**overrides), secret, algorithm="HS256")


def creds(token):
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)


def resolve(token):
    return asyncio.run(auth._resolve_user(creds(token)))


def assert_401(token):
    with pytest.raises(HTTPException) as exc:
        resolve(token)
    assert exc.value.status_code == 401


# ── Local HS256 verification ──────────────────────────────────────────────────

def test_valid_hs256_token_verified_locally(no_remote):
    user = resolve(hs_token())
    assert user.id == USER_ID
    assert user.email == "student@test.com"
    no_remote.assert_not_called()


def test_expired_token_rejected(no_remote):
    now = int(time.time())
    assert_401(hs_token(iat=now - 7200, exp=now - 3600))


def test_wrong_audience_rejected(no_remote):
    assert_401(hs_token(aud="someone-else"))


def test_missing_audience_rejected(no_remote):
    assert_401(hs_token(aud=None))


def test_wrong_issuer_rejected(no_remote):
    assert_401(hs_token(iss="https://evil.example.com/auth/v1"))


def test_bad_signature_rejected_without_remote_fallback(no_remote):
    assert_401(hs_token(secret="a-different-secret-of-similar-length-xxxxxx"))


def test_anon_key_shaped_token_rejected(no_remote):
    """The public anon key is an HS256 JWT signed with the same secret."""
    anon = jwt.encode({"iss": "supabase", "ref": "proj", "role": "anon",
                       "iat": int(time.time()), "exp": int(time.time()) + 10**8},
                      SECRET, algorithm="HS256")
    assert_401(anon)


def test_service_role_token_rejected(no_remote):
    assert_401(hs_token(role="service_role"))


def test_unsupported_alg_rejected(no_remote):
    header = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0"  # {"alg":"none","typ":"JWT"}
    payload = jwt.encode(claims(), SECRET, algorithm="HS256").split(".")[1]
    assert_401(f"{header}.{payload}.")


def test_malformed_token_rejected(no_remote):
    assert_401("not-a-jwt")


def test_missing_credentials_rejected():
    with pytest.raises(HTTPException) as exc:
        asyncio.run(auth._resolve_user(None))
    assert exc.value.status_code == 401


# ── Local ES256 verification via JWKS ─────────────────────────────────────────

def _es256_keypair(kid):
    private = ec.generate_private_key(ec.SECP256R1())
    private_pem = private.private_bytes(
        serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8,
        serialization.NoEncryption(),
    )
    public_pem = private.public_key().public_bytes(
        serialization.Encoding.PEM, serialization.PublicFormat.SubjectPublicKeyInfo,
    )
    public_jwk = jwk.construct(public_pem, "ES256").to_dict()
    public_jwk.update({"kid": kid, "alg": "ES256", "use": "sig"})
    return private_pem, public_jwk


def test_es256_token_verified_with_jwks_and_refreshes_on_unknown_kid(no_remote):
    private_pem, public_jwk = _es256_keypair("kid-1")
    token = jwt.encode(claims(), private_pem, algorithm="ES256", headers={"kid": "kid-1"})
    refreshes = []

    async def fake_refresh():
        refreshes.append(1)
        auth._jwks._last_attempt = time.monotonic()
        auth._jwks._keys = {"kid-1": public_jwk}
        auth._jwks._fetched_at = time.monotonic()

    with patch.object(auth._jwks, "refresh", side_effect=fake_refresh):
        assert resolve(token).id == USER_ID
        assert resolve(token).id == USER_ID
    assert len(refreshes) == 1   # second request served from the JWKS cache


def test_es256_token_signed_by_unknown_key_rejected(no_remote):
    _, public_jwk = _es256_keypair("kid-1")
    attacker_pem, _ = _es256_keypair("kid-1")
    auth._jwks._keys = {"kid-1": public_jwk}
    auth._jwks._fetched_at = time.monotonic()
    token = jwt.encode(claims(), attacker_pem, algorithm="ES256", headers={"kid": "kid-1"})
    assert_401(token)


def test_jwks_alg_mismatch_rejected(no_remote):
    _, public_jwk = _es256_keypair("kid-1")
    public_jwk["alg"] = "RS256"
    auth._jwks._keys = {"kid-1": public_jwk}
    auth._jwks._fetched_at = time.monotonic()
    private_pem, _ = _es256_keypair("kid-1")
    token = jwt.encode(claims(), private_pem, algorithm="ES256", headers={"kid": "kid-1"})
    assert_401(token)


# ── Remote fallback (no local key available) ──────────────────────────────────

def _remote_user():
    return SimpleNamespace(user=SimpleNamespace(
        id=USER_ID, email="student@test.com", user_metadata={}, app_metadata={},
    ))


def test_remote_fallback_used_when_no_secret_and_result_cached(monkeypatch):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    token = hs_token()
    with patch.object(UsersRepository, "get_auth_user", return_value=_remote_user()) as m:
        assert resolve(token).id == USER_ID
        assert resolve(token).id == USER_ID
    assert m.call_count == 1


def test_remote_fallback_rejection_is_401(monkeypatch):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    with patch.object(UsersRepository, "get_auth_user", side_effect=Exception("bad jwt")):
        assert_401(hs_token())


def test_remote_mode_forced_by_setting(monkeypatch):
    monkeypatch.setattr(auth.settings, "auth_local_jwt", False)
    with patch.object(UsersRepository, "get_auth_user", return_value=_remote_user()) as m:
        assert resolve(hs_token()).id == USER_ID
    assert m.call_count == 1


def test_remote_fallback_does_not_block_event_loop(monkeypatch):
    """Regression: get_user() is synchronous; it used to run on the event loop,
    serialising every authenticated request behind one Supabase round trip."""
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    delay, n = 0.2, 4

    def slow_get_user(_token):
        time.sleep(delay)
        return _remote_user()

    async def run_concurrently():
        tokens = [hs_token(email=f"s{i}@test.com") for i in range(n)]  # distinct → no cache
        started = time.perf_counter()
        await asyncio.gather(*(auth._resolve_user(creds(t)) for t in tokens))
        return time.perf_counter() - started

    with patch.object(UsersRepository, "get_auth_user", side_effect=slow_get_user):
        elapsed = asyncio.run(run_concurrently())
    assert elapsed < delay * n * 0.75, f"requests were serialised ({elapsed:.2f}s)"


# ── Admin role check still enforced ───────────────────────────────────────────

def test_admin_dependency_rejects_non_admin(no_remote):
    with pytest.raises(HTTPException) as exc:
        asyncio.run(get_admin_user(creds(hs_token())))
    assert exc.value.status_code == 403


def test_admin_dependency_accepts_admin(no_remote):
    admin = asyncio.run(get_admin_user(creds(hs_token(user_metadata={"role": "admin"}))))
    assert admin["role"] == "admin"


# ── /users/me routes (login + sign-up path) ───────────────────────────────────

client = TestClient(app)


def _auth_header():
    return {"Authorization": f"Bearer {hs_token()}"}


def test_get_me_with_real_token_and_timing_headers(no_remote):
    with patch.object(UsersRepository, "__init__", return_value=None), \
         patch.object(UsersRepository, "get_by_id", return_value=PROFILE_ROW):
        res = client.get("/api/v1/users/me", headers=_auth_header())
    assert res.status_code == 200
    assert res.json()["id"] == USER_ID
    assert res.headers.get("x-request-id")
    assert "auth;dur=" in res.headers.get("server-timing", "")


def test_get_me_without_token_is_401():
    assert client.get("/api/v1/users/me").status_code == 401


def test_get_me_missing_profile_is_404_not_500(no_remote):
    db = MagicMock()
    db.table.return_value.select.return_value.eq.return_value.limit.return_value \
        .execute.return_value = SimpleNamespace(data=[])
    with patch("db.repositories.users_repo.get_db", return_value=db):
        res = client.get("/api/v1/users/me", headers=_auth_header())
    assert res.status_code == 404


def test_signup_consent_put_serialises_datetimes(no_remote):
    """Regression: datetime fields reached supabase-py unserialised → 500 on every sign-up."""
    captured = {}

    def fake_update(_self, user_id, fields):
        import json
        json.dumps(fields)  # what supabase-py does with the payload
        captured.update(fields)
        return {**PROFILE_ROW, **fields}

    with patch.object(UsersRepository, "__init__", return_value=None), \
         patch.object(UsersRepository, "update_profile", fake_update):
        res = client.put("/api/v1/users/me", headers=_auth_header(), json={
            "age_confirmation": "adult",
            "terms_accepted_at": "2026-09-30T10:00:00.000Z",
            "privacy_accepted_at": "2026-09-30T10:00:00.000Z",
        })
    assert res.status_code == 200, res.text
    assert isinstance(captured["terms_accepted_at"], str)
    assert datetime.fromisoformat(captured["terms_accepted_at"].replace("Z", "+00:00"))
    assert res.json()["age_confirmation"] == "adult"


def test_update_profile_is_single_round_trip():
    db = MagicMock()
    db.table.return_value.update.return_value.eq.return_value.execute.return_value = \
        SimpleNamespace(data=[{**PROFILE_ROW, "onboarding_completed": True}])
    with patch("db.repositories.users_repo.get_db", return_value=db):
        row = UsersRepository().update_profile(USER_ID, {"onboarding_completed": True})
    assert row["onboarding_completed"] is True
    db.table.return_value.select.assert_not_called()


def test_update_profile_missing_row_returns_none():
    db = MagicMock()
    db.table.return_value.update.return_value.eq.return_value.execute.return_value = \
        SimpleNamespace(data=[])
    with patch("db.repositories.users_repo.get_db", return_value=db):
        assert UsersRepository().update_profile(USER_ID, {"full_name": "A"}) is None

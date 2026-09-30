"""
Auth dependency tests — local JWT verification (HS256 + JWKS), remote
fallback semantics, remote cache, and the login-path repository fixes.
Run: pytest tests/test_auth.py -v
"""

import asyncio
import sys
import time
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
from db.repositories.users_repo import UsersRepository
from main import app

SUPABASE_URL = "https://proj.supabase.co"
ISSUER       = f"{SUPABASE_URL}/auth/v1"
SECRET       = "test-jwt-secret-that-is-long-enough-for-hs256"
USER_ID      = "11111111-1111-1111-1111-111111111111"
REMOTE_USER  = {"id": USER_ID, "email": "student@test.com", "app_metadata": {}}


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
    """Fail the test if the GoTrue round trip is used."""
    with patch.object(auth, "_verify_jwt_remote",
                      side_effect=AssertionError("remote auth must not be called")) as m:
        yield m


@pytest.fixture
def remote_ok():
    with patch.object(auth, "_verify_jwt_remote", return_value=REMOTE_USER) as m:
        yield m


@pytest.fixture
def remote_rejects():
    with patch.object(auth, "_verify_jwt_remote", return_value=None) as m:
        yield m


def claims(**overrides):
    now = int(time.time())
    base = {
        "sub": USER_ID, "aud": "authenticated", "role": "authenticated",
        "email": "student@test.com", "iss": ISSUER, "iat": now, "exp": now + 3600,
        "app_metadata": {"provider": "email"},
    }
    base.update(overrides)
    return {k: v for k, v in base.items() if v is not None}


def hs_token(secret=SECRET, **overrides):
    return jwt.encode(claims(**overrides), secret, algorithm="HS256")


def creds(token):
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)


def resolve(token, allow_local=True):
    return asyncio.run(auth._resolve_user(creds(token), allow_local=allow_local))


def assert_401(token, allow_local=True):
    with pytest.raises(HTTPException) as exc:
        resolve(token, allow_local)
    assert exc.value.status_code == 401


# ── Local HS256 ───────────────────────────────────────────────────────────────

def test_valid_hs256_token_verified_locally(no_remote):
    user = resolve(hs_token())
    assert user == {"id": USER_ID, "email": "student@test.com",
                    "app_metadata": {"provider": "email"}}


def test_expired_token_rejected_without_remote_round_trip(no_remote):
    now = int(time.time())
    assert_401(hs_token(iat=now - 7200, exp=now - 3600))


def test_malformed_token_rejected_without_remote(no_remote):
    assert_401("not-a-jwt")


def test_unsupported_alg_rejected_without_remote(no_remote):
    header = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0"  # {"alg":"none","typ":"JWT"}
    payload = hs_token().split(".")[1]
    assert_401(f"{header}.{payload}.")


def test_missing_credentials_rejected():
    with pytest.raises(HTTPException) as exc:
        asyncio.run(auth._resolve_user(None))
    assert exc.value.status_code == 401


# Local failures fall back to GoTrue (so a misconfigured secret/issuer degrades
# to the slow path instead of locking users out) — GoTrue has the final say.

def test_bad_signature_falls_back_and_remote_rejects(remote_rejects):
    assert_401(hs_token(secret="another-secret-of-similar-length-xxxxxxxxxx"))
    assert remote_rejects.call_count == 1


def test_wrong_secret_configured_degrades_to_remote(monkeypatch, remote_ok):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "misconfigured-secret-xxxxxxxxxxxxxxxxxxxx")
    assert resolve(hs_token())["id"] == USER_ID
    assert remote_ok.call_count == 1


@pytest.mark.parametrize("overrides", [
    {"aud": "someone-else"},
    {"aud": None},
    {"iss": "https://evil.example.com/auth/v1"},
    {"role": "service_role"},
])
def test_claim_mismatch_never_accepted_locally(overrides, remote_rejects):
    assert_401(hs_token(**overrides))
    assert remote_rejects.call_count == 1


def test_anon_key_shaped_token_not_accepted_locally(remote_rejects):
    anon = jwt.encode({"iss": "supabase", "ref": "proj", "role": "anon",
                       "iat": int(time.time()), "exp": int(time.time()) + 10**8},
                      SECRET, algorithm="HS256")
    assert_401(anon)


def test_no_secret_uses_remote_and_caches(monkeypatch, remote_ok):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    token = hs_token()
    assert resolve(token)["id"] == USER_ID
    assert resolve(token)["id"] == USER_ID
    assert remote_ok.call_count == 1


def test_admin_path_is_live_and_uncached(remote_ok):
    token = hs_token()
    resolve(token, allow_local=False)
    resolve(token, allow_local=False)
    assert remote_ok.call_count == 2


def test_remote_fallback_does_not_block_event_loop(monkeypatch):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    delay, n = 0.2, 4

    def slow_remote(_token):
        time.sleep(delay)
        return REMOTE_USER

    async def run_concurrently():
        tokens = [hs_token(email=f"s{i}@test.com") for i in range(n)]
        started = time.perf_counter()
        await asyncio.gather(*(auth._resolve_user(creds(t)) for t in tokens))
        return time.perf_counter() - started

    with patch.object(auth, "_verify_jwt_remote", side_effect=slow_remote):
        elapsed = asyncio.run(run_concurrently())
    assert elapsed < delay * n * 0.75, f"requests were serialised ({elapsed:.2f}s)"


# ── Local ES256 via JWKS ──────────────────────────────────────────────────────

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


def test_es256_verified_with_jwks_and_cached(monkeypatch, no_remote):
    monkeypatch.setattr(auth.settings, "supabase_jwt_secret", "")
    private_pem, public_jwk = _es256_keypair("kid-1")
    token = jwt.encode(claims(), private_pem, algorithm="ES256", headers={"kid": "kid-1"})
    refreshes = []

    async def fake_refresh():
        refreshes.append(1)
        auth._jwks._last_attempt = time.monotonic()
        auth._jwks._keys = {"kid-1": public_jwk}
        auth._jwks._fetched_at = time.monotonic()

    with patch.object(auth._jwks, "refresh", side_effect=fake_refresh):
        assert resolve(token)["id"] == USER_ID
        assert resolve(token)["id"] == USER_ID
    assert len(refreshes) == 1


def test_es256_forged_signature_not_accepted(remote_rejects):
    _, public_jwk = _es256_keypair("kid-1")
    attacker_pem, _ = _es256_keypair("kid-1")
    auth._jwks._keys = {"kid-1": public_jwk}
    auth._jwks._fetched_at = time.monotonic()
    token = jwt.encode(claims(), attacker_pem, algorithm="ES256", headers={"kid": "kid-1"})
    assert_401(token)


def test_es256_unknown_kid_uses_remote(remote_ok):
    private_pem, _ = _es256_keypair("kid-unknown")
    token = jwt.encode(claims(), private_pem, algorithm="ES256", headers={"kid": "kid-unknown"})
    with patch.object(auth._jwks, "refresh", return_value=None):
        assert resolve(token)["id"] == USER_ID
    assert remote_ok.call_count == 1


# ── Repository: login-path fixes ──────────────────────────────────────────────

def test_get_by_id_missing_row_returns_none_not_exception():
    db = MagicMock()
    db.table.return_value.select.return_value.eq.return_value.limit.return_value \
        .execute.return_value = SimpleNamespace(data=[])
    with patch("db.repositories.users_repo.get_db", return_value=db):
        assert UsersRepository().get_by_id(USER_ID) is None


def test_update_profile_is_single_round_trip_and_serialises_datetimes():
    from datetime import datetime, timezone
    db = MagicMock()
    db.table.return_value.update.return_value.eq.return_value.execute.return_value = \
        SimpleNamespace(data=[{"id": USER_ID, "age_confirmation": "adult"}])
    ts = datetime(2026, 9, 30, tzinfo=timezone.utc)
    with patch("db.repositories.users_repo.get_db", return_value=db):
        row = UsersRepository().update_profile(USER_ID, {"terms_accepted_at": ts})
    assert row["age_confirmation"] == "adult"
    sent = db.table.return_value.update.call_args[0][0]
    assert sent["terms_accepted_at"] == ts.isoformat()
    db.table.return_value.select.assert_not_called()


# ── /ping (cold-start warm-up / keep-alive) ───────────────────────────────────

def test_ping_is_cheap_and_always_ok():
    client = TestClient(app)
    with patch("db.client.get_db", side_effect=AssertionError("ping must not touch the DB")):
        for path in ("/ping", "/api/v1/ping"):
            assert client.get(path).json() == {"status": "ok"}
            assert client.head(path).status_code == 200


# ── Shared Supabase client ────────────────────────────────────────────────────

def test_get_db_builds_one_client_under_concurrent_first_use(monkeypatch):
    """Regression: the post-cold-start request burst built one client per thread."""
    import threading
    import db.client as db_client

    monkeypatch.setattr(db_client, "_client", None)
    monkeypatch.setattr(db_client.settings, "supabase_url", SUPABASE_URL)
    monkeypatch.setattr(db_client.settings, "supabase_service_key", "service-key")
    built = []

    def slow_create(*_args):
        time.sleep(0.05)
        built.append(1)
        return SimpleNamespace(postgrest=object())

    monkeypatch.setattr(db_client, "create_client", slow_create)
    threads = [threading.Thread(target=db_client.get_db) for _ in range(16)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert len(built) == 1

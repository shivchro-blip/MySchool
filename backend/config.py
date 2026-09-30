from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""

    # ── Auth token verification ──────────────────────────────────────────
    # Tokens are verified locally (signature + exp + aud + iss) instead of a
    # blocking round trip to Supabase Auth on every request.
    #   - asymmetric keys (ES256/RS256): public keys fetched from JWKS, no config needed
    #   - legacy HS256 projects: set SUPABASE_JWT_SECRET (Dashboard → Settings → API)
    # Tokens that cannot be verified locally fall back to Supabase Auth (off the
    # event loop, short positive cache). Set AUTH_LOCAL_JWT=false to always
    # verify remotely (instant revocation, higher latency).
    supabase_jwt_secret: str = ""
    supabase_jwt_issuer: str = ""          # default: {supabase_url}/auth/v1
    auth_local_jwt: bool = True
    auth_jwt_leeway_seconds: int = 10
    auth_jwks_cache_seconds: int = 600
    auth_jwks_min_refetch_seconds: int = 30
    auth_jwks_timeout_seconds: float = 3.0
    auth_remote_cache_seconds: int = 60
    auth_remote_cache_max_entries: int = 10000

    # ── Observability ────────────────────────────────────────────────────
    log_level: str = "INFO"
    slow_request_ms: int = 1000

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "mistral:7b-instruct"

    openrouter_api_key: str = ""
    openrouter_model: str = "anthropic/claude-3-haiku"

    app_env: str = "development"
    secret_key: str = ""
    allowed_origins: str = "http://localhost:5173,http://localhost:5174,https://yadhum.net,https://www.yadhum.net"
    # The web app calls the API cross-origin with a bearer token, so every
    # request needs a preflight. Let browsers cache it (Chromium caps at 7200s).
    cors_max_age_seconds: int = 7200

    redis_url: str = ""
    cache_ttl_seconds: int = 604800


settings = Settings()

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""
    # Supabase JWT signing secret (Dashboard → Settings → API → JWT Secret).
    # When set, access tokens are verified locally (HS256) instead of via a
    # remote GoTrue round-trip — cuts /users/me from two serial network calls
    # to one. Leave empty to keep the original remote-validation behaviour.
    supabase_jwt_secret: str = ""
    # Projects on asymmetric signing keys (ES256/RS256) need no secret: public
    # keys come from {supabase_url}/auth/v1/.well-known/jwks.json (cached).
    supabase_jwt_issuer: str = ""          # default: {supabase_url}/auth/v1
    auth_local_jwt: bool = True
    auth_jwt_leeway_seconds: int = 10
    auth_jwks_cache_seconds: int = 600
    auth_jwks_min_refetch_seconds: int = 30
    auth_jwks_timeout_seconds: float = 3.0
    # Remote-validation fallback cache (student path only; never the admin gate).
    auth_remote_cache_seconds: int = 60
    auth_remote_cache_max_entries: int = 10000

    # Observability (core/observability.py)
    log_level: str = "INFO"
    slow_request_ms: int = 1000
    # Preflight cache lifetime for cross-origin API calls (Chromium caps at 7200s).
    cors_max_age_seconds: int = 7200

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "mistral:7b-instruct"

    openrouter_api_key: str = ""
    openrouter_model: str = "anthropic/claude-3-haiku"

    app_env: str = "production"
    secret_key: str = ""
    allowed_origins: str = "http://localhost:5173,http://localhost:5174,https://yadhum.net,https://www.yadhum.net"

    redis_url: str = ""
    cache_ttl_seconds: int = 604800

    # Gates the temporary GET /health/diag endpoint (Yadhum perf investigation,
    # 2026-09). Empty (default) disables the endpoint entirely. Remove this
    # setting and the endpoint together once the investigation is closed.
    diag_token: str = ""


settings = Settings()

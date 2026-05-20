from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = "mistral:7b-instruct"

    openrouter_api_key: str = ""
    openrouter_model: str = "anthropic/claude-3-haiku"

    app_env: str = "production"
    secret_key: str = ""
    allowed_origins: str = "http://localhost:5173"

    redis_url: str = ""
    cache_ttl_seconds: int = 604800

    @model_validator(mode="after")
    def _require_secret_key_in_production(self) -> "Settings":
        if self.app_env != "development" and not self.secret_key:
            raise ValueError(
                "SECRET_KEY must be set in production. "
                "Generate one with: python -c \"import secrets; print(secrets.token_hex(32))\""
            )
        return self


settings = Settings()

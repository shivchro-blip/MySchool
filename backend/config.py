from pydantic_settings import BaseSettings, SettingsConfigDict


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
    allowed_origins: str = "http://localhost:5173,http://localhost:5174,https://yadhum.net,https://www.yadhum.net"

    redis_url: str = ""
    cache_ttl_seconds: int = 604800


settings = Settings()

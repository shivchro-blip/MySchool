from supabase import create_client, Client
from config import settings

_client: Client | None = None


def get_db() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_service_key:
            raise RuntimeError(
                "Supabase credentials not configured. "
                "Copy backend/.env.example to backend/.env and fill in values."
            )
        _client = create_client(
            settings.supabase_url,
            settings.supabase_service_key,
        )
    return _client


def get_public_db() -> Client:
    """Returns anon-key client — respects RLS policies."""
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise RuntimeError("Supabase anon credentials not configured.")
    return create_client(
        settings.supabase_url,
        settings.supabase_anon_key,
    )

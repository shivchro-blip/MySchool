# Supabase client — stub
# Phase 1 will configure this fully

from supabase import create_client, Client
from config import settings

_client: Client | None = None


def get_db() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_service_key:
            raise RuntimeError("Supabase credentials not configured. Check .env file.")
        _client = create_client(settings.supabase_url, settings.supabase_service_key)
    return _client

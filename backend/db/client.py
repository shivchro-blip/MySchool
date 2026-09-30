import threading

from supabase import create_client, Client
from config import settings

_client: Client | None = None
# Repository calls run in threadpool workers. Without the lock, the burst of
# requests that hits a freshly (re)started instance each saw _client=None and
# built its own client — 25 concurrent first requests took ~2.2s instead of
# ~40ms, and every extra client threw away its connection pool.
_client_lock = threading.Lock()


def get_db() -> Client:
    global _client
    if _client is None:
        with _client_lock:
            if _client is None:
                if not settings.supabase_url or not settings.supabase_service_key:
                    raise RuntimeError(
                        "Supabase credentials not configured. "
                        "Copy backend/.env.example to backend/.env and fill in values."
                    )
                client = create_client(
                    settings.supabase_url,
                    settings.supabase_service_key,
                )
                # Client.postgrest is also built lazily and unlocked; touching
                # it here means .table() never races to build extra PostgREST
                # clients (each with its own HTTP/2 connection pool).
                client.postgrest
                _client = client
    return _client


def get_public_db() -> Client:
    """Returns anon-key client — respects RLS policies."""
    if not settings.supabase_url or not settings.supabase_anon_key:
        raise RuntimeError("Supabase anon credentials not configured.")
    return create_client(
        settings.supabase_url,
        settings.supabase_anon_key,
    )

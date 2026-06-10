"""
Repository for the user_sessions table (single-session enforcement).

Only the SHA-256 hash of a session token is ever stored or compared —
the raw token exists client-side only. All methods use the service-key
client (get_db) per the repository-layer rule.
"""

import hashlib
from datetime import datetime, timezone

from db.client import get_db

# Skip the last_seen_at write if the row was touched less than this many
# seconds ago — keeps the hot path at one read instead of read + write.
TOUCH_INTERVAL_SECONDS = 60


class SessionsRepository:

    def __init__(self):
        self._db = get_db()

    @staticmethod
    def hash_token(raw_token: str) -> str:
        return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()

    def get_by_user(self, user_id: str) -> dict | None:
        result = (
            self._db.table("user_sessions")
            .select("session_token_hash, last_seen_at")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def replace_for_user(
        self,
        user_id: str,
        token_hash: str,
        device_hint: str | None,
    ) -> None:
        """Invalidate every existing session for the user, then store the
        new one. Two steps; the UNIQUE index on user_id is the backstop
        against concurrent claims leaving two rows."""
        self._db.table("user_sessions").delete().eq("user_id", user_id).execute()
        self._db.table("user_sessions").insert({
            "user_id":            user_id,
            "session_token_hash": token_hash,
            "device_hint":        device_hint,
        }).execute()

    def touch(self, user_id: str, last_seen_at: str | None = None) -> None:
        """Update last_seen_at, throttled to one write per TOUCH_INTERVAL."""
        if last_seen_at:
            try:
                seen = datetime.fromisoformat(last_seen_at.replace("Z", "+00:00"))
                age = (datetime.now(timezone.utc) - seen).total_seconds()
                if age < TOUCH_INTERVAL_SECONDS:
                    return
            except ValueError:
                pass
        self._db.table("user_sessions").update(
            {"last_seen_at": datetime.now(timezone.utc).isoformat()}
        ).eq("user_id", user_id).execute()

    def delete_for_user(self, user_id: str) -> None:
        self._db.table("user_sessions").delete().eq("user_id", user_id).execute()

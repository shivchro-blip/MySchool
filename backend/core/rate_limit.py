"""
Per-IP request rate limiting (slowapi).

This is abuse protection in front of the app — distinct from the AI
quota that AIGate enforces per user. Decorated endpoints must accept a
`request: Request` parameter (slowapi requirement).

In-memory storage: fine for the current single-process uvicorn deploy.
If the backend ever runs multiple workers/instances, point slowapi at
Redis via storage_uri=settings.redis_url.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Shared limit strings, tuned for a student studying actively —
# generous for humans, hostile to scripts.
AI_CALL_LIMIT       = "30/minute"
SESSION_CLAIM_LIMIT = "10/minute"
PROFILE_WRITE_LIMIT = "20/minute"

"""
Request timing, structured (JSON) logging and per-request auth timing.

Every HTTP request emits one `http_request` log line:
    {"event": "http_request", "method": "GET", "route": "/api/v1/users/me",
     "status": 200, "duration_ms": 12.4, "auth_method": "local_jwks",
     "auth_ms": 0.3, "auth_outcome": "ok", "request_id": "..."}
Requests slower than SLOW_REQUEST_MS are logged at WARNING.

Responses carry `X-Request-ID` and `Server-Timing: app;dur=..[, auth;dur=..]`
so latency is visible in browser DevTools and nginx/access logs.

Never log tokens, emails, passwords or request bodies here.
"""

import json
import logging
import re
import time
import uuid
from contextvars import ContextVar

from config import settings

REQUEST_CTX: ContextVar[dict | None] = ContextVar("request_ctx", default=None)

_REQUEST_ID_RE = re.compile(r"^[A-Za-z0-9._-]{1,64}$")
_LOGGER_NAME = "examcoach"

log = logging.getLogger(f"{_LOGGER_NAME}.http")


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "ts":     round(record.created, 3),
            "level":  record.levelname,
            "logger": record.name,
        }
        fields = getattr(record, "fields", None)
        if isinstance(fields, dict):
            payload.update(fields)
        msg = record.getMessage()
        if msg:
            payload.setdefault("event", msg)
        if record.exc_info:
            payload["exc"] = self.formatException(record.exc_info)
        return json.dumps(payload, default=str)


def configure_logging() -> None:
    logger = logging.getLogger(_LOGGER_NAME)
    if any(isinstance(h.formatter, JsonFormatter) for h in logger.handlers):
        return
    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())
    logger.addHandler(handler)
    logger.setLevel(settings.log_level.upper())
    logger.propagate = False


def log_event(logger: logging.Logger, event: str, level: int = logging.INFO, **fields) -> None:
    ctx = REQUEST_CTX.get()
    if ctx and "request_id" not in fields:
        fields["request_id"] = ctx.get("request_id")
    logger.log(level, event, extra={"fields": fields})


def record_auth(method: str, duration_ms: float, outcome: str) -> None:
    """Called by core.auth so the request log line carries auth timing."""
    ctx = REQUEST_CTX.get()
    if ctx is not None:
        ctx["auth_method"]  = method
        ctx["auth_ms"]      = round(duration_ms, 2)
        ctx["auth_outcome"] = outcome


def _route_template(scope) -> str:
    """'/api/v1/admin/content/{chunk_id}' rather than the concrete path, so log
    aggregation groups by endpoint. Nested routers only expose the leaf route
    ('/me'), so rebuild the template from the matched path params instead."""
    path = scope.get("path", "")
    if scope.get("route") is None:
        return "<unmatched>"
    for name, value in (scope.get("path_params") or {}).items():
        path = path.replace(f"/{value}", f"/{{{name}}}", 1)
    return path


class RequestTimingMiddleware:
    """Pure ASGI middleware (no BaseHTTPMiddleware overhead)."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        incoming = dict(scope.get("headers") or []).get(b"x-request-id", b"").decode("latin-1")
        request_id = incoming if _REQUEST_ID_RE.match(incoming) else uuid.uuid4().hex
        ctx = {"request_id": request_id}
        token = REQUEST_CTX.set(ctx)
        start = time.perf_counter()
        status_holder = {"status": 500}

        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                status_holder["status"] = message["status"]
                elapsed = (time.perf_counter() - start) * 1000
                timing = f"app;dur={elapsed:.1f}"
                if "auth_ms" in ctx:
                    timing += f", auth;dur={ctx['auth_ms']:.1f}"
                headers = list(message.get("headers") or [])
                headers.append((b"x-request-id", request_id.encode("latin-1")))
                headers.append((b"server-timing", timing.encode("latin-1")))
                message = {**message, "headers": headers}
            await send(message)

        try:
            await self.app(scope, receive, send_wrapper)
        finally:
            duration_ms = (time.perf_counter() - start) * 1000
            route = _route_template(scope)
            fields = {
                "method":      scope.get("method"),
                "route":       route,
                "status":      status_holder["status"],
                "duration_ms": round(duration_ms, 2),
                **ctx,
            }
            if route == "<unmatched>":
                fields["path"] = (scope.get("path") or "")[:200]
            slow = duration_ms >= settings.slow_request_ms
            level = logging.WARNING if slow or status_holder["status"] >= 500 else logging.INFO
            if slow:
                fields["slow"] = True
            log_event(log, "http_request", level, **fields)
            REQUEST_CTX.reset(token)

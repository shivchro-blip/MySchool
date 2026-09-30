"""
Request timing middleware + structured logs.
Run: pytest backend/tests/test_observability.py -v
"""

import json
import logging
import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).parent.parent))

from core import observability
from core.observability import JsonFormatter, RequestTimingMiddleware, record_auth


def _app():
    app = FastAPI()
    app.add_middleware(RequestTimingMiddleware)

    @app.get("/items/{item_id}")
    async def item(item_id: str):
        record_auth("local_hs256", 1.5, "ok")
        return {"id": item_id}

    return app


class _Capture(logging.Handler):
    def __init__(self):
        super().__init__()
        self.lines = []

    def emit(self, record):
        self.lines.append(json.loads(JsonFormatter().format(record)))


def _capture():
    handler = _Capture()
    logger = logging.getLogger("examcoach.http")
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    return logger, handler


def test_request_log_has_route_template_timing_and_auth():
    logger, handler = _capture()
    try:
        res = TestClient(_app()).get("/items/abc-123", headers={"X-Request-ID": "req-1"})
    finally:
        logger.removeHandler(handler)

    assert res.status_code == 200
    assert res.headers["x-request-id"] == "req-1"
    assert res.headers["server-timing"].startswith("app;dur=")
    assert "auth;dur=1.5" in res.headers["server-timing"]

    line = next(l for l in handler.lines if l["event"] == "http_request")
    assert line["route"] == "/items/{item_id}"
    assert line["status"] == 200
    assert line["auth_method"] == "local_hs256"
    assert line["request_id"] == "req-1"
    assert isinstance(line["duration_ms"], float)


def test_invalid_incoming_request_id_is_replaced():
    res = TestClient(_app()).get("/items/1", headers={"X-Request-ID": "bad id\nwith newline"})
    assert res.headers["x-request-id"] != "bad id\nwith newline"
    assert len(res.headers["x-request-id"]) == 32


def test_slow_request_logged_as_warning(monkeypatch):
    monkeypatch.setattr(observability.settings, "slow_request_ms", 0)
    logger, handler = _capture()
    try:
        TestClient(_app()).get("/items/1")
    finally:
        logger.removeHandler(handler)
    line = next(l for l in handler.lines if l["event"] == "http_request")
    assert line["level"] == "WARNING"
    assert line["slow"] is True


def test_unmatched_route_is_not_high_cardinality():
    logger, handler = _capture()
    try:
        TestClient(_app()).get("/wp-admin/xyz")
    finally:
        logger.removeHandler(handler)
    line = next(l for l in handler.lines if l["event"] == "http_request")
    assert line["route"] == "<unmatched>"
    assert line["status"] == 404

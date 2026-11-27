"""Liveness/readiness check used by Dokploy and uptime monitoring."""

from django.core.cache import cache
from django.db import connection
from ninja import Router, Schema, Status

router = Router(tags=["health"])


class HealthOut(Schema):
    status: str
    database: bool
    cache: bool


def _database_ok() -> bool:
    try:
        connection.ensure_connection()
    except Exception:
        return False
    return True


def _cache_ok() -> bool:
    try:
        cache.set("health:ping", "pong", timeout=5)
        return cache.get("health:ping") == "pong"
    except Exception:
        return False


@router.get("", response={200: HealthOut, 503: HealthOut}, auth=None)
def health(request):
    database, cache_ok = _database_ok(), _cache_ok()
    healthy = database and cache_ok
    body = HealthOut(status="ok" if healthy else "degraded", database=database, cache=cache_ok)
    return Status(200 if healthy else 503, body)

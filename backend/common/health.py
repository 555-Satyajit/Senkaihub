"""Liveness/readiness check used by Dokploy and uptime monitoring."""

from django.core.cache import cache
from django.db import connection
from ninja import Router, Schema, Status

from common.errors import ErrorOut

router = Router(tags=["health"])


class HealthOut(Schema):
    status: str
    database: bool
    cache: bool


def _database_ok() -> bool:
    # A query, not ensure_connection(): that skips reused connections the server already dropped.
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except Exception:
        return False
    return True


def _cache_ok() -> bool:
    try:
        cache.set("health:ping", "pong", timeout=5)
        return cache.get("health:ping") == "pong"
    except Exception:
        return False


@router.get("", response={200: HealthOut, 503: ErrorOut}, auth=None)
def health(request):
    checks = {"database": _database_ok(), "cache": _cache_ok()}
    if all(checks.values()):
        return HealthOut(status="ok", **checks)
    failing = {name: ["unavailable"] for name, ok in checks.items() if not ok}
    return Status(
        503,
        ErrorOut(code="service_unavailable", message="A dependency is down.", fields=failing),
    )

from unittest import mock

import pytest
from django.db import OperationalError


@pytest.mark.django_db
def test_health_reports_ok(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok", "database": True, "cache": True}


@pytest.mark.django_db
def test_health_reports_dead_database_with_error_shape(client):
    with mock.patch("common.health.connection.cursor", side_effect=OperationalError):
        res = client.get("/api/health")
    assert res.status_code == 503
    assert res.json() == {
        "code": "service_unavailable",
        "message": "A dependency is down.",
        "fields": {"database": ["unavailable"]},
    }

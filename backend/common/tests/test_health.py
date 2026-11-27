import pytest


@pytest.mark.django_db
def test_health_reports_ok(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok", "database": True, "cache": True}

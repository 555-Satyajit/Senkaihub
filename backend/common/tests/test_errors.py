import pytest


@pytest.mark.django_db
def test_unauthenticated_uses_standard_error_shape(client):
    res = client.get("/api/users/me")
    assert res.status_code == 401
    assert res.json() == {"code": "not_authenticated", "message": "Unauthorized", "fields": None}


@pytest.mark.django_db
def test_unknown_route_returns_404(client):
    assert client.get("/api/does-not-exist").status_code == 404

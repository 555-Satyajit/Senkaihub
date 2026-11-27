import pytest

ERROR_KEYS = {"code", "message", "fields"}


@pytest.mark.django_db
def test_unauthenticated_uses_standard_error_shape(client):
    res = client.get("/api/users/me")
    assert res.status_code == 401
    assert res.json() == {"code": "not_authenticated", "message": "Unauthorized", "fields": None}


def test_unknown_api_route_returns_json_404(client):
    res = client.get("/api/does-not-exist")
    assert res.status_code == 404
    assert res["Content-Type"] == "application/json"
    assert res.json() == {"code": "not_found", "message": "Not Found.", "fields": None}


@pytest.mark.django_db
def test_unsupported_method_returns_json_405_with_allow_header(client):
    res = client.post("/api/users/me")
    assert res.status_code == 405
    assert res["Allow"] == "GET"
    assert res.json()["code"] == "method_not_allowed"
    assert set(res.json()) == ERROR_KEYS


def test_non_api_404_is_left_to_django(client):
    res = client.get("/not-an-api-route")
    assert res.status_code == 404
    assert not res["Content-Type"].startswith("application/json")

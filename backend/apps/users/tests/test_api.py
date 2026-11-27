import pytest

from apps.users.tests.factories import UserFactory


@pytest.mark.django_db
def test_me_returns_current_user(client):
    user = UserFactory()
    client.force_login(user)
    res = client.get("/api/users/me")
    assert res.status_code == 200
    assert res.json()["username"] == user.username


@pytest.mark.django_db
def test_me_requires_login(client):
    assert client.get("/api/users/me").status_code == 401

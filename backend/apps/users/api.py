from ninja import Router
from ninja.security import django_auth

from apps.users.schemas import MeOut
from common.errors import ErrorOut

router = Router(tags=["users"])


@router.get("/me", response={200: MeOut, 401: ErrorOut}, auth=django_auth)
def me(request):
    return request.auth

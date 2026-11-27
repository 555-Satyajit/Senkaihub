from ninja import ModelSchema

from apps.users.models import User


class MeOut(ModelSchema):
    class Meta:
        model = User
        fields = ["id", "username", "email", "date_joined"]

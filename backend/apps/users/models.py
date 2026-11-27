from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom user so profile fields can be added later without a painful migration."""

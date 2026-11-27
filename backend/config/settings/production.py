from .base import *  # noqa: F403

DEBUG = False

# Dokploy terminates TLS at its proxy and forwards the original scheme.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)  # noqa: F405
SECURE_HSTS_SECONDS = env.int("DJANGO_SECURE_HSTS_SECONDS", default=60 * 60 * 24 * 365)  # noqa: F405
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Frontend and API live on sibling subdomains, so cookies are shared on the parent domain.
SESSION_COOKIE_DOMAIN = env("DJANGO_COOKIE_DOMAIN", default=None)  # noqa: F405
CSRF_COOKIE_DOMAIN = SESSION_COOKIE_DOMAIN

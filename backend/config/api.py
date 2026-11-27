"""The single NinjaAPI instance. Every app's router is mounted here."""

from ninja import NinjaAPI

from apps.users.api import router as users_router
from common.errors import register_exception_handlers
from common.health import router as health_router

api = NinjaAPI(
    title="SenkaiHub API",
    version="0.1.0",
    urls_namespace="api",
)

register_exception_handlers(api)

api.add_router("/health", health_router)
api.add_router("/users", users_router)

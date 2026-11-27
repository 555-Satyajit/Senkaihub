"""One error shape for every endpoint: {"code", "message", "fields"}. The frontend relies on it."""

import logging

from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import Http404
from ninja import NinjaAPI, Schema
from ninja.errors import HttpError, ValidationError

logger = logging.getLogger(__name__)


class ErrorOut(Schema):
    code: str
    message: str
    fields: dict[str, list[str]] | None = None


class RuleViolation(Exception):
    """Raised by services when a business rule rejects an action."""

    def __init__(self, code: str, message: str, status: int = 400):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status = status


HTTP_ERROR_CODES = {
    401: "not_authenticated",
    403: "forbidden",
    404: "not_found",
    405: "method_not_allowed",
    429: "throttled",
}


def _field_name(loc) -> str:
    # Body locs look like ("body", "<param>", "field", ...); others like ("query", "field").
    parts = list(loc)[2:] if loc and loc[0] == "body" else list(loc)[1:]
    return ".".join(str(p) for p in parts) or "__all__"


def register_exception_handlers(api: NinjaAPI) -> None:
    def respond(request, status: int, code: str, message: str, fields=None):
        body = ErrorOut(code=code, message=message, fields=fields)
        return api.create_response(request, body.model_dump(), status=status)

    @api.exception_handler(RuleViolation)
    def rule_violation(request, exc: RuleViolation):
        return respond(request, exc.status, exc.code, exc.message)

    @api.exception_handler(ValidationError)
    def validation_error(request, exc: ValidationError):
        fields: dict[str, list[str]] = {}
        for err in exc.errors:
            fields.setdefault(_field_name(err.get("loc", ())), []).append(err.get("msg", ""))
        return respond(request, 422, "validation_error", "Some fields are invalid.", fields)

    @api.exception_handler(HttpError)
    def http_error(request, exc: HttpError):
        code = HTTP_ERROR_CODES.get(exc.status_code, "error")
        return respond(request, exc.status_code, code, str(exc))

    @api.exception_handler(Http404)
    @api.exception_handler(ObjectDoesNotExist)
    def not_found(request, exc):
        return respond(request, 404, "not_found", "Not found.")

    @api.exception_handler(PermissionDenied)
    def permission_denied(request, exc):
        return respond(request, 403, "forbidden", "You do not have permission to do this.")

    @api.exception_handler(Exception)
    def server_error(request, exc):
        logger.exception("Unhandled API error", exc_info=exc)
        return respond(request, 500, "server_error", "Something went wrong.")

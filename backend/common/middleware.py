"""Keeps the shared error shape for API errors that never reach a Ninja handler."""

from http import HTTPStatus

from django.http import JsonResponse

from common.errors import HTTP_ERROR_CODES, ErrorOut

API_PREFIX = "/api/"


class ApiErrorEnvelopeMiddleware:
    """Rewrites non-JSON error responses under /api/ into {code, message, fields}.

    Django answers unresolved URLs (404) and Ninja answers unsupported methods (405)
    directly, so the exception handlers in common.errors never see them.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if (
            not request.path.startswith(API_PREFIX)
            or response.status_code < 400
            or response.get("Content-Type", "").startswith("application/json")
        ):
            return response

        status = response.status_code
        body = ErrorOut(
            code=HTTP_ERROR_CODES.get(status, "error"),
            message=f"{HTTPStatus(status).phrase}.",
        )
        envelope = JsonResponse(body.model_dump(), status=status)
        if "Allow" in response:
            envelope["Allow"] = response["Allow"]
        return envelope

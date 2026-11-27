"""Server-side HTML sanitizing. Services call this before saving any user HTML."""

import nh3

ALLOWED_TAGS = {
    "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "code", "pre",
}  # fmt: skip
ALLOWED_ATTRIBUTES = {"a": {"href", "title"}}
ALLOWED_URL_SCHEMES = {"http", "https", "mailto"}


def sanitize_html(value: str) -> str:
    return nh3.clean(
        value,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        url_schemes=ALLOWED_URL_SCHEMES,
        link_rel="noopener noreferrer nofollow",
    )


def strip_html(value: str) -> str:
    """Remove every tag, keeping only text. Use for usernames, titles, and chat."""
    return nh3.clean(value, tags=set())

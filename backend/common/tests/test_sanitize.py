from common.sanitize import sanitize_html, strip_html


def test_removes_script_tags():
    assert "<script" not in sanitize_html("<p>hi</p><script>alert(1)</script>")


def test_removes_event_handler_attributes():
    assert "onerror" not in sanitize_html('<a href="https://x.dev" onerror="alert(1)">x</a>')


def test_blocks_javascript_urls():
    assert "javascript:" not in sanitize_html('<a href="javascript:alert(1)">x</a>')


def test_adds_safe_rel_to_links():
    assert 'rel="noopener noreferrer nofollow"' in sanitize_html('<a href="https://x.dev">x</a>')


def test_keeps_allowed_formatting():
    assert sanitize_html("<p><strong>bold</strong></p>") == "<p><strong>bold</strong></p>"


def test_strip_html_keeps_text_only():
    assert strip_html("<b>Naruto</b> <i>fan</i>") == "Naruto fan"

FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    DJANGO_SETTINGS_MODULE=config.settings.production

WORKDIR /app

COPY requirements/ requirements/
RUN pip install -r requirements/base.txt

COPY . .
RUN DJANGO_SECRET_KEY=build DATABASE_URL=sqlite:// \
    VALKEY_BROKER_URL=redis:// VALKEY_CACHE_URL=redis:// \
    python manage.py collectstatic --noinput

RUN useradd --create-home app
USER app

EXPOSE 8000
CMD ["uvicorn", "config.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--workers", "2", "--proxy-headers"]

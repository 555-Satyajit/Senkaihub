# SenkaiHub Backend

Django 6.0 + Django Ninja API, PostgreSQL 16, Valkey (broker + cache), Celery.

## Local setup

```bash
# From the repo root: start Postgres (5442) and Valkey (6382)
docker compose -f infra/docker-compose.yml up -d

cd backend
python3 -m venv .venv            # or: python3 -m virtualenv .venv
.venv/bin/pip install -r requirements/dev.txt
cp .env.example .env
.venv/bin/python manage.py migrate
.venv/bin/python manage.py createsuperuser
.venv/bin/python manage.py runserver
```

- API docs: http://localhost:8000/api/docs
- OpenAPI spec (frontend types are generated from this): http://localhost:8000/api/openapi.json
- Admin: http://localhost:8000/admin/
- Health: http://localhost:8000/api/health

Background worker and scheduler:

```bash
.venv/bin/celery -A config worker -l info
.venv/bin/celery -A config beat -l info
```

Valkey runs one instance with two logical databases: db 0 for the Celery broker and db 1 for
the Django cache. Its config is [infra/valkey/valkey.conf](../infra/valkey/valkey.conf). In
production, mount the same file and pass a strong `--requirepass` from a Dokploy secret.

## Checks

```bash
.venv/bin/ruff check . && .venv/bin/ruff format --check .
.venv/bin/pytest
```

## Layout

```text
config/          settings (base/local/test/production), urls, the single NinjaAPI, celery
common/          shared error shape, health check, HTML sanitizing
apps/<domain>/   one Django app per domain: models, schemas, selectors, services,
                 permissions, api, tasks, tests
```

Layer rules live in `.claude/skills/senkaihub-code-standards/references/backend-structure.md`.
Add a new domain app under `apps/`, register it in `INSTALLED_APPS`, and mount its router in `config/api.py`.

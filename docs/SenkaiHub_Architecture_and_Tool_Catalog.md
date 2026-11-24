# SenkaiHub (Anime Clan Social Platform) — Architecture & Open-Source Tool Catalog

> **Date:** November 24, 2026  
> **Target Deployment:** Hostinger KVM 2 VPS (2 vCPU, 8 GB RAM, 100 GB NVMe SSD)  
> **Core Architecture:** Next.js (TypeScript) + Django (Django Ninja) + PostgreSQL + Redis + Dokploy

---

## 1. Executive Summary & Core Concept

**SenkaiHub** is a gamified anime social platform organized around **factions (Clans)**, **Progress-Gated Spoiler Vaults**, **Community Clan Wars** (art, singing, cosplay contests), and an **Anime/Manga Tracker Sync** (AniList / MyAnimeList).

### The Primary Differentiators:
1. **Progress-Gated Spoiler Vaults:** Discussion threads locked dynamically based on the user's synced watching progress (e.g., Episode 12+ thread unlocks only when tracked).
2. **Clan Wars & Creative Competitions:** Weekly community contests where artists and creators earn victory points and badges for their clan.
3. **Hall of Fame:** Daily, weekly, and seasonal tier-based recognition for top creative talent.

---

## 2. Selected Architecture & Tech Stack

```
                          ┌──────────────────────────────────────────────┐
                          │             Hostinger KVM 2 VPS              │
                          │   (PaaS: Dokploy / Reverse Proxy: Traefik)   │
                          └──────────────┬────────────────┬──────────────┘
                                         │                │
                    ┌────────────────────▼──┐          ┌──▼──────────────────┐
                    │   Next.js Frontend    │          │   Django Backend    │
                    │   (App Router, TS)    │          │    (Django Ninja)   │
                    └───────────────────────┘          └──────────┬──────────┘
                                                                  │
                                             ┌────────────────────┼───────────────────┐
                                             │                    │                   │
                                      ┌──────▼──────┐      ┌──────▼──────┐     ┌──────▼──────┐
                                      │  PostgreSQL │      │    Redis    │     │   Celery    │
                                      │ (Container) │      │   (Cache)   │     │  (Workers)  │
                                      └─────────────┘      └─────────────┘     └─────────────┘
                                                                  │
                                                           ┌──────▼──────┐
                                                           │Cloudflare R2│
                                                           │ (0 Egress)  │
                                                           └─────────────┘
```

### Stack Division:
* **Frontend:** Next.js (App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query).
* **Backend:** Python + Django with **Django Ninja** (type-safe REST endpoints + automatic OpenAPI Swagger specs).
* **Database & Cache:** Self-hosted PostgreSQL 16 & Redis running as managed Docker containers inside **Dokploy**.
* **Object Storage:** **Cloudflare R2** (S3-compatible, 10 GB free, $0 egress bandwidth fees).

---

## 3. Complete Master Inventory of 32 Open-Source Tools

The tools discussed across idea validation and technical planning, grouped into 8 domains and categorized by implementation priority.

---

### Category 1: Core Frameworks & Runtimes (6 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 1 | **Next.js (App Router)** | MIT | Full-stack React framework for high-performance pages, client-side routing, and server-side metadata generation for Twitter/Discord preview cards. | **Must-Have (Day 1)** |
| 2 | **Django** | BSD-3 | Core Python backend framework providing robust ORM, migrations, user auth, and the built-in Django Admin portal. | **Must-Have (Day 1)** |
| 3 | **Django Ninja** | MIT | Fast, type-safe REST API framework for Django (FastAPI style) with automatic OpenAPI/Swagger documentation. | **Must-Have (Day 1)** |
| 4 | **Fastify** | MIT | High-throughput Node.js micro-framework evaluated for extreme raw JSON serialization and low-overhead HTTP performance. | Reference / Alternative |
| 5 | **NestJS** | MIT | Enterprise-grade TypeScript framework evaluated for modular OOP architecture and dependency injection. | Reference / Alternative |
| 6 | **Phoenix (Elixir)** | Apache-2.0 | High-concurrency Erlang BEAM framework and LiveView engine evaluated for massive-scale WebSocket persistence. | Reference / Alternative |

---

### Category 2: Databases, Caching & Search (4 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 7 | **PostgreSQL 16** | PostgreSQL | Battle-tested relational database for users, clans, vaults, posts, comments, and tournament match records. | **Must-Have (Day 1)** |
| 8 | **Redis (or Valkey)** | BSD-3 | In-memory key-value cache and message broker for Celery background tasks, session rate-limiting, and feed caching. | **Must-Have (Day 1)** |
| 9 | **Typesense** | GPL-3.0 | Modern, typo-tolerant search-as-you-type engine designed to search thousands of anime titles, clans, and tags instantly. | Nice-to-Have (Phase 2) |
| 10 | **Meilisearch** | MIT | Alternative open-source, developer-friendly search engine with custom ranking rules and instant indexing. | Nice-to-Have (Phase 2) |

---

### Category 3: Deployment, Hosting & Infrastructure (4 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 11 | **Dokploy** | MIT | Lightweight self-hosted PaaS on the Hostinger VPS. Manages Docker containers, auto-SSL certificates, and GitHub push-to-deploy. | **Must-Have (Day 1)** |
| 12 | **Coolify** | Apache-2.0 | Alternative self-hosted PaaS platform with 1-click application, database, and service templates. | Reference / Alternative |
| 13 | **Docker & Docker Compose** | Apache-2.0 | Containerization engine ensuring consistent local and production deployment environments across team members. | **Must-Have (Day 1)** |
| 14 | **Caddy** | Apache-2.0 | Fast reverse proxy web server with zero-config automatic HTTPS and Let's Encrypt SSL certificate provisioning. | Nice-to-Have (Alternative) |

---

### Category 4: Anime Data, Auth & Tracker Sync (3 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 15 | **Jikan** | MIT | Unofficial open-source MyAnimeList REST API for pulling anime/manga metadata, airing times, and character art. | **High Value (Day 1)** |
| 16 | **django-allauth** | MIT | Comprehensive authentication suite handling user registration, login, and OAuth2 linking (AniList, Discord, Google). | **Must-Have (Day 1)** |
| 17 | **httpx** | BSD-3 | High-performance async/sync Python HTTP client used to query the AniList GraphQL API and fetch user watchlists. | **Must-Have (Day 1)** |

---

### Category 5: Media, Uploads & Image Processing (5 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 18 | **Uppy** | Apache-2.0 | Client-side file uploader that pushes high-res art/cosplay directly to Cloudflare R2, bypassing VPS RAM and bandwidth. | **Must-Have (Day 1)** |
| 19 | **Pillow (PIL)** | HPND | Python image processing library to resize avatars, validate dimensions, and convert images to WebP format. | **Must-Have (Day 1)** |
| 20 | **Blurhash** | MIT | Encodes images into compact strings for smooth placeholder blurs and spoiler-blurred overlays before reveal. | **High Value (Day 1)** |
| 21 | **imagehash** | BSD-2 | Perceptual image hashing in Python to detect duplicate or stolen fan art submissions in Clan Wars. | Nice-to-Have (Phase 2) |
| 22 | **django-cleanup** | MIT | Automatically deletes orphaned image files from Cloudflare R2 storage whenever a database model is deleted. | **Must-Have (Day 1)** |

---

### Category 6: Clan Wars, Gaming & Anti-Fraud (3 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 23 | **bracket-creator / tournament-organizer** | MIT | Algorithmic generator for single-elimination, double-elimination, and round-robin tournament brackets. | **High Value (Phase 2)** |
| 24 | **FingerprintJS (OSS)** | BSL-1.1 / MIT | Client-side browser fingerprinting to prevent vote-brigading and multi-account contest manipulation. | **High Value (Phase 2)** |
| 25 | **django-gamification** | MIT | Progression framework for tracking clan XP, user levels, streaks, and unlockable achievement badges. | Nice-to-Have (Phase 2) |

---

### Category 7: UI, Rich Text & Social Virality (4 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 26 | **Tailwind CSS** | MIT | Utility-first CSS framework for custom dark-mode anime styling and clan faction branding. | **Must-Have (Day 1)** |
| 27 | **shadcn/ui** | MIT | Reusable, accessible UI component primitives (dialogs, dropdowns, tabs, avatars) copied directly into the project. | **Must-Have (Day 1)** |
| 28 | **Tiptap** | MIT | Extensible headless rich-text editor for user posts, supporting inline spoiler text tags (`||spoiler||`). | **Must-Have (Day 1)** |
| 29 | **Satori (@vercel/og)** | Apache-2.0 | Converts HTML/CSS into dynamic victory share cards (scores, clan crests, artist winners) for sharing on Twitter/Discord. | **High Value (Phase 2)** |

---

### Category 8: Notifications, Tasks & Background Scheduling (3 tools)

| # | Tool | License | Description / Purpose | Priority |
|---|------|---------|-----------------------|----------|
| 30 | **Celery** | BSD-3 | Distributed background task queue for executing AniList syncs and contest tallying asynchronously. | **Must-Have (Day 1)** |
| 31 | **Ofelia** | MIT | Docker-native job scheduler to execute periodic cron commands (closing weekly wars, resetting leaderboards). | **High Value (Phase 2)** |
| 32 | **Novu** | Apache-2.0 | Open-source notification infrastructure providing in-app bell notification feeds and web push alerts. | Nice-to-Have (Phase 3) |

---

## 4. Implementation Phasing & Milestones

### Phase 1: Core Foundation (Weeks 1–3)
- [ ] Initialize GitHub repository with Next.js frontend and Django backend.
- [ ] Install **Dokploy** on the Hostinger KVM 2 VPS; provision PostgreSQL 16 & Redis containers.
- [ ] Configure `django-allauth` with AniList OAuth2 authentication.
- [ ] Define PostgreSQL models: `User`, `Clan`, `ClanMember`, `AnimeTracker`, `SpoilerVault`, `Post`, `Comment`.
- [ ] Implement direct uploads to Cloudflare R2 using **Uppy** and pre-signed S3 URLs.

### Phase 2: Game Loop & Spoiler Vaults (Weeks 4–6)
- [ ] Implement background AniList synchronization using **Celery** + `httpx`.
- [ ] Build the **Progress-Gated Spoiler Vault** access check (`current_episode >= thread.min_episode`).
- [ ] Integrate **Blurhash** for image placeholders and spoiler blurs.
- [ ] Add **Tiptap** editor with inline spoiler tags.

### Phase 3: Clan Wars & Hall of Fame (Weeks 7–9)
- [ ] Integrate tournament bracket generation (`bracket-creator`).
- [ ] Implement voting logic with anti-brigade controls (**FingerprintJS**).
- [ ] Implement weekly contest resolution with **Ofelia** cron jobs.
- [ ] Setup dynamic victory share cards using **Satori**.

# Local development (no Docker)

This repository is a **microservices monorepo**:

- Services live in `apps/*`
- Shared packages live in `shared/*`

Each service runs as a standalone NestJS app and loads env files from its **own folder**:

- `apps/<service>/.env`
- `apps/<service>/.env.local` (optional override)

## Prerequisites

- Node.js + npm
- PostgreSQL (recommended: one database per service)
- Redis
- Kafka (required for event-driven flows)

> Tip: you can run infra via Docker if you want, but the steps below assume you are running infra normally (installed services / managed services / WSL services).

## Quick start

### 1) Install dependencies

```bash
npm install
```

### 2) Create env files per service

Copy the templates:

- `apps/auth-service/.env.example` → `apps/auth-service/.env`
- `apps/comic-service/.env.example` → `apps/comic-service/.env`
- `apps/config-service/.env.example` → `apps/config-service/.env`
- `apps/iam-service/.env.example` → `apps/iam-service/.env`
- `apps/notification-service/.env.example` → `apps/notification-service/.env`
- `apps/post-service/.env.example` → `apps/post-service/.env`
- `apps/storage-service/.env.example` → `apps/storage-service/.env`
- `apps/web-api-service/.env.example` → `apps/web-api-service/.env`
- `apps/marketing-service/.env.example` → `apps/marketing-service/.env`
- `apps/introduction-service/.env.example` → `apps/introduction-service/.env`

Minimum values to review/replace:

- `DATABASE_URL` (PostgreSQL) — only for services that have Prisma
- `REDIS_URL` — for services that use Redis
- `KAFKA_BROKERS` and `EVENT_DRIVER`
- `AUTH_JWKS_URL` — for JWT consumer services (points to auth-service)
- `INTERNAL_API_SECRET` — should be the **same** across services

### 3) Create databases

The `.env.example` files default to using different local ports:

- auth: `5433/auth_db`
- comic: `5434/comic_db`
- notification: `5435/notification_db`
- config: `5436/config_db`
- post: `5438/post_db`
- introduction: `5439/introduction_db`
- marketing: `5440/marketing_db`
- iam: `5441/iam_db`

You can keep this “one DB per service” model, or point them all to the same Postgres server and just use different databases/schemas.

### 4) Run migrations

Run per service:

```bash
npm -w apps/auth-service run prisma:migrate
npm -w apps/comic-service run prisma:migrate
npm -w apps/config-service run prisma:migrate
npm -w apps/iam-service run prisma:migrate
npm -w apps/notification-service run prisma:migrate
npm -w apps/post-service run prisma:migrate
npm -w apps/introduction-service run prisma:migrate
npm -w apps/marketing-service run prisma:migrate
```

### 5) Start

Start all services (uses `concurrently`):

```bash
npm run start
```

Or start a subset:

```bash
npm -w apps/auth-service run start:dev
npm -w apps/web-api-service run start:dev
```

## Smoke checks

If you have bash + curl available:

```bash
./scripts/smoke/service-health.sh http://localhost
```

## Common pitfalls

- Root `.env` is ignored by git and is **not** the source of truth for services in this monorepo. Use `apps/<service>/.env`.
- Prisma datasources are **PostgreSQL** in this repo. A MySQL `DATABASE_URL` will not work with the current Prisma schemas.
- Some auth flows require `EVENT_DRIVER=kafka` so events can be consumed by `notification-service`.


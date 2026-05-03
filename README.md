# Backend (NestJS + Prisma) — Microservices Monorepo

This is a modern, high-performance backend application built with **NestJS**, following **DDD (Domain-Driven Design)** and **Hexagonal Architecture** principles.

## 🚀 Key Features

- **DDD Architecture**: Structured into Domain, Infrastructure, and Application layers.
- **Repository Pattern**: Database-agnostic data access using Prisma.
- **Multi-Tenant RBAC**: Strict context-based authorization (System Admin vs. Group Admin).
- **Core Modules**: Comics management, Content CMS (Posts, Categories), User Identity, and Storage.
- **Automated Workflows**: Integrated with AI Agent instructions for consistent development.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (one DB per service)
- **Caching**: Redis
- **Auth**: Passport JWT
- **Container**: Docker & Docker Compose

## 📦 Installation

```bash
# 1. Clone & Install
npm install
```

## 🧑‍💻 Local Development (no Docker)

This repo is a **monorepo** with 10 services under `apps/*` plus shared packages under `shared/*`.
Each service reads environment files from **its own working directory**:

- `.env` / `.env.local` **inside** `apps/<service>/` (NOT the repo root)

### Prerequisites (local)

- Node.js + npm
- PostgreSQL (one database per service)  
- Redis (recommended: one instance per service; can be shared for dev if you adjust ports/URLs)
- Kafka (required for flows that publish events, e.g. auth → notification)

### Minimal “it runs” path

1) Install dependencies:

```bash
npm install
```

2) Create env files per service:

- Copy each `apps/<service>/.env.example` → `apps/<service>/.env`
- Adjust:
  - `DATABASE_URL` (PostgreSQL)
  - `REDIS_URL` (if used by the service)
  - `KAFKA_BROKERS` (if `EVENT_DRIVER=kafka`)
  - `AUTH_JWKS_URL` for JWT consumers (points to auth-service)
  - `INTERNAL_API_SECRET` (same value across services)

3) Run database migrations per service that has Prisma migrations:

```bash
npm -w apps/auth-service run prisma:migrate
npm -w apps/comic-service run prisma:migrate
# ...repeat for other DB-backed services...
```

4) Start services:

```bash
npm run start
```

If you only need the public gateway + auth for quick smoke testing, start just:

```bash
npm -w apps/auth-service run start:dev
npm -w apps/web-api-service run start:dev
```

## 🐳 Docker Deployment (optional)

```powershell
docker compose --env-file .env.docker up --build
```

## 🚀 Production Deployment

This project is **production-ready** with comprehensive monitoring, security, and operational features.

### Quick Production Check
```bash
# Run production readiness check
./scripts/production-ready-check.sh

# Or run individual checks
./scripts/check-env.sh                    # Environment validation
./scripts/smoke/service-health.sh         # Health checks
./scripts/smoke/basic-load-test.sh        # Load testing
```

### Production Features
- ✅ **Health Checks**: `/api/v1/health`, `/api/v1/health/ready`
- ✅ **Metrics**: Prometheus `/api/v1/metrics` on all services
- ✅ **Structured Logging**: JSON logs with correlation IDs
- ✅ **Graceful Shutdown**: Kafka consumer drain, connection cleanup
- ✅ **Idempotency**: Cross-replica deduplication with Redis
- ✅ **Security**: Rate limiting, CORS, JWT rotation, secrets management
- ✅ **Monitoring**: K8s templates, Prometheus alerts, runbooks
- ✅ **CI/CD**: Automated deployment with rollback

### Deployment Guide
See:

- `docs/deploy/PRODUCTION_DEPLOYMENT.md`
- `docs/deploy/PRODUCTION_READINESS_PLAN.md`
- `docs/deploy/MULTI_HOST_PRODUCTION.md` (10 services / 10 targets, independent deploy/rollback)
- `infrastructure/k8s/README.md` (k8s templates)
- `docs/RUNBOOK.md` and `docs/MIGRATIONS.md` (operations)

## 🤖 AI Agent Integration

This project is optimized for AI-assisted development. We use the `.agent/` directory to store project-specific context, rules, and workflows.

- **Instructions**: [instructions.md](./.agent/instructions.md)
- **Architecture Rules**: [architecture.md](./.agent/rules/architecture.md)
- **CRUD Workflows**: [feature-crud-list.md](./.agent/workflows/feature-crud-list.md)
- **New Module Workflow**: Run `/create-module` if using a compatible AI agent.

## 📑 Documentation

Core docs live in `docs/` (how to run, migrate, operate, deploy). Development conventions and AI workflows live in `.agent/`.

# Production Deployment Guide (Single-Host / Compose)

This guide documents **single-host deployment via Docker Compose** using `.env.docker`.
If you run 10 services on 10 targets with independent deploy/rollback, use:

- `docs/deploy/MULTI_HOST_PRODUCTION.md`

## Prerequisites

- Docker & Docker Compose installed
- At least 8GB RAM, 4 CPU cores recommended
- Public domain + SSL/TLS (or a reverse proxy in front)

## Environment Setup

1. **Copy environment template:**

```bash
cp .env.docker.example .env.docker
```

2. **Set required secrets (compose will fail-fast if missing):**

Required by `scripts/check-env.sh` and `docker-compose.yml`:

- `POSTGRES_PASSWORD` (≥ 16 chars)
- `INTERNAL_API_SECRET` (≥ 32 chars)
- `JWT_PRIVATE_KEY_PEM`, `JWT_PUBLIC_KEY_PEM` (RSA PEM)

Recommended to set for production correctness:

- `CORS_ORIGINS` (explicit allowlist, never `*`)
- `KAFKA_BROKERS` (defaults to `kafka:9092` in docker)
- Storage configuration when `STORAGE_TYPE=s3`

3. **Validate environment:**

```bash
./scripts/check-env.sh --env-file .env.docker
```

## Deployment Steps

1. **Build and start services:**

```bash
docker compose --env-file .env.docker up -d --build
```

2. **Smoke test (health + metrics + JWKS):**

```bash
./scripts/smoke/service-health.sh http://localhost
```

3. **Basic load test (optional, requires `ab` / ApacheBench):**

```bash
./scripts/smoke/basic-load-test.sh http://localhost 10 100
```

## Monitoring & health

- Metrics: `GET /api/v1/metrics` on every service port
- Health:
  - `GET /api/v1/health`
  - `GET /api/v1/health/ready`
- JWKS (auth-service): `GET /.well-known/jwks.json` (note: no `/api/v1` prefix)

## Troubleshooting

### Services won't start

```bash
docker compose --env-file .env.docker logs <service-name>
./scripts/check-env.sh --env-file .env.docker
```

### Health checks failing

```bash
curl http://localhost:3002/api/v1/health
curl http://localhost:3002/api/v1/health/ready
```

## Backups & migrations

See:

- `docs/RUNBOOK.md`
- `docs/MIGRATIONS.md`


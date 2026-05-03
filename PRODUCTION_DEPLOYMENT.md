# Production Deployment Guide

## Prerequisites

- Docker & Docker Compose installed
- At least 8GB RAM, 4 CPU cores recommended
- PostgreSQL, Redis, Kafka, MinIO accessible
- Domain name with SSL certificate

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.docker.example .env.docker
   ```

2. **Configure required variables:**
   ```bash
   # Database
   POSTGRES_PASSWORD=<strong-password-min-16-chars>
   POSTGRES_HOST=<your-postgres-host>
   POSTGRES_PORT=5432

   # Redis
   REDIS_HOST=<your-redis-host>
   REDIS_PORT=6379
   REDIS_PASSWORD=<redis-password>

   # Kafka
   KAFKA_BROKERS=<your-kafka-brokers>
   KAFKA_GROUP_ID=<unique-group-id>

   # JWT Keys (generate with scripts/generate-keys.sh)
   JWT_PRIVATE_KEY_PEM=<private-key-pem>
   JWT_PUBLIC_KEY_PEM=<public-key-pem>

   # Internal API Secret (32+ chars)
   INTERNAL_API_SECRET=<strong-random-secret>

   # MinIO/S3
   STORAGE_S3_ENDPOINT=<minio-endpoint>
   STORAGE_S3_ACCESS_KEY_ID=<access-key>
   STORAGE_S3_SECRET_ACCESS_KEY=<secret-key>

   # Email (optional)
   SMTP_HOST=<smtp-host>
   SMTP_PORT=587
   SMTP_USER=<smtp-user>
   SMTP_PASS=<smtp-password>

   # CORS
   CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

3. **Validate environment:**
   ```bash
   ./scripts/check-env.sh
   ```

## Deployment Steps

1. **Build and start services:**
   ```bash
   docker compose up -d --build
   ```

2. **Run database migrations:**
   ```bash
   # Migrations run automatically via entrypoint.sh
   # Monitor logs to ensure they complete
   docker compose logs -f | grep -i migrate
   ```

3. **Run smoke tests:**
   ```bash
   ./scripts/smoke/service-health.sh
   ```

4. **Run basic load test:**
   ```bash
   ./scripts/smoke/basic-load-test.sh http://your-host 10 100
   ```

## Monitoring Setup

1. **Prometheus metrics are exposed at:**
   - `http://your-host:3001/api/v1/metrics` (web-api)
   - `http://your-host:3002/api/v1/metrics` (auth)
   - And so on for all services...

2. **Health endpoints:**
   - `/api/v1/health` - liveness
   - `/api/v1/health/ready` - readiness

3. **Configure Prometheus:**
   ```yaml
   # Add to prometheus.yml
   - job_name: 'comic-platform'
     static_configs:
       - targets: ['your-host:3001', 'your-host:3002', ...]
     metrics_path: /api/v1/metrics
   ```

## Security Checklist

- [ ] All secrets are 32+ characters
- [ ] CORS_ORIGINS is explicit (not "*")
- [ ] JWT keys are properly generated
- [ ] Database passwords are strong
- [ ] Internal API secret is random
- [ ] No hardcoded credentials in code
- [ ] SSL/TLS enabled
- [ ] Rate limiting configured
- [ ] Audit logs enabled

## Troubleshooting

### Services won't start
```bash
# Check logs
docker compose logs <service-name>

# Check environment
./scripts/check-env.sh

# Check database connectivity
docker compose exec auth-service npx prisma db push --preview-feature
```

### Health checks failing
```bash
# Test individual endpoints
curl http://localhost:3002/api/v1/health

# Check database connection
docker compose exec auth-service npx prisma studio
```

### High memory usage
- Increase Docker memory limit to 8GB+
- Scale down replica count if needed
- Monitor with Prometheus metrics

## Backup Strategy

```bash
# Database backup
./scripts/backup-databases.sh

# Schedule with cron:
# 0 2 * * * /path/to/scripts/backup-databases.sh
```

## Scaling

### Horizontal scaling
```bash
# Scale specific services
docker compose up -d --scale auth-service=3 --scale web-api-service=2
```

### Vertical scaling
- Increase CPU/memory limits in docker-compose.yml
- Use Kubernetes for auto-scaling (see infrastructure/k8s/)

## Rollback

If deployment fails:
```bash
# Stop current deployment
docker compose down

# Revert to previous version
git checkout <previous-commit>
docker compose up -d --build
```
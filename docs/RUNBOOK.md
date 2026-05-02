# Operations Runbook — Comic Platform

This runbook is the on-call cheat sheet. Keep it current.

## Service map

| Service | Port | DB | Redis | Kafka role |
|---------|-----:|----|-------|-----------|
| auth-service | 3002 | auth-db | auth-redis | producer (outbox) |
| comic-service | 3001 | comic-db | comic-redis | producer (outbox) |
| notification-service | 3004 | notification-db | notification-redis | consumer |
| post-service | 3007 | post-db | post-redis | producer (outbox) |
| web-api-service | 3006 | — | web-api-redis | — |
| iam-service | 3008 | iam-db | iam-redis | — |
| storage-service | 3003 | — | — | — |
| config-service | 3005 | config-db | — | — |
| introduction-service | 3010 | introduction-db | — | — |
| marketing-service | 3009 | marketing-db | — | producer (outbox) |

## Health endpoints

Every service exposes:
- `GET /api/health` — liveness (process is up)
- `GET /api/health/live` — alias
- `GET /api/health/ready` — readiness (DB + Redis reachable)

LB / k8s probes hit `/api/health/ready`. A `503` means the service is alive
but cannot serve traffic — usually DB or Redis is down.

## Quick triage

### "Service unreachable from frontend"
1. `curl http://<host>:<port>/api/health` → if 200, app is up; problem is upstream (Nginx, DNS)
2. `curl http://<host>:<port>/api/health/ready` → if 503, check DB/Redis connectivity
3. Check pm2 / `kubectl get pods -n comic-platform` → look for CrashLoopBackOff
4. Tail logs: `pm2 logs <service>` or `kubectl logs deploy/<service>`

### "Logins failing"
- Likely auth-service or its DB. Check:
  - `curl auth-service:3002/api/health/ready`
  - `psql` to `auth-db`: any locks / dead tuples?
  - Throttler triggering? Logs show `ThrottlerException`
  - Google OAuth: `GOOGLE_CLIENT_ID` set? Callback URL matches the one in Google Console?

### "Notifications not arriving"
- notification-service consumes `mail.send`, `comic.chapter.published`, etc.
- Check Kafka consumer lag (Prometheus alert `KafkaConsumerLagHigh`)
- Check `*.dlq` topics — if growing, a handler is crashing repeatedly. See `kafka.service.ts:shipToDlq` for envelope format.
- Inspect DLQ:
  ```
  docker exec comic-kafka kafka-console-consumer \
    --bootstrap-server kafka:9092 --topic mail.send.dlq --from-beginning --max-messages 5
  ```

### "Database connections exhausted" (alert PostgresConnectionsExhausted)
- Total connections = sum across services. With current pool=5 per service × 8 DB-backed services × N replicas → cap at maxConnections (default 100).
- Quick fix: `kubectl scale deploy/<service> --replicas=N-1` to drop replicas
- Permanent fix: add PgBouncer in front (transaction mode), drop service `connection_limit` to 1

## Deploy

### Push deploy (current — VPS via pm2)
1. Push to `master` → `.github/workflows/deploy.yml` runs:
   - `git reset --hard origin/master`
   - `npm ci && npm run build:shared && npm run prisma:generate && npm run build:apps`
   - `prisma migrate deploy` per service that has a schema
   - `pm2 reload ecosystem.config.js --update-env`
   - Health check `auth-service:3002/api/health` → auto-rollback to previous SHA if fail

### Manual rollback (last resort)
```bash
ssh <vps>
cd /var/www/thuelai2
git log --oneline -10                      # find target SHA
git reset --hard <sha>
npm ci && npm run build:shared && npm run build:apps
pm2 reload ecosystem.config.js --update-env
```

### Docker / k8s deploy (future)
See `infrastructure/k8s/README.md`. Image build: `docker build -f infrastructure/docker/Dockerfile.service --build-arg SERVICE_NAME=auth-service --build-arg SERVICE_PORT=3002 -t auth-service:<tag> .`

## Database migrations

- Migrations live at `apps/<svc>/prisma/migrations/`
- Apply with: `npx prisma migrate deploy --schema=apps/<svc>/prisma/schema.prisma --skip-generate`
- The Docker entrypoint (`infrastructure/docker/entrypoint.sh`) runs this on every container start. Set `SKIP_MIGRATIONS=1` to bypass (e.g., read-only replicas).
- Rollback: Prisma doesn't generate down-migrations. To roll back, write a new forward migration that reverses the change, OR restore from a pre-migration `pg_dump`.

## Backups

- Cron: `scripts/backup-databases.sh` runs nightly at 02:30
- Output: `/var/backups/comic-platform/yyyy-mm-dd/<db>.sql.gz`
- Retention: 7 daily + 4 weekly + 12 monthly
- Test restore quarterly:
  ```bash
  gunzip -c /var/backups/comic-platform/2026-05-03/comic_db.sql.gz \
    | pg_restore -h localhost -U postgres -d comic_db_restore_test
  ```

## Secrets & key rotation

### Rotate JWT signing keys (zero downtime)
1. Generate new key pair:
   ```
   openssl genrsa -out private-new.pem 2048
   openssl rsa -in private-new.pem -pubout -out public-new.pem
   ```
2. Move CURRENT → PREVIOUS in env, install NEW as CURRENT:
   - `JWT_PRIVATE_KEY_PEM_PREVIOUS` ← old `JWT_PRIVATE_KEY_PEM`
   - `JWT_PUBLIC_KEY_PEM_PREVIOUS` ← old `JWT_PUBLIC_KEY_PEM`
   - `JWT_PRIVATE_KEY_PEM` ← new private
   - `JWT_PUBLIC_KEY_PEM` ← new public
3. Redeploy auth-service. JWKS now exposes both kids; sign with the new one.
4. Wait for max(`JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`) — 7 days by default.
5. Remove `*_PREVIOUS` env vars and redeploy.

### Rotate INTERNAL_API_SECRET
- Multi-key not implemented yet — this is a single-secret rotation, expect a brief 5xx burst when secrets are out of sync between services.
- Mitigation: rotate during low traffic. Update all 10 services concurrently.

## Incident response checklist

- [ ] Acknowledge alert / page within 5 min
- [ ] Identify affected service(s): `kubectl get pods` / pm2 status
- [ ] Check recent deploys: `git log --oneline -5` — was there a deploy in last 30 min?
- [ ] If yes: rollback first, investigate later
- [ ] If no: tail logs, check DB/Redis connectivity, check upstream (Kafka, JWKS)
- [ ] Communicate: post status in #incidents channel
- [ ] After resolution: write a brief post-mortem (what happened, why, prevention)

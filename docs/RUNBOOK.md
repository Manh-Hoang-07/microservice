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
- `GET /api/v1/health` — liveness (process is up)
- `GET /api/v1/health/live` — alias
- `GET /api/v1/health/ready` — readiness (DB + Redis reachable)

LB / k8s probes hit `/api/v1/health/ready`. A `503` means the service is alive
but cannot serve traffic — usually DB or Redis is down.

## Quick triage

### "Service unreachable from frontend"
1. `curl http://<host>:<port>/api/v1/health` → if 200, app is up; problem is upstream (Nginx, DNS)
2. `curl http://<host>:<port>/api/v1/health/ready` → if 503, check DB/Redis connectivity
3. Check pm2 / `kubectl get pods -n comic-platform` → look for CrashLoopBackOff
4. Tail logs: `pm2 logs <service>` or `kubectl logs deploy/<service>`

### "Logins failing"
- Likely auth-service or its DB. Check:
  - `curl auth-service:3002/api/v1/health/ready`
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
   - Health check `auth-service:3002/api/v1/health` → auto-rollback to previous SHA if fail

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

## SMTP credentials — encrypt-at-rest plan

Currently config-service stores SMTP host/user/password in `config_db` as
plaintext columns. That's adequate for a single-tenant deploy with disk
encryption but it is NOT defense in depth.

**Short-term mitigation** (zero code change): set the underlying volume to
encrypted (LUKS / EBS-encrypted / GCE customer-managed encryption keys) and
restrict `psql` access. Document who has direct DB read access.

**Better** (small code change): encrypt the SMTP password column with
`pgcrypto`. Migration sketch:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE email_config ADD COLUMN password_encrypted bytea;
UPDATE email_config SET password_encrypted = pgp_sym_encrypt(password, current_setting('app.smtp_key'));
ALTER TABLE email_config DROP COLUMN password;
```
Set `app.smtp_key` from a secrets manager at boot via `ALTER SYSTEM` or
session-level `SET LOCAL`. Update `EmailConfigRepository` to read with
`pgp_sym_decrypt(password_encrypted, current_setting('app.smtp_key'))`.

**Best** (eliminates DB exposure): move SMTP creds out of `config_db`
entirely. Store them in Vault / AWS Secrets Manager and have
notification-service read directly. The `config-service` then only stores
non-sensitive metadata (which sender alias, rate limit, etc.).

## Dev / prod parity

The dev startup runs services with `ts-node` (`npm run start`). Production
runs compiled output (`node dist/main.js` via the Dockerfile or pm2 with
`-r tsconfig-paths/register`).

Bugs that surface only at compile time (type errors that ts-node-transpile
silently ignores, decorator metadata reflection, path resolution) won't
appear in dev. Two mitigations:

1. **CI runs `npm run build`** on every PR (already wired in
   `.github/workflows/ci.yml`). Compile-only bugs fail there before merge.
2. **Optionally run dev as compiled** for higher fidelity:
   ```bash
   npm run build && \
     pm2 start ecosystem.config.js
   ```
   Slower iteration, but matches prod exactly. Recommended before any
   high-risk merge.

## End-to-end smoke test

After ANY non-trivial change (Dockerfile, JWT keys, Kafka, idempotency,
CORS, etc.) the smoke path below MUST pass before merging to master.

```bash
# 1. Bring up infra
docker compose --env-file .env.docker up -d zookeeper kafka kafka-ui \
  auth-db comic-db notification-db config-db post-db introduction-db \
  marketing-db iam-db auth-redis comic-redis notification-redis post-redis \
  web-api-redis iam-redis jaeger

# 2. Wait for healthchecks
docker compose ps | grep -v healthy && echo "Some service unhealthy" && exit 1

# 3. Bring up the apps
docker compose --env-file .env.docker up -d --build

# 4. Verify each service responds on /api/v1/health
for port in 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010; do
  curl -fsS "http://localhost:$port/api/v1/health" >/dev/null \
    && echo "✓ :$port" || echo "✗ :$port"
done

# 5. Verify metrics endpoint exposed
curl -s http://localhost:3002/api/v1/metrics | grep -q app_http_requests_total \
  && echo "✓ metrics" || echo "✗ metrics"

# 6. Verify JWKS endpoint (NOT prefixed with /api/v1)
curl -fsS http://localhost:3002/.well-known/jwks.json | jq .keys[0].kid

# 7. Verify service health, metrics, and JWKS
bash scripts/smoke/service-health.sh

# 8. Tear down
docker compose down
```

## Incident response checklist

- [ ] Acknowledge alert / page within 5 min
- [ ] Identify affected service(s): `kubectl get pods` / pm2 status
- [ ] Check recent deploys: `git log --oneline -5` — was there a deploy in last 30 min?
- [ ] If yes: rollback first, investigate later
- [ ] If no: tail logs, check DB/Redis connectivity, check upstream (Kafka, JWKS)
- [ ] Communicate: post status in #incidents channel
- [ ] After resolution: write a brief post-mortem (what happened, why, prevention)

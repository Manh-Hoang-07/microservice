# Kế hoạch đưa hệ thống lên Production

> **Trạng thái hiện tại**: Demo chạy được — code quality khá, nhưng operational readiness yếu.
> **Mục tiêu**: Đẩy hệ thống lên production an toàn, có khả năng vận hành ổn định.
> **Ước tính tổng**: ~2–3 tuần cho 1 dev full-time, hoặc 4–5 tuần part-time.

---

## Tổng quan các giai đoạn

| Giai đoạn | Mục tiêu | Thời gian | Mức độ |
|-----------|----------|-----------|--------|
| **Phase 0** | Dọn dẹp & chuẩn bị | 1 ngày | Bắt buộc |
| **Phase 1** | Fix 7 blockers | 5–7 ngày | Bắt buộc trước khi prod |
| **Phase 2** | Operational readiness | 5–7 ngày | Bắt buộc trước khi prod |
| **Phase 3** | Hardening & polish | 3–5 ngày | Nên có |
| **Phase 4** | Triển khai & verify | 2–3 ngày | Bắt buộc |

---

## Phase 0 — Dọn dẹp & chuẩn bị (1 ngày)

Trước khi sửa gì lớn, làm sạch repo và xác lập baseline.

### 0.1 Dọn dẹp git & generated files
- [ ] Thêm vào `.gitignore`:
  ```
  apps/*/src/generated/
  apps/*/dist/
  *.tsbuildinfo
  auth-service@*
  comic-platform@*
  npm
  prisma
  ```
- [ ] Xóa các file rác đang tracked: `auth-service@1.0.0`, `comic-platform@2.0.0`, `npm`, `prisma` ở root
- [ ] `git rm -r --cached apps/*/src/generated/prisma/` — bỏ generated Prisma client khỏi git
- [ ] Commit dirty changes hiện có (`git status` đang có ~30 file M trong auth-service) — review từng file, commit hoặc revert
- [ ] Xóa file `tsconfig.tsbuildinfo` (78KB) khỏi tracking

### 0.2 Baseline kiểm tra
- [ ] Chạy `npm audit` ở root + từng service, ghi lại CVE
- [ ] Verify build tất cả services: `npm run build` trên từng app
- [ ] Confirm `.env.example` cover hết env vars đang dùng (grep `process.env`)

**Definition of done**: Repo sạch, không có file rác trong git, tất cả build pass.

---

## Phase 1 — Fix 7 Blockers (5–7 ngày)

### 1.1 Dockerfile multi-stage build cho mọi service (1.5 ngày)
**Vấn đề hiện tại**: `apps/*/Dockerfile` chạy `ts-node` trong production → chậm 3x, image lớn 500MB+.

**Việc cần làm**:
- [ ] Tạo template Dockerfile multi-stage:
  ```dockerfile
  # Stage 1: deps
  FROM node:20-alpine AS deps
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci

  # Stage 2: build
  FROM node:20-alpine AS build
  WORKDIR /app
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  RUN npx prisma generate && npm run build

  # Stage 3: runtime
  FROM node:20-alpine AS runtime
  WORKDIR /app
  ENV NODE_ENV=production
  COPY --from=deps /app/node_modules ./node_modules
  COPY --from=build /app/dist ./dist
  COPY --from=build /app/src/generated ./src/generated
  RUN npm prune --production
  USER node
  HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1))"
  CMD ["node", "dist/main.js"]
  ```
- [ ] Áp dụng cho từng service: auth, comic, notification, web-api, post, storage, iam, config, introduction, marketing
- [ ] Verify image size giảm xuống <200MB
- [ ] Test container start <5s

**Done khi**: Mọi service chạy `node dist/main.js`, image <200MB, có HEALTHCHECK.

### 1.2 Loại bỏ hardcoded credentials (0.5 ngày)
**File**: `docker-compose.yml`

- [ ] Thay tất cả `POSTGRES_PASSWORD: secret` bằng `POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}`
- [ ] Tương tự cho REDIS_PASSWORD, MINIO_ROOT_PASSWORD, KAFKA passwords
- [ ] Mọi env biến nhạy cảm dùng syntax `${VAR:?required}` để fail-fast nếu chưa set
- [ ] Update `.env.example` với placeholder rõ ràng (`POSTGRES_PASSWORD=<set-strong-password-min-16-chars>`)
- [ ] Tạo `scripts/check-env.sh` validate env trước khi `docker-compose up`

**Done khi**: `docker-compose up` fail nếu thiếu env, không còn default `secret`/`change-me`.

### 1.3 Migration automation (1 ngày)
- [ ] Tạo init container hoặc pre-deploy hook chạy `prisma migrate deploy` trước khi start app
- [ ] Hoặc thêm script entrypoint:
  ```sh
  #!/bin/sh
  set -e
  npx prisma migrate deploy --schema=./prisma/schema.prisma
  exec node dist/main.js
  ```
- [ ] Đảm bảo migrations idempotent (`prisma migrate deploy` đã làm điều này)
- [ ] Document quy trình rollback migration trong [docs/MIGRATIONS.md](docs/MIGRATIONS.md)
- [ ] Áp dụng cho mọi service có Prisma: comic, post, auth (nếu có), iam

**Done khi**: Deploy mới tự migrate; rollback có docs.

### 1.4 Cải thiện CI/CD pipeline (1 ngày)
**File**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

- [ ] Thêm bước verify `package-lock.json` không drift
- [ ] Dùng `npm ci` thay vì `npm install`
- [ ] Verify GPG signature của commit trước khi pull (nếu áp dụng)
- [ ] Thêm health check sau `pm2 restart`:
  ```sh
  pm2 restart api --update-env
  sleep 5
  curl -f http://localhost:3002/api/health || (pm2 restart api && exit 1)
  ```
- [ ] Thêm rollback tự động: nếu health check fail, `pm2 restart api --update-env` revert về previous build (lưu `dist.backup/`)
- [ ] Optional: chuyển từ pm2 → docker-compose hoặc K8s

**Done khi**: Deploy fail rollback tự động, không có downtime nếu start fail.

### 1.5 Graceful shutdown cho Kafka consumers (0.5 ngày)
**Files**: `apps/notification-service/src/kafka/services/kafka.service.ts`, tương tự ở mọi service consume Kafka

- [ ] Implement `OnApplicationShutdown` interface ở mọi Kafka consumer service
- [ ] Trong main.ts thêm:
  ```ts
  app.enableShutdownHooks();
  ```
- [ ] Set `SIGTERM` timeout 30s (để Kafka commit offsets, drain in-flight messages)
- [ ] Test: `docker stop --time 30 <container>` không bị mất message
- [ ] Bull queue: gọi `queue.close()` trong shutdown hook

**Done khi**: Scale down không mất Kafka message; in-flight Bull jobs hoàn thành.

### 1.6 JWT Key Rotation (1 ngày)
**File**: `apps/auth-service/src/jwks/services/jwks.service.ts`

- [ ] Thêm `kid` (key ID) vào JWT header khi sign
- [ ] JWKS endpoint expose nhiều public keys (current + previous N keys)
- [ ] Auth-service đọc nhiều `JWT_PRIVATE_KEY_PEM_V1`, `JWT_PRIVATE_KEY_PEM_V2`, dùng V2 sign, verify bằng V1 hoặc V2 dựa trên `kid`
- [ ] Document quy trình rotate key: thêm V2, đợi token cũ hết hạn (15p–7 ngày), xóa V1
- [ ] Cron job (manual hoặc auto) rotate mỗi 90 ngày

**Done khi**: Có thể rotate key mà không cần redeploy/invalidate user sessions.

### 1.7 Generated Prisma client ra khỏi git (đã làm ở Phase 0.1)
- [ ] Thêm `npx prisma generate` vào `package.json` postinstall hoặc Dockerfile build stage
- [ ] Verify CI/CD chạy generate trước build

**Done khi**: `git status` clean sau `npm install` mới.

---

## Phase 2 — Operational Readiness (5–7 ngày)

### 2.1 Structured logging (1 ngày)
- [ ] Cài `nestjs-pino` cho mọi service
- [ ] Config JSON output ở production, pretty ở dev
- [ ] Inject request-id từ `x-request-id` header vào log context
- [ ] Correlate với OTEL trace ID
- [ ] Log levels: production = `info`, staging = `debug`

**Done khi**: Log ra stdout dạng JSON, có request_id + trace_id, parse được bằng Loki/ELK.

### 2.2 Health & readiness endpoints đầy đủ (0.5 ngày)
- [ ] Mọi service expose `/api/health` (liveness — chỉ check process alive)
- [ ] Mọi service expose `/api/ready` (readiness — check DB + Redis + Kafka connect được)
- [ ] Dùng `@nestjs/terminus` cho health indicators chuẩn
- [ ] Verify với `curl` từng endpoint

**Done khi**: K8s/load balancer có thể probe đúng cách; service unready ra khỏi pool tự động.

### 2.3 Dead Letter Queue cho Kafka (1 ngày)
**File**: `apps/notification-service/src/kafka/services/kafka.service.ts`

- [ ] Tạo topic DLQ cho mỗi consumer: `notification-failed`, `comic-events-failed`, etc.
- [ ] Sau N retries (hiện tại 8), publish message vào DLQ kèm metadata: error, stack, retry_count, original_topic
- [ ] Tạo cron job/admin endpoint để inspect + replay DLQ messages
- [ ] Alert khi DLQ size > threshold (qua Prometheus + Alertmanager)

**Done khi**: Message fail không bị drop silent; có cách recover.

### 2.4 Idempotency cho Outbox + Kafka consumers (1 ngày)
**File**: `apps/comic-service/src/kafka/services/outbox-relay.service.ts`

- [ ] Thêm column `idempotency_key` (UUID) vào outbox table — đã có `id`, dùng làm key
- [ ] Mọi Kafka consumer check `processed_events` table trước khi xử lý — đã có Bull job ID, mở rộng cho non-Bull consumers
- [ ] Document trong [docs/EVENT_PATTERNS.md](docs/EVENT_PATTERNS.md)

**Done khi**: Replay 1 event 100 lần = side-effect chỉ xảy ra 1 lần.

### 2.5 Rate limiting per-endpoint (0.5 ngày)
- [ ] Auth endpoints (`/login`, `/register`, `/forgot-password`): 5 req/min/IP
- [ ] OTP endpoints: đã có 5/15 phút (giữ nguyên)
- [ ] Public GET endpoints: 100 req/min/IP
- [ ] Internal endpoints (gọi giữa services): API key thay vì IP-based, không rate limit

**Done khi**: Brute force login chậm, browse comic không bị throttle nhầm.

### 2.6 Connection pooling (0.5 ngày)
- [ ] Set `connection_limit` trong DATABASE_URL: `?connection_limit=5&pool_timeout=30`
- [ ] Hoặc deploy PgBouncer trước Postgres (transaction mode)
- [ ] Tính: 10 services × 5 conn = 50 < Postgres max 100 ✓

**Done khi**: Load test không thấy "too many connections" error.

### 2.7 Secrets management (1 ngày)
- [ ] Production secrets không nằm trong `.env` file → dùng AWS Secrets Manager / HashiCorp Vault / K8s Secrets
- [ ] Bootstrap script load secrets vào env trước khi start app
- [ ] Rotate secret schedule: DB password mỗi 90 ngày, JWT key mỗi 180 ngày
- [ ] Revoke `INTERNAL_API_SECRET=change-me-in-production` — generate strong (32+ ký tự random)

**Done khi**: Không có secret nào trong git; có quy trình rotate.

### 2.8 K8s manifests (1.5 ngày)
- [ ] Tạo `infrastructure/k8s/` chứa:
  - Deployment cho mỗi service (replicas, resources, probes, env from secrets)
  - Service (ClusterIP)
  - Ingress (cho services public-facing: web-api, auth)
  - HPA (target CPU 70%, min 2 replicas, max 10)
  - PodDisruptionBudget (minAvailable 1)
  - NetworkPolicy (services chỉ gọi nhau khi cần)
- [ ] StatefulSet cho Postgres/Redis/Kafka (hoặc dùng managed service: RDS, ElastiCache, MSK)
- [ ] Secrets từ External Secrets Operator hoặc Vault

**Done khi**: `kubectl apply -f infrastructure/k8s/` deploy được cluster đầy đủ.

---

## Phase 3 — Hardening & Polish (3–5 ngày)

### 3.1 Monitoring & Alerting (1.5 ngày)
- [ ] Prometheus scrape `/metrics` (dùng `@willsoto/nestjs-prometheus`)
- [ ] Grafana dashboards cho mỗi service: RPS, latency p50/p95/p99, error rate, saturation
- [ ] Alertmanager rules:
  - Service down >2 phút
  - Error rate >5% trong 5 phút
  - DLQ size >100
  - DB connection pool >80%
  - Disk >85%
- [ ] On-call rotation, runbook trong [docs/RUNBOOK.md](docs/RUNBOOK.md)

### 3.2 Database backup strategy (0.5 ngày)
- [ ] Automated `pg_dump` hàng ngày → S3
- [ ] Retention: 7 ngày daily + 4 tuần weekly + 12 tháng monthly
- [ ] Test restore quy trình quarterly
- [ ] Point-in-time recovery (PITR) nếu dùng managed DB

### 3.3 Load testing (1 ngày)
- [ ] Setup k6 hoặc Artillery scripts
- [ ] Test scenarios: login flood, comic browse, notification send, mixed load
- [ ] Target: 1000 RPS với p95 <500ms
- [ ] Identify bottleneck, scale theo

### 3.4 OpenAPI documentation (0.5 ngày)
- [ ] Re-add `@nestjs/swagger` (đã bỏ trong commit "bỏ swagger")
- [ ] Generate OpenAPI spec ở build time
- [ ] Host Swagger UI ở `/api/docs` (chỉ trên staging/internal)

### 3.5 Security review (1 ngày)
- [ ] Chạy `npm audit fix`, OWASP ZAP scan
- [ ] Review all `@Public()` endpoints — confirm intentional
- [ ] CSP header (helmet config) — set strict policy
- [ ] HSTS header
- [ ] CORS production: confirm chỉ allow domain thực, không wildcard
- [ ] Verify password hashing (bcrypt rounds ≥12)

---

## Phase 4 — Deploy & Verify (2–3 ngày)

### 4.1 Staging deploy (1 ngày)
- [ ] Deploy K8s manifests lên staging cluster
- [ ] Run smoke test: register → login → browse → upload → notify
- [ ] Run load test, observe metrics
- [ ] Fix issues phát sinh

### 4.2 Production deploy (1 ngày)
- [ ] Snapshot DB trước deploy
- [ ] Blue-green hoặc canary deploy (10% traffic 1h, sau đó 100%)
- [ ] Monitor metrics chặt chẽ trong 24h
- [ ] Verify backup chạy

### 4.3 Post-deploy (0.5–1 ngày)
- [ ] Document quy trình deploy/rollback
- [ ] Setup on-call rotation
- [ ] Hậu kỳ retro: ghi lại issue, learnings

---

## Checklist tổng — Done khi prod-ready

**Bắt buộc**:
- [ ] Phase 0–2 hoàn thành
- [ ] Tất cả secrets không trong git
- [ ] Migration auto chạy khi deploy
- [ ] Rollback tự động nếu deploy fail
- [ ] Health/ready endpoints hoạt động đúng
- [ ] Structured logging có trace correlation
- [ ] DLQ cho mọi Kafka topic
- [ ] HPA + resource limits set
- [ ] Backup chạy hàng ngày
- [ ] Monitoring + alerting cover các metric cốt lõi
- [ ] Load test pass target (1000 RPS, p95 <500ms)
- [ ] Runbook tồn tại

**Nên có**:
- [ ] Phase 3 hoàn thành
- [ ] Swagger docs
- [ ] mTLS giữa services
- [ ] API versioning strategy

---

## Ưu tiên nếu phải compress timeline

**Nếu chỉ có 1 tuần** — làm: Phase 0 + 1.1 + 1.2 + 1.3 + 1.5 + 2.2. Bỏ qua: K8s, monitoring đầy đủ. **Risk**: vận hành thủ công, không scale được.

**Nếu có 2 tuần** — làm: Phase 0 + 1 + 2 (thiếu K8s). Deploy bằng docker-compose trên 1 VM lớn. **Risk**: SPOF, scale up khó.

**Nếu có 3 tuần** — full plan. Đây là khuyến nghị.

---

## Theo dõi tiến độ

Tạo GitHub issues cho từng task, gắn label `prod-readiness`, milestone theo phase. Stand-up daily review checklist này.

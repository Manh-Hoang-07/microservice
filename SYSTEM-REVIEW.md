# SYSTEM REVIEW - Comic Platform Microservice

> Review date: 2026-05-04
> Reviewer: Claude Opus 4.6
> Verdict: **Codebase co architecture tot, nhung con nhieu lo hong bao mat va performance can fix truoc khi len production.**

---

## MUC LUC

- [I. TONG QUAN](#i-tong-quan)
- [II. BAO MAT](#ii-bao-mat)
- [III. HIEU NANG](#iii-hieu-nang)
- [IV. KIEN TRUC & CHAT LUONG CODE](#iv-kien-truc--chat-luong-code)
- [V. DIEM TOT](#v-diem-tot)
- [VI. BANG TONG HOP](#vi-bang-tong-hop)
- [VII. ROAD MAP FIX](#vii-road-map-fix)

---

## I. TONG QUAN

| Item | Detail |
|------|--------|
| Framework | NestJS 11 + TypeScript 6 |
| ORM | Prisma 7.8 |
| Database | 8x PostgreSQL 15 (database-per-service) |
| Cache | 6x Redis 7 |
| Messaging | Kafka 8.2 (KRaft, no Zookeeper) |
| Gateway | Nginx 1.25 |
| Services | 10 microservices + 9 shared libraries |
| Tracing | OpenTelemetry + Jaeger |
| Metrics | Prometheus |
| Container | Docker Compose, K8s manifests (template) |

---

## II. BAO MAT

### CRITICAL

#### 1. Database/Redis tren IP public voi password `123456`

**Files:** `apps/auth-service/.env`, `apps/iam-service/.env`, `apps/comic-service/.env`, va nhieu service khac

```
DATABASE_URL=postgresql://root:123456@160.191.50.85:5432/auth_db
REDIS_URL=redis://:123456@160.191.50.85:6379
```

Server `160.191.50.85` dang chay PostgreSQL va Redis voi password `123456` -- day la password yeu nhat co the. Bat ky ai scan IP nay deu co the truy cap toan bo database. **Can doi password ngay lap tuc** va chuyen sang private network.

---

#### 2. Google OAuth secret that trong .env

**File:** `apps/auth-service/.env`

```
GOOGLE_CLIENT_SECRET=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
```

Day la secret that, khong phai placeholder. Neu da tung commit vao git thi phai rotate ngay trong Google Cloud Console.

---

### HIGH

#### 3. INTERNAL_API_SECRET dung gia tri mac dinh

**Files:** Tat ca services

```
INTERNAL_API_SECRET=change-me-in-production
```

Ai doc source code deu biet secret nay. Docker-compose co check `>=32 chars` nhung cac .env local dung gia tri mac dinh.

---

#### 4. Tat ca port DB/Redis expose ra 0.0.0.0

**File:** `docker-compose.yml`

8 PostgreSQL (ports 5433-5441) va 6 Redis (ports 6380-6385) deu expose ra host. Ket hop voi password yeu (`postgres:postgres` cho Docker, `123456` cho external), bat ky may nao trong network deu connect duoc.

**Fix:** Bind vao `127.0.0.1:5433:5432` hoac bo expose hoan toan.

---

### MEDIUM

#### 5. JwtLocalGuard thieu issuer/audience validation

**File:** `shared/auth-client/src/jwt-local.guard.ts:87-89`

```typescript
const { payload } = await jose.jwtVerify(token, this.jwks, {
  algorithms: ['RS256'],
  // THIEU: issuer, audience
});
```

So sanh voi `JwtGuard` (lam dung), `JwtLocalGuard` chap nhan bat ky token RS256 nao tu JWKS URL, ke ca token cua tenant/product khac.

---

#### 6. JwtLocalGuard khong reject refresh token

`JwtGuard` reject token co `type: 'refresh'`, nhung `JwtLocalGuard` thi khong. Refresh token (song 7 ngay) co the dung lam access token tren cac service dung `JwtLocalGuard`.

---

#### 7. Khong co TLS

**File:** `infrastructure/nginx/nginx.conf:71`

Nginx chi listen port 80. Tat ca traffic (JWT, password, secrets) truyen plaintext. HSTS bi comment out. Khong co cau hinh TLS nao trong toan bo project.

---

#### 8. Redis khong co authentication

**File:** `docker-compose.yml`

6 Redis instances chay khong co `--requirepass`. Bat ky process nao trong Docker network deu doc/ghi duoc.

---

#### 9. Kafka khong co SASL/TLS

Kafka chay hoan toan PLAINTEXT, khong authentication, `auto.create.topics.enable=true`. Bat ky client nao cung publish/consume duoc.

---

#### 10. Kafka UI khong co authentication

Port 8080 expose ra ngoai, khong can dang nhap. Ai cung browse duoc tat ca topics va messages.

---

#### 11. `sortBy` khong duoc validate

**File:** `shared/common/src/helpers/pagination.helper.ts:54`

```typescript
const sortBy: string | undefined = query?.sort_by || undefined;
```

User input di thang vao `orderBy` cua Prisma. Co the enumerate column names qua timing. Can whitelist cac column cho phep.

---

#### 12. Redis fail-open khi mat ket noi

**File:** `shared/redis/src/redis.service.ts`

Moi method deu check `if (!this.client) return null/0/false`. Khi Redis down: token blacklist, rate limiting, session tracking deu **im lang fail** thay vi reject request.

---

### LOW

| # | Van de | File |
|---|--------|------|
| 13 | RBAC bypass khi NODE_ENV != production | `shared/common/src/guards/rbac.guard.ts:44-49` |
| 14 | CORS_ORIGINS=* trong dev .env | All `.env` files |
| 15 | Redis `KEYS` command (block toan bo Redis) | `shared/redis/src/redis.service.ts:140` |
| 16 | OTP khong co trong danh sach redact cua audit log | `shared/common/src/audit/audit-log.interceptor.ts:103` |
| 17 | In-memory blacklist mat khi restart | `apps/auth-service/src/security/services/token-blacklist.service.ts` |

---

## III. HIEU NANG

### CRITICAL

#### 1. Khong co Docker resource limits

**File:** `docker-compose.yml`

Khong mot container nao co `mem_limit` hay `deploy.resources.limits`. 8 PostgreSQL + 6 Redis + Kafka + 10 services dung chung host. Mot memory leak bat ky se OOM kill toan bo.

**Fix:**
```yaml
deploy:
  resources:
    limits:
      memory: 256M  # per app service
# PostgreSQL: 256M, Redis: 128M, Kafka: 512M
```

---

#### 2. Redis khong co maxmemory

6 Redis instances khong set `--maxmemory` va `--maxmemory-policy`. Redis se an memory cho den khi OOM kill.

**Fix:** Them `--maxmemory 128mb --maxmemory-policy allkeys-lru` vao command.

---

### HIGH

#### 3. ILIKE '%...%' tren tat ca search queries

**Files:** `apps/comic-service/src/modules/comic/repositories/comic.repository.ts:95-99`, `apps/post-service/src/modules/post/repositories/post.repository.ts:100-101`, ~30 files khac

Prisma `contains` voi `mode: 'insensitive'` = `ILIKE '%search%'` = **full table scan**. Comic-service search qua `title`, `slug`, VA `author` voi OR => scan 3 lan.

**Fix:** Dung `pg_trgm` extension + GIN index, hoac `tsvector` full-text search cho public-facing endpoints.

---

#### 4. Redis `KEYS` command

**File:** `shared/redis/src/redis.service.ts:140-143`

`KEYS` la O(N) tren toan bo keyspace, **block Redis instance** trong luc chay. Redis docs noi ro: "Do not use in production."

**Fix:** Thay bang `SCAN` voi cursor.

---

### MEDIUM

#### 5. View-count flush tuan tu

**Files:** `apps/comic-service/src/modules/view-tracking/services/view-cron.service.ts:49-71`, `apps/post-service/src/modules/stats/services/view-cron.service.ts:50-71`

Flush view counts **tung comic mot** trong for loop voi await. Moi iteration = 2 DB upserts. 500 comics = 1000 sequential round-trips moi 5 phut.

**Fix:** Batch upserts bang raw SQL `INSERT ... ON CONFLICT DO UPDATE` voi multi-row VALUES.

---

#### 6. COUNT(*) tren moi paginated request

**File:** `shared/common/src/repository/prisma.repository.ts:120-125`

PostgreSQL `COUNT(*)` = full table/index scan (do MVCC). Moi request list deu phai chiu chi phi nay.

**Fix:** Cursor-based pagination cho public feeds, hoac cache count voi short TTL.

---

#### 7. Duplicate fetch sau create/update

**File:** `apps/comic-service/src/modules/comic/admin/services/comic.service.ts:61,104`

Sau `createWithRelations` (da fetch), lai goi `getOne(id)` => double round-trip.

---

#### 8. Outbox relay tao Kafka producer thu 2

**File:** `shared/common/src/kafka/outbox-relay.service.ts:54-66`

Moi service dung outbox se co 2 Kafka producers (1 tu `KafkaProducerService`, 1 tu outbox relay). Gap doi TCP connections.

---

#### 9. Kafka consumer xu ly 1 message/lan

**File:** `apps/notification-service/src/kafka/services/kafka.service.ts:133-135`

`eachMessage` xu ly tuan tu. 9 topics chung 1 consumer, handler cham = block tat ca topics.

**Fix:** Dung `eachBatch` voi controlled concurrency.

---

#### 10. BigIntSerializationInterceptor deep-clone moi response

**File:** `shared/common/src/interceptors/bigint-serialization.interceptor.ts:16-28`

`serializeBigInt` tao object moi cho **moi** response, ke ca khi khong co BigInt. List 100 items voi nested relations = nhieu object allocation va GC pressure vo ich.

---

#### 11. Khong co Express body size limit

**File:** `shared/bootstrap/src/bootstrap.ts`

Nginx set `client_max_body_size 1m`, nhung truy cap truc tiep vao service (bypass nginx) thi khong co limit => memory exhaustion.

---

#### 12. proxy_cache_path khong duoc define

**File:** `infrastructure/nginx/nginx.conf`

Co `proxy_cache_valid` nhung **khong co** `proxy_cache_path`. Moi JWKS request va static file request deu hit backend.

---

#### 13. Docker HEALTHCHECK dung liveness thay vi readiness

**File:** `infrastructure/docker/Dockerfile.service:120`

```
curl -fsS "http://localhost:${PORT}/api/v1/health"
```

Endpoint nay luon tra 200 (chi check process). Can dung `/api/v1/health/ready` de check DB + Redis.

---

#### 14. Khong co Kafka health probe

4 services phu thuoc Kafka (comic, notification, post, marketing) khong check Kafka connectivity trong readiness probe.

---

#### 15. `getSimpleList` default 1000 rows

**File:** `shared/common/src/services/base.service.ts:67-74`

Bypass `DEFAULT_MAX_TAKE=100` bang cach set `maxLimit: Math.max(limit, 1000)`.

---

#### 16. PostgreSQL 8 instances khong tune

8 PostgreSQL instances dung default config. `shared_buffers=128MB` * 8 = 1GB chi rieng buffer. Can tune hoac gop databases.

---

---

## IV. KIEN TRUC & CHAT LUONG CODE

### CRITICAL

#### 1. Gan nhu KHONG CO tests

**Chi co 4 test files** cho toan bo 10-service monorepo:
- `apps/auth-service/tests/jwks/services/jwks.service.spec.ts`
- `apps/storage-service/tests/upload/services/file-validation.service.spec.ts`
- `shared/bootstrap/tests/json-logger.spec.ts`
- `shared/common/tests/kafka/idempotency.service.spec.ts`

**0 e2e tests. 0 controller tests. 0 repository tests.** 75+ services, 70+ controllers, 40+ repositories khong co test nao. Day la rui ro lon nhat cua toan bo he thong.

---

#### 2. BigInt handling conflict giua 2 interceptors

- `TransformInterceptor.deepConvertBigInt` (chay truoc) convert BigInt => **Number** (mat precision khi > 2^53)
- `BigIntSerializationInterceptor.serializeBigInt` (chay sau) convert BigInt => **String** nhung khong con BigInt nao de convert

Ket qua: IDs > 2^53 bi **silent data corruption**.

---

#### 3. @AuditLog decorator dinh nghia nhung KHONG BAO GIO duoc su dung

Grep `@AuditLog` qua tat ca `apps/` => **0 ket qua**. `AuditModule` chi import trong `iam-service`. Toan bo audit infrastructure la dead code cho 9/10 services.

---

#### 4. OpenTelemetry tracing KHONG duoc khoi tao

`initTracing()` ton tai trong `@package/tracing` nhung **khong service nao goi no**. Distributed tracing la dead code.

---

### HIGH

#### 5. Port default mismatch

| Service | `createAppConfig()` default | `ecosystem.config.js` port |
|---------|---------------------------|---------------------------|
| introduction-service | 3010 | 3007 |
| post-service | 3007 | 3008 |

Neu `PORT` env var khong duoc set, service se start sai port va nginx khong route duoc.

---

#### 6. RBAC guard goi HTTP tren MOI authenticated request

**File:** `shared/common/src/guards/rbac.guard.ts:65-84`

`fetch()` toi IAM service, khong cache response, khong retry. Moi request mat them 1 network round-trip. Transient failure = user nhan 403.

---

#### 7. Duplicate boilerplate trong moi AppModule

Moi service lap lai ~30 dong giong nhau: GlobalExceptionFilter, ThrottlerGuard, JwtGuard factory, RbacGuard factory, BigIntSerializationInterceptor. Can extract thanh shared module.

---

#### 8. env.validation.ts copy-paste

10 files `env.validation.ts` lap lai cac common vars (SERVICE_NAME, PORT, NODE_ENV, DATABASE_URL, REDIS_URL, AUTH_JWKS_URL, IAM_INTERNAL_URL, INTERNAL_API_SECRET). Can dung shared base schema.

---

### MEDIUM

#### 9. Double error handling

`TransformInterceptor.handleError()` wrap error thanh `HttpException`, roi `GlobalExceptionFilter` bat lai `HttpException` do. Error bi xu ly 2 lan, co the mat original error class.

---

#### 10. Hand-rolled circuit breaker trong RbacGuard

**File:** `shared/common/src/guards/rbac.guard.ts:22-24`

Tu viet circuit breaker rieng thay vi dung `@package/circuit-breaker` (da co san). Code duplicate va thieu features (half-open state, etc.).

---

#### 11. `require()` trong PrismaRepository

**File:** `shared/common/src/repository/prisma.repository.ts:127`

`require('...')` runtime import bypass module system, lam dependency invisible voi compiler va test framework.

---

#### 12. PrismaRepository.delete() nuot loi

**File:** `shared/common/src/repository/prisma.repository.ts:193-199`

Delete that bai tra ve `false` ma khong phan biet: record khong ton tai, foreign key violation, hay connection error.

---

#### 13. RBAC fail-open trong development

**File:** `shared/common/src/guards/rbac.guard.ts:44-49`

Khi `IAM_INTERNAL_URL` khong set va `NODE_ENV != production`, tat ca RBAC checks bi bypass. Developer khong bao gio test authorization that su.

---

---

## V. DIEM TOT

He thong co nhieu diem lam tot, can ghi nhan:

1. **Database-per-service** -- Moi service co DB rieng, khong shared database.
2. **Outbox pattern** -- Kafka at-least-once delivery voi `FOR UPDATE SKIP LOCKED`.
3. **Idempotency** -- Redis-backed SET NX EX dedup + in-memory LRU.
4. **JWT security** -- RS256 pinning (chong alg=none attack), refresh token rotation voi JTI.
5. **Production CORS enforcement** -- Hard crash khi CORS_ORIGINS=* trong production.
6. **Brute force protection** -- `AttemptLimiterService` fail-closed khi Redis loi.
7. **Header sanitization** -- Nginx strip `X-User-Id` chong spoofing, validate Correlation-Id.
8. **Graceful shutdown** -- Kafka consumer drain 25s, Prisma disconnect, Redis cleanup.
9. **Circuit breaker** -- `@package/circuit-breaker` (cockatiel) cho web-api-service.
10. **Structured logging** -- JSON logger voi OpenTelemetry correlation (du chua wire tracing).
11. **Pagination caps** -- `MAX_PAGE=1000`, `DEFAULT_MAX_TAKE=100`.
12. **Docker best practices** -- Multi-stage build, non-root user, dumb-init, health checks.
13. **Password handling** -- bcrypt voi configurable rounds, 72-char max.
14. **Input validation** -- Global ValidationPipe voi whitelist + forbidNonWhitelisted.
15. **DOMPurify sanitization** -- Restrictive tag/attribute allowlist cho HTML input.

---

## VI. BANG TONG HOP

### Bao mat

| # | Muc do | Van de | File |
|---|--------|--------|------|
| 1 | **CRITICAL** | DB/Redis tren IP public, password `123456` | Multiple `.env` |
| 2 | **CRITICAL** | Google OAuth secret that trong .env | `apps/auth-service/.env` |
| 3 | **HIGH** | INTERNAL_API_SECRET = `change-me-in-production` | Multiple `.env` |
| 4 | **HIGH** | DB/Redis ports expose 0.0.0.0 | `docker-compose.yml` |
| 5 | MEDIUM | JwtLocalGuard thieu issuer/audience | `shared/auth-client/src/jwt-local.guard.ts` |
| 6 | MEDIUM | JwtLocalGuard khong reject refresh token | `shared/auth-client/src/jwt-local.guard.ts` |
| 7 | MEDIUM | Khong co TLS | `infrastructure/nginx/nginx.conf` |
| 8 | MEDIUM | Redis khong authentication | `docker-compose.yml` |
| 9 | MEDIUM | Kafka khong SASL/TLS | `docker-compose.yml` |
| 10 | MEDIUM | Kafka UI khong auth | `docker-compose.yml` |
| 11 | MEDIUM | sortBy khong validate | `shared/common/src/helpers/pagination.helper.ts` |
| 12 | MEDIUM | Redis fail-open | `shared/redis/src/redis.service.ts` |

### Hieu nang

| # | Muc do | Van de | File |
|---|--------|--------|------|
| 1 | **CRITICAL** | Khong co Docker resource limits | `docker-compose.yml` |
| 2 | **CRITICAL** | Redis khong maxmemory | `docker-compose.yml` |
| 3 | **HIGH** | ILIKE full table scan | 30+ repository files |
| 4 | **HIGH** | Redis KEYS command | `shared/redis/src/redis.service.ts` |
| 5 | MEDIUM | View-count flush tuan tu | view-cron.service.ts (comic, post) |
| 6 | MEDIUM | COUNT(*) moi paginated request | `shared/common/src/repository/prisma.repository.ts` |
| 7 | MEDIUM | Outbox relay duplicate Kafka producer | `shared/common/src/kafka/outbox-relay.service.ts` |
| 8 | MEDIUM | Kafka consumer single-threaded | notification/kafka.service.ts |
| 9 | MEDIUM | BigInt interceptor deep-clone | `shared/common/src/interceptors/bigint-serialization.interceptor.ts` |
| 10 | MEDIUM | Khong co body size limit | `shared/bootstrap/src/bootstrap.ts` |
| 11 | MEDIUM | proxy_cache_path khong define | `infrastructure/nginx/nginx.conf` |
| 12 | MEDIUM | Healthcheck dung liveness | `infrastructure/docker/Dockerfile.service` |

### Kien truc & Code quality

| # | Muc do | Van de | File |
|---|--------|--------|------|
| 1 | **CRITICAL** | Gan nhu 0 test coverage | Project-wide |
| 2 | **CRITICAL** | BigInt conflict giua 2 interceptors | TransformInterceptor + BigIntSerializationInterceptor |
| 3 | **CRITICAL** | @AuditLog khong duoc su dung | Project-wide |
| 4 | **CRITICAL** | OpenTelemetry tracing khong khoi tao | `shared/tracing/` |
| 5 | **HIGH** | Port default mismatch | introduction-service, post-service |
| 6 | **HIGH** | RBAC HTTP call moi request, khong cache | `shared/common/src/guards/rbac.guard.ts` |
| 7 | **HIGH** | AppModule boilerplate duplicate | All 10 services |
| 8 | **HIGH** | env.validation.ts copy-paste | All 10 services |
| 9 | MEDIUM | Double error handling | TransformInterceptor + GlobalExceptionFilter |
| 10 | MEDIUM | Hand-rolled circuit breaker | `shared/common/src/guards/rbac.guard.ts` |
| 11 | MEDIUM | RBAC fail-open trong dev | `shared/common/src/guards/rbac.guard.ts` |

---

## VII. ROAD MAP FIX

### Phase 1: Khẩn cấp (làm ngay)

- [ ] Đổi password database/Redis trên `160.191.50.85` (KHÔNG phải `123456`)
- [ ] Rotate Google OAuth secret
- [ ] Bind Docker ports vào `127.0.0.1` hoặc bỏ expose
- [ ] Set `INTERNAL_API_SECRET` thật (>=32 chars, random)
- [ ] Thêm `--requirepass` cho tất cả Redis containers
- [ ] Thêm `--maxmemory 128mb --maxmemory-policy allkeys-lru` cho Redis
- [ ] Thêm `mem_limit` cho tất cả containers trong docker-compose.yml

### Phase 2: Tuần này

- [ ] Fix BigInt conflict: bỏ `deepConvertBigInt` trong TransformInterceptor, để BigIntSerializationInterceptor xử lý
- [ ] Thêm issuer/audience validation vào JwtLocalGuard
- [ ] Thêm refresh token rejection vào JwtLocalGuard
- [ ] Fix port defaults trong `createAppConfig()` cho introduction-service va post-service
- [ ] Thay Redis `KEYS` bằng `SCAN`
- [ ] Thêm `express.json({ limit: '1mb' })` trong bootstrap
- [ ] Đổi Docker HEALTHCHECK sang `/api/v1/health/ready`

### Phase 3: Sprint tới

- [ ] Cache RBAC decisions trong Redis (TTL 30-60s)
- [ ] Extract shared AppModule factory để bỏ boilerplate duplicate
- [ ] Extract shared base env.validation schema
- [ ] Wire OpenTelemetry `initTracing()` vào tất cả services
- [ ] Apply `@AuditLog` decorator cho các controller quan trọng
- [ ] Thêm `pg_trgm` GIN indexes cho search queries
- [ ] Batch view-count flush
- [ ] Thêm `proxy_cache_path` cho nginx
- [ ] Thêm Kafka health probe vào readiness check

### Phase 4: Dài hạn

- [ ] Viết tests (unit + integration + e2e) -- ưu tiên auth, RBAC, payment flows
- [ ] Setup TLS termination (Let's Encrypt hoặc cloud LB)
- [ ] Kafka SASL + TLS cho production
- [ ] Cursor-based pagination cho public feeds
- [ ] `eachBatch` cho Kafka consumers
- [ ] PgBouncer enabled by default
- [ ] Consolidate outbox relay để dùng chung KafkaProducerService

---

## DIEM TONG

| Hang muc | Diem | Ghi chu |
|----------|------|---------|
| **Bao mat** | 4/10 | 2 CRITICAL, 2 HIGH. Credentials yeu, khong TLS, khong auth cho Redis/Kafka |
| **Hieu nang** | 5/10 | Khong resource limits, full table scans, KEYS command. Co caching nhung chua toi uu |
| **Kien truc** | 7/10 | Database-per-service tot, outbox pattern tot, nhung duplicate nhieu va co conflicts |
| **Code quality** | 5/10 | Clean code, nhung gan nhu 0 tests, dead features (tracing, audit), BigInt bug |
| **Observability** | 4/10 | Infrastructure san sang (Prometheus, Jaeger, structured logging) nhung chua wire that |
| **DevOps** | 6/10 | Docker multi-stage tot, graceful shutdown tot, nhung thieu resource limits va health checks chua chinh xac |
| **TONG** | **5.2/10** | Architecture foundation vung, nhung bao mat va testing la 2 rui ro lon nhat |

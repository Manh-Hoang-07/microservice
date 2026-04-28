# Kế Hoạch Kiến Trúc Microservice — NestJS Comic Platform

## Context

**Vì sao tách microservice?**
Monolith hiện tại (683 TypeScript files, 45+ Prisma models) hoạt động tốt nhưng có bottleneck rõ ràng:
- `ComicNotificationService` và `PostNotificationService` ghi DB trực tiếp → block request thread khi fanout cho nhiều followers
- `ComicsModule` import trực tiếp `NOTIFICATION_REPOSITORY` từ `SystemModule` → cross-domain coupling
- `HomepageModule` inject thẳng `PublicComicsService` → không thể scale riêng
- Tất cả domain share 1 DB, 1 Redis instance, 1 process → single point of failure

**Mục tiêu sau migration:**
- Comic Service có thể scale độc lập (đây là core traffic)
- Notification fanout qua Kafka, không block request
- Auth/RBAC có thể share với project khác
- Mỗi team có thể deploy service của mình độc lập

**Tech stack hiện tại cần lưu ý:**
- NestJS **11.1.19**, TypeScript 6.0, Prisma 7.6.0
- Database: **PostgreSQL** (dùng `pg` adapter)
- Redis: `ioredis` 5.x với wrapper `RedisUtil` tùy chỉnh
- Queue: `@nestjs/bull` + `bull` 4.x — **chỉ dùng cho transactional email** (register, password reset)
- In-app notifications: **viết DB trực tiếp, không qua queue** ← bottleneck chính
- `RequestContext` dùng `AsyncLocalStorage` — cần propagation khi gọi cross-service

---

## Kiến Trúc Đích: 5 Services + 1 Monolith + 1 BFF

```
CLIENT LAYER  (Web / Mobile / Admin)
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│                 API GATEWAY (Nginx)                       │
│  /api/comics/*        → comic-service      :3001          │
│  /api/auth/*          → auth-service       :3002          │
│  /api/upload/*        → storage-service    :3003          │
│  /api/notifications/* → notif-service      :3004          │
│  /api/config/*        → config-service     :3005          │
│  /api/homepage        → bff-service        :3006          │
│  /api/*               → main-service       :3000          │
└─────────────────────────────────────────────────────────┘
       │
┌──────┴──────────────────────────────────────────────┐
│                  Kafka Broker                         │
│  comic.chapter.published                             │
│  comic.comment.created                               │
│  user.followed.comic / user.unfollowed.comic         │
│  user.registered / user.password.reset               │
│  contact.submitted                                   │
└──────────────────────────────────────────────────────┘

Auth Service expose:  GET /.well-known/jwks.json
Các service khác:     jwtVerify(token, cachedPublicKey) — 0ms network
```

---

## Phân Tích Coupling Issues (Cần Phá Trước Khi Tách)

### Issue 1: ComicNotificationService viết DB trực tiếp
**File**: `src/modules/comics/shared/services/comic-notification.service.ts`
- Inject `NOTIFICATION_REPOSITORY` từ SystemModule
- Gọi `notificationRepository.create()` synchronously cho TỪNG follower
- **Fix**: Replace bằng Kafka event publish. Notification Service consume event, bulk insert.

### Issue 2: PostNotificationService — coupling tương tự
**File**: `src/modules/post/` (PostNotificationService)
- Cùng pattern: inject `NOTIFICATION_REPOSITORY` từ SystemModule
- **Fix**: Kafka event `post.comment.created` → Notification Service

### Issue 3: HomepageModule inject concrete services
**File**: `src/modules/homepage/homepage.module.ts`
- Import `PublicComicsModule`, `PublicChaptersModule`, `PublicComicCategoriesModule`
- Inject thẳng `PublicComicsService`
- **Fix**: BFF Service gọi REST API sang Comic Service

### Issue 4: TokenBlacklistService và AttemptLimiterService ở Core
**Files**: `src/core/security/`
- Hiện tại share với toàn bộ monolith
- Khi tách Auth Service: chỉ Auth Service cần logout blacklist
- **Fix**: Move vào Auth Service. Các service khác verify JWT locally (không cần blacklist check)

### Issue 5: RequestContext (AsyncLocalStorage) không propagate cross-service
**File**: `src/common/shared/request-context.ts`
- `Auth.id()`, `Auth.user()` đọc từ AsyncLocalStorage
- Khi Comic Service gọi Auth Service qua HTTP: context bị mất
- **Fix**: Inject `X-User-Id`, `X-Request-Id`, `X-Correlation-Id` headers vào inter-service calls

### Issue 6: SecurityGuard tightly coupled với RbacModule
**File**: `src/common/auth/guards/security.guard.ts`
- Extend `AuthGuard('jwt')`, inject `RbacService`, `RbacCacheService`, `RbacAuthorizationOrchestrator`
- **Fix Phase 0**: Extract `IAuthorizationService` interface, toggle impl qua env
- **Fix Phase 2**: JWT verify locally bằng JWKS public key; RBAC check gọi Auth Service chỉ khi cần context scope

---

## Chi Tiết Từng Service

### Service 1: Comic Service `:3001`

**Bao gồm:**
- Comic, Chapter, ChapterPage, ComicCategory, ComicCategoryOnComic
- Comment, Review, Bookmark, Follow, ReadingHistory
- ComicStats, ComicDailyStats, ComicView
- ComicViewCronService (sở hữu Redis buffer `comic:views:buffer`)
- **Outbox relay cron** (5 giây/lần)

**Database riêng** (`comic_db` — PostgreSQL):
```
comics, chapters, chapter_pages
comic_categories, comic_category_on_comic
comic_comments, comic_reviews, comic_views
comic_follows, reading_histories, bookmarks
comic_stats, comic_daily_stats
comic_outbox  ← mới thêm
```

**JWT validation:** Verify locally bằng RSA public key từ `GET auth-service/.well-known/jwks.json`
(Tải 1 lần lúc startup, refresh 24h, hoặc khi verify fail)

**Kafka publish:**
- `comic.chapter.published` — `{ comic_id, chapter_id, comic_title, chapter_label, published_at }`
- `comic.comment.created` — `{ comment_id, chapter_id, user_id, parent_comment_id | null }`
- `user.followed.comic` — `{ user_id, comic_id, followed_at }`
- `user.unfollowed.comic` — `{ user_id, comic_id }`

**Redis riêng** (`comic-redis:6379`):
```
comic:views:buffer       ← hash, view count buffer
comic:views:buffer:lock  ← distributed lock
comic:cache:public:*     ← page cache
```

---

### Service 2: Auth Service `:3002`

**Bao gồm:**
- AuthModule (JWT RS256, Google OAuth, LoginService, RegistrationService, TokenService, PasswordService)
- RbacModule (RbacService, RbacCacheService, RbacAuthorizationOrchestrator)
- UserModule + ProfileModule
- ContextModule, GroupModule, RoleModule, PermissionModule
- **TokenBlacklistService** (chuyển từ Core)
- **AttemptLimiterService** (chuyển từ Core)
- Bull queue cho transactional email (register, password reset) — giữ nguyên

**Database riêng** (`auth_db` — PostgreSQL):
```
users, profiles
contexts, groups, user_groups
roles, permissions, role_has_permissions, role_contexts
user_role_assignments
```

**Expose:**
- `POST /auth/login`, `POST /auth/register`, `GET /auth/google/callback`
- `GET /.well-known/jwks.json` — RSA public key (JWK Set format)
- `GET /internal/users?ids=1,2,3` — Batch user lookup (internal only, header `X-Internal-Secret`)
- `POST /internal/rbac/check` — RBAC check với group/context scope (internal only)
- `POST /internal/token/verify-blacklist` — Check token blacklist (internal, ít dùng)

**Redis riêng** (`auth-redis:6379`):
```
auth:rbac:*       ← RBAC permission cache (version-based)
auth:blacklist:*  ← JWT blacklist (logout, password reset)
auth:attempt:*    ← Login attempt limiter
auth:bull:*       ← Bull Queue (email jobs)
```

**Kafka publish:**
- `user.registered` — `{ user_id, email, username }`
- `user.password.reset` — `{ user_id, email }`

---

### Service 3: Storage Service `:3003`

**Bao gồm:** FileUploadModule, LocalStorageStrategy, S3Strategy, CloudinaryStrategy, FileValidationService

**Stateless, không có DB riêng.** JWT verify locally.

**Env cần:** `AUTH_JWKS_URL`, `S3_*`, `CLOUDINARY_*`, `UPLOAD_DIR`

---

### Service 4: Notification Service `:3004`

**Bao gồm:**
- NotificationModule (lưu `Notification` records, expose user endpoints)
- **ContentTemplateModule** (chuyển từ SystemModule — đúng chỗ hơn vì NotificationProcessor đã dùng)
- QueueWorkerModule (Bull Queue — NotificationProcessor xử lý email)
- **Local follow projection** — duy trì từ Kafka

**Database riêng** (`notif_db` — PostgreSQL):
```
notifications
content_templates
comic_followers_projection  ← denormalized copy, sourced từ Kafka
```

**Fan-out notification qua Kafka (giải quyết bottleneck chính):**
```
Kafka: user.followed.comic      → INSERT comic_followers_projection
Kafka: user.unfollowed.comic    → DELETE comic_followers_projection
Kafka: comic.chapter.published  → SELECT followers WHERE comic_id = ?
                                  → bulk INSERT notifications (batch 500)
Kafka: comic.comment.created    → notify parent comment author
Kafka: user.registered          → Bull Queue → welcome email
Kafka: user.password.reset      → Bull Queue → reset email
Kafka: contact.submitted        → Bull Queue → admin alert email
```

**Redis riêng** (`notif-redis:6379`):
```
notif:bull:*  ← Bull Queue jobs
```

---

### Service 5: Config Service `:3005`

**Bao gồm:** SystemConfigModule (GeneralConfig, EmailConfig), MenuModule, LocationModule

**Database riêng** (`config_db` — PostgreSQL):
```
general_configs, email_configs
menus, menu_permissions
countries, provinces, wards
```

**Đặc điểm:** Read-heavy, write hiếm. Không cần Redis riêng — các service khác cache in-memory (LRU, TTL 1 giờ).

---

### Service 6: BFF Service `:3006`

**Thay thế HomepageModule.** Không chứa business logic.

```typescript
// Gọi song song, merge kết quả
const [featuredComics, latestChapters, categories, latestPosts] = await Promise.all([
  comicClient.getFeaturedComics(),
  comicClient.getLatestChapters(),
  comicClient.getCategories(),
  mainClient.getLatestPosts(),   // main-service (monolith)
]);
```

**Redis riêng** (`bff-redis:6379`): `bff:homepage:*` — cache 2 phút

---

### Giữ lại trong Main Service `:3000`

PostModule, IntroductionModule, MarketingModule, EnumModule

**Kafka publish thêm:**
- `contact.submitted` → Notification Service gửi email alert admin

---

## Outbox Pattern (Đảm Bảo At-Least-Once Delivery)

Thêm vào `comic_db` (và tương tự `auth_db`):

```sql
CREATE TABLE comic_outbox (
  id          BIGSERIAL PRIMARY KEY,
  event_type  VARCHAR(100) NOT NULL,
  payload     JSONB NOT NULL,
  published   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON comic_outbox (published, created_at) WHERE published = FALSE;
```

```typescript
// Trong transaction khi publish chapter:
await prisma.$transaction([
  prisma.chapter.update({ where: { id }, data: { status: 'PUBLISHED' } }),
  prisma.comicOutbox.create({ data: { event_type: 'comic.chapter.published', payload } }),
]);
// Relay cron (5s): scan WHERE published = FALSE → Kafka emit → mark published = TRUE
```

**Prisma schema** (thêm vào `prisma/schema.prisma` trong Phase 0):
```prisma
model ComicOutbox {
  id         BigInt   @id @default(autoincrement())
  event_type String   @db.VarChar(100)
  payload    Json
  published  Boolean  @default(false)
  created_at DateTime @default(now()) @db.Timestamptz

  @@index([published, created_at])
  @@map("comic_outbox")
}
```

---

## JWT — Verify Locally Với JWKS

```
Auth Service        →  GET /.well-known/jwks.json  (RSA public key)
                                    │
                          fetch 1 lần lúc startup
                          cache lại, refresh 24h
                                    │
Comic / Storage / BFF  →  jwtVerify(token, cachedPublicKey)  ← 0ms network
```

**Inter-service headers** (propagate RequestContext qua HTTP):
```
Authorization:    Bearer {jwt}
X-User-Id:        {userId}
X-Request-Id:     {requestId}
X-Correlation-Id: {correlationId}
X-Internal-Secret: {INTERNAL_API_SECRET}  ← bảo vệ /internal/* endpoints
```

**Chỉ gọi Auth Service khi:**
- RBAC check có group/context scope: `POST /internal/rbac/check`
- Batch user data lookup: `GET /internal/users?ids=...`
- Token blacklist check (logout): `POST /internal/token/verify-blacklist`

---

## Circuit Breaker — Tránh Cascade Failure

Dùng `cockatiel` (Node.js):

```typescript
// packages/circuit-breaker/src/circuit-breaker.service.ts
const authBreaker = Policy.handleAll()
  .circuitBreaker(10_000, new ConsecutiveBreaker(5));

const result = await authBreaker.execute(() => authClient.getUsers(userIds));
// Nếu Auth Service fail 5 lần liên tiếp → circuit opens → dùng fallback
```

| Scenario | Fallback |
|----------|----------|
| Auth Service down | Dùng cached RBAC (TTL 5 phút) |
| Comic Service chậm | BFF trả partial response (bỏ section đó) |
| Notification Service down | Kafka message giữ trong queue, retry sau |
| Config Service down | in-memory cache (TTL 1 giờ) |

---

## Kafka Topics

| Topic | Producer | Consumer | Trigger |
|-------|----------|----------|---------|
| `comic.chapter.published` | Comic | Notification | Chapter status → PUBLISHED |
| `comic.comment.created` | Comic | Notification | Comment/reply mới |
| `user.followed.comic` | Comic | Notification | User follow |
| `user.unfollowed.comic` | Comic | Notification | User unfollow |
| `user.registered` | Auth | Notification | Đăng ký thành công |
| `user.password.reset` | Auth | Notification | Reset password |
| `contact.submitted` | Main | Notification | Form liên hệ |

**Schema evolution rule:** Chỉ được **thêm field**, không xóa/rename. Enforce bằng TypeScript types trong `packages/shared-types`.

**Partitioning:** `comic.chapter.published` → partition by `comic_id` (đảm bảo thứ tự per comic).

---

## Redis — Mỗi Service Một Instance

| Service | Redis | Keys |
|---------|-------|------|
| Auth | `auth-redis:6379` | `auth:rbac:*`, `auth:blacklist:*`, `auth:attempt:*`, `auth:bull:*` |
| Comic | `comic-redis:6379` | `comic:views:buffer`, `comic:cache:*` |
| Notification | `notif-redis:6379` | `notif:bull:*` |
| BFF | `bff-redis:6379` | `bff:homepage:*` |
| Config | in-memory LRU | — |
| Storage | không cần | — |

**Lý do tách:** Nếu `notif-redis` chết, chỉ email bị delay — comic vẫn đọc bình thường.

---

## Docker Compose (Local Dev)

```yaml
# infrastructure/docker-compose.yml
services:
  # ── Kafka Stack ──────────────────────────────────────────
  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    ports: ["2181:2181"]
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    ports: ["9092:9092"]
    depends_on: [zookeeper]
    environment:
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    ports: ["8080:8080"]
    environment:
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092

  # ── PostgreSQL (1 per service) ────────────────────────────
  auth-db:
    image: postgres:15-alpine
    environment: { POSTGRES_DB: auth_db, POSTGRES_PASSWORD: secret }
    ports: ["5433:5432"]

  comic-db:
    image: postgres:15-alpine
    environment: { POSTGRES_DB: comic_db, POSTGRES_PASSWORD: secret }
    ports: ["5434:5432"]

  notif-db:
    image: postgres:15-alpine
    environment: { POSTGRES_DB: notif_db, POSTGRES_PASSWORD: secret }
    ports: ["5435:5432"]

  config-db:
    image: postgres:15-alpine
    environment: { POSTGRES_DB: config_db, POSTGRES_PASSWORD: secret }
    ports: ["5436:5432"]

  main-db:
    image: postgres:15-alpine
    environment: { POSTGRES_DB: main_db, POSTGRES_PASSWORD: secret }
    ports: ["5437:5432"]

  # ── Redis (1 per service) ─────────────────────────────────
  auth-redis:
    image: redis:7-alpine
    ports: ["6380:6379"]

  comic-redis:
    image: redis:7-alpine
    ports: ["6381:6379"]

  notif-redis:
    image: redis:7-alpine
    ports: ["6382:6379"]

  bff-redis:
    image: redis:7-alpine
    ports: ["6383:6379"]
```

---

## Cấu Trúc Monorepo (Nx)

```
comic-platform/                      ← Nx monorepo root
├── apps/
│   ├── comic-service/               :3001
│   │   ├── src/modules/{comic,chapter,comment,follow,stats,...}/
│   │   ├── src/kafka/               ← Kafka producers
│   │   ├── src/auth/                ← JwtLocalGuard (packages/auth-client)
│   │   ├── src/cron/outbox-relay.service.ts
│   │   └── prisma/schema.prisma     ← chỉ comic domain tables
│   │
│   ├── auth-service/                :3002
│   │   ├── src/modules/{auth,rbac,user,role,permission,context,group}/
│   │   ├── src/jwks/jwks.controller.ts        ← GET /.well-known/jwks.json
│   │   ├── src/internal/users.controller.ts   ← GET /internal/users?ids=
│   │   └── prisma/schema.prisma
│   │
│   ├── storage-service/             :3003
│   ├── notification-service/        :3004
│   │   ├── src/modules/{notification,content-template,queue}/
│   │   ├── src/kafka/consumers/
│   │   │   ├── chapter-published.consumer.ts
│   │   │   ├── user-followed.consumer.ts      ← cập nhật projection
│   │   │   └── user-registered.consumer.ts
│   │   └── src/kafka/projections/comic-followers.projection.ts
│   │
│   ├── config-service/              :3005
│   ├── bff-service/                 :3006
│   └── main-service/                :3000  ← Post, Introduction, Marketing
│
├── packages/
│   ├── shared-types/                ← Kafka event payload types, shared DTOs
│   │   └── src/events/
│   │       ├── chapter-published.event.ts
│   │       ├── comment-created.event.ts
│   │       ├── user-followed.event.ts
│   │       └── user-registered.event.ts
│   │
│   ├── auth-client/                 ← SDK dùng trong mọi service
│   │   └── src/
│   │       ├── jwks.service.ts      ← fetch + cache RSA public key
│   │       ├── jwt-local.guard.ts   ← NestJS guard verify locally
│   │       ├── rbac-check.client.ts ← POST /internal/rbac/check
│   │       └── users.client.ts      ← GET /internal/users?ids=
│   │
│   ├── kafka-client/                ← wrapper @nestjs/microservices Kafka
│   ├── circuit-breaker/             ← cockatiel wrapper
│   └── prisma-helpers/              ← shared Prisma utilities
│
└── infrastructure/
    ├── docker-compose.yml
    ├── nginx/nginx.conf
    ├── kafka/topics.json
    └── k8s/
```

---

## Lộ Trình Di Chuyển (Strangler Fig Pattern)

```
Tháng 1         Tháng 2        Tháng 3-4       Tháng 5-6      Tháng 6
┌───────────┬──────────────┬───────────────┬───────────────┬──────────────┐
│ Phase 0   │   Phase 1    │   Phase 2     │   Phase 3     │  Phase 4     │
│ Chuẩn bị  │Storage + BFF │ Auth + Config │    Comic      │ Notification │
│ 2-3 tuần  │  1-2 tuần   │   3-4 tuần   │   4-6 tuần   │  2-3 tuần   │
└───────────┴──────────────┴───────────────┴───────────────┴──────────────┘
```

### Phase 0: Chuẩn bị (2-3 tuần)

**Mục tiêu:** Không thay đổi behavior — chỉ thêm abstraction layer và infrastructure.

1. Setup Nx monorepo, migrate code hiện tại vào `apps/main-service/`
2. Tạo `packages/shared-types` — định nghĩa Kafka event types
3. Auth Service generate RSA key pair, expose `GET /.well-known/jwks.json`
4. Tạo `packages/auth-client` — implement `JwtLocalGuard` verify với public key
5. **Wrap `SecurityGuard` với `IAuthorizationService` interface**:
   - `LocalAuthorizationService` — impl hiện tại (không đổi)
   - `DistributedAuthorizationService` — dùng JWKS + HTTP fallback
   - Toggle qua `AUTH_MODE=local|distributed`
6. Thêm `ComicOutbox` model vào `prisma/schema.prisma`
7. Cập nhật `docker-compose.yml` — thêm Kafka, Zookeeper, Kafka UI, các DB và Redis riêng
8. Thêm `/health` endpoint cho mọi module
9. Setup OpenTelemetry — trace propagation qua `traceparent` header
10. **Shadow test** — khi `AUTH_MODE=distributed`, log divergence nhưng không thay đổi response

**Files cần sửa:**
- `src/common/auth/guards/security.guard.ts` — extract `IAuthorizationService`
- `src/common/common.module.ts` — DI binding cho guard
- `prisma/schema.prisma` — thêm `ComicOutbox` model
- `docker-compose.yml` — thêm Kafka stack

**Kiểm tra:** Toggle `AUTH_MODE=distributed` trong staging → 100% response match với `local` mode → Phase 0 done.

---

### Phase 1: Tách Storage Service + BFF Service (1-2 tuần)

**Storage Service** (`apps/storage-service/`):
- Copy `FileUploadModule` + strategies (local, S3, Cloudinary)
- Dùng `JwtLocalGuard` từ `packages/auth-client`
- Nginx route `/api/upload/*` → `storage-service:3003`
- Monolith thay `UploadService` bằng `StorageServiceClient` (HTTP)

**BFF Service** (`apps/bff-service/`):
- `HomepageService` gọi HTTP tới Comic Service và Main Service
- Redis cache riêng (`bff-redis:6379`), TTL 2 phút
- Nginx route `/api/homepage` → `bff-service:3006`
- Xóa `HomepageModule` khỏi monolith

**Kiểm tra:** E2E tests upload flow và homepage. Load test với k6 scripts (`loadtest/`).

---

### Phase 2: Tách Auth Service + Config Service (3-4 tuần)

**Config Service** (trước, không có auth dependency):
- Copy `SystemConfigModule`, `MenuModule`, `LocationModule`
- Expose read-only REST API
- Monolith dùng `ConfigServiceClient` + in-memory LRU cache

**Auth Service**:
- Move: `AuthModule`, `RbacModule`, `UserModule`, `ContextModule`, `GroupModule`, `RoleModule`, `PermissionModule`
- Move: `TokenBlacklistService`, `AttemptLimiterService` từ `src/core/security/`
- Move: `ContentTemplateModule` (tạm, chuyển sang Notification Service ở Phase 4)
- **Dual-write DB 2 tuần** — ghi cả `auth_db` lẫn monolith DB, so sánh
- **Shadow JWT validation** — verify bằng cả Passport local VÀ JWKS, log divergence
- Swap `SecurityGuard` từ `local` → `distributed` mode
- Expose: `/.well-known/jwks.json`, `/internal/users`, `/internal/rbac/check`
- Kafka publish: `user.registered`, `user.password.reset` (qua Outbox Pattern)

**Kiểm tra:** 100% login/logout/RBAC flow. Shadow test 1 tuần không có divergence.

---

### Phase 3: Tách Comic Service (4-6 tuần) — Phase Quan Trọng Nhất

**Chuẩn bị data migration:**
```bash
# Dump comic domain tables từ monolith DB
pg_dump --table=comic --table=chapter --table=chapter_page \
  --table=comic_category --table=comic_category_on_comic \
  --table=comic_comment --table=comic_review --table=comic_view \
  --table=comic_follow --table=reading_history --table=bookmark \
  --table=comic_stats --table=comic_daily_stats \
  monolith_db > comic_domain.sql

psql comic_db < comic_domain.sql

# Enable PostgreSQL logical replication monolith → comic_db (giữ 2-3 tuần)
```

**Enable Kafka (toggle `EVENT_DRIVER=kafka`):**
- `ComicNotificationService` publish Kafka events thay vì ghi DB trực tiếp
- Outbox relay cron bắt đầu publish events
- Verify events xuất hiện trong Kafka UI

**BFF Service**: Đổi `comicClient` từ gọi monolith → gọi `comic-service:3001`

**Cut over:**
1. Nginx route `/api/comics/*` → `comic-service:3001`
2. Shadow test 1 tuần — so sánh response
3. Tắt replication, remove comic tables khỏi monolith DB

**Kiểm tra:** Comic CRUD, chapter publish → Kafka → Notification fanout, ComicViewCronService flush đúng DB.

---

### Phase 4: Tách Notification Service (2-3 tuần)

1. Tạo `notif_db`, migrate `notifications` table
2. Seed `comic_followers_projection`:
   ```sql
   INSERT INTO comic_followers_projection (user_id, comic_id, followed_at)
   SELECT user_id, comic_id, created_at FROM comic_follows;
   ```
3. Wire tất cả Kafka consumers
4. Move `ContentTemplateModule` từ Auth Service sang Notification Service
5. Test email delivery end-to-end (register, reset password, new chapter)
6. Remove `NotificationModule`, `QueueWorkerModule`, `ContentTemplateModule` khỏi monolith

---

## Observability

| Tool | Mục đích | Setup khi nào |
|------|----------|---------------|
| OpenTelemetry + Jaeger | Distributed tracing (`traceparent` header) | Phase 0 |
| Prometheus + Grafana | Metrics (request rate, error rate, latency p99) | Phase 1 |
| Kafka UI | Monitor topics, consumer lag | Phase 0 local, Phase 3 prod |
| Logtail (đã có) | Centralized logging — extend với `service`, `traceId` fields | Phase 0 |
| `/health` endpoint | Kubernetes readiness/liveness probe | Phase 0 |

---

## Rollback Plan

Mỗi phase có toggle riêng — **không hard-cut**, luôn chạy song song ≥ 1 tuần:

| Phase | Toggle để rollback | Trạng thái data |
|-------|-------------------|-----------------|
| Phase 0 | `AUTH_MODE=local` | Không có thay đổi data |
| Phase 1 | Comment out Nginx routing rule | Traffic về monolith |
| Phase 2 | `AUTH_MODE=local`, dual-write còn active | Data vẫn sync 2 DB |
| Phase 3 | Nginx revert, replication còn active | Data vẫn sync 2 DB |
| Phase 4 | Re-enable direct DB writes, pause Kafka consumers | Không mất notification |

---

## Tech Stack Bổ Sung

| Tool | Mục đích | Khi nào thêm |
|------|----------|--------------|
| `@nestjs/microservices` (Kafka transport) | Kafka pub/sub | Phase 3 |
| `jose` | JWT verify locally với JWKS (RS256) | Phase 2 |
| `cockatiel` | Circuit breaker | Phase 2 |
| Nx | Monorepo + shared packages | Phase 0 |
| `@opentelemetry/sdk-node` | Distributed tracing | Phase 0 |
| Debezium (optional) | CDC thay cho dual-write — dùng nếu team lớn | Phase 2-3 |
| Kubernetes | Container orchestration | Phase 4+ |

---

## Trade-offs

| Quyết định | Lý do |
|------------|-------|
| PostgreSQL (không MySQL) | Codebase đang dùng `pg` adapter + PostgreSQL 15 |
| JWT verify locally | Tránh network call cho mỗi request — JWT đã stateless |
| Notification duy trì local projection | Tránh sync call đến Comic Service khi fanout. Eventual consistency chấp nhận được cho notification |
| BFF tách khỏi Comic Service | Homepage cần data từ nhiều domain — đặt trong Comic Service tạo cross-domain dependency ngược |
| Redis riêng mỗi service | Tránh single point of failure. Isolation cho mỗi workload |
| Outbox Pattern | Đảm bảo event không mất khi service crash giữa DB transaction |
| Auth Service slim | Single Responsibility — Config/Location không liên quan đến identity |
| Introduction/Marketing giữ monolith | Traffic thấp, không có lợi ích khi tách |
| Monorepo (Nx) | Team nhỏ — share DTOs, Kafka event types, auth-client trong `packages/shared` |

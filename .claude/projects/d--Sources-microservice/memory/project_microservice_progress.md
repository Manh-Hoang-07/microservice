---
name: Microservice Migration Progress
description: Trạng thái tiến độ của dự án microservice migration từ monolith NestJS
type: project
---

Đang migrate monolith NestJS (683 TS files, 45+ Prisma models) sang 7 services theo kiến trúc trong MICROSERVICE_ARCHITECTURE.md.

**Why:** Comic platform cần scale độc lập, notification fanout đang block request thread.

**How to apply:** Dùng file này để nắm context khi tiếp tục các phase tiếp theo.

## Phase 0 — DONE

- `kafkajs` và `jose` đã cài
- **Shared Event Types**: `src/shared/events/` (5 event interfaces)
- **Auth abstraction**: `IAuthorizationService` + `LocalAuthorizationService` + `DistributedAuthorizationService` + `JwksService`
- **SecurityGuard** refactored dùng `AUTHORIZATION_SERVICE` token — toggle `AUTH_MODE=local|distributed`
- **KafkaModule** (`src/kafka/`) — global, no-op khi `EVENT_DRIVER=local`
- **ComicOutbox** model thêm vào `prisma/schema.prisma` + `prisma generate` đã chạy
- **OutboxRelayService** cron 5s scan outbox → Kafka publish
- **ComicNotificationService** toggle: `EVENT_DRIVER=kafka` → write outbox; local → write DB trực tiếp
- **HealthModule** `GET /api/health` — public, check DB + Redis + Kafka
- **docker-compose.yml** có đủ: Kafka + Zookeeper + Kafka UI + 5 PostgreSQL + 5 Redis

## Phase 1 — DONE

- **packages/auth-client**: `JwtLocalGuard` — verify JWT via JWKS (dev: bypass nếu `AUTH_JWKS_URL` chưa set)
- **apps/storage-service** (:3003): **Hoàn toàn standalone**, KHÔNG import từ monolith `src/`
  - `src/config/storage.config.ts` — registerAs('storage', ...) riêng
  - `src/guards/jwt.guard.ts` — JwtGuard inline (không dùng @auth-client)
  - `src/common/permission.decorator.ts` — Permission, Public decorators
  - `src/upload/` — toàn bộ upload logic (interface, 3 strategies, 2 services, controller, module, dtos)
  - Endpoints: POST /upload/file, POST /upload/files, GET /upload, GET /upload/allowed-types, GET /upload/meta/:filename, GET /upload/:filename, DELETE /upload/:filename
- **apps/web-api-service** (:3006) — đổi tên từ `gateway-service` (2026-05-02): aggregator BFF cho FE
  - `src/config/web-api.config.ts` — registerAs('webApi', ...)
  - Modules còn lại: `homepage/` (aggregate 6 endpoint comic+post), `search/` (cross-service search). Hai module proxy `comics/` + `posts/` đã xoá vì chỉ là cache wrapper trùng lặp với upstream service.
  - Class prefix: `WebApiAppModule`, `WebApiHomepageService`, `WebApiSearchService`, `WebApiCacheService`
  - Redis: container `web-api-redis`, env `WEB_API_REDIS_URL`, key prefix `web-api:`
  - Routes: `GET /homepage`, `DELETE /homepage/cache`, `GET /search?q=`
  - **Lý do rename**: tên cũ "gateway" gây hiểu lầm vì Nginx mới là API gateway thực sự (routing/auth/rate-limit). Service này chỉ là BFF cho FE.
- **infrastructure/nginx/nginx.conf**: API Gateway routing (upstream `web_api_service`)
- **docker-compose.yml** thêm: nginx + storage-service + web-api-service containers
- **Scripts**: `npm run start:storage` (port 3003), `npm run start:web-api` (port 3006)

## Nguyên tắc kiến trúc đã áp dụng
- Mỗi service có `src/config/` riêng với `registerAs` pattern (như `src/core/config/` của monolith)
- Mỗi service có guard và decorator riêng — không dùng shared package
- tsconfig của mỗi service KHÔNG có path alias `@/*` hay `@auth-client/*`
- Monolith `src/` không bị sửa khi làm microservice

## Phase 2 — DONE

- **apps/auth-service** (:3002): Standalone hoàn toàn
  - `prisma/schema.prisma` riêng: User, Profile, Context, Group, UserGroup, Permission, Role, RoleHasPermission, RoleContext, UserRoleAssignment, AuthOutbox
  - `src/jwks/jwks.service.ts` — sinh RSA key pair khi startup (dev: ephemeral, prod: load từ JWT_PRIVATE_KEY_PEM/JWT_PUBLIC_KEY_PEM)
  - `GET /.well-known/jwks.json` — excluded khỏi global prefix 'api', expose cho các service khác verify JWT
  - `GET /internal/users?ids=...` + `POST /internal/rbac/check` — bảo vệ bằng X-Internal-Secret header
  - AuthModule (login, register, OAuth, OTP, token RS256, password)
  - RbacModule (service, cache, permission-index, role-assignment, orchestrator)
  - SecurityModule (TokenBlacklistService, AttemptLimiterService, RedisService)
  - KafkaModule + OutboxRelayService (cron 5s) publish user.registered, user.password.reset
  - JwtGuard dùng JwksService.getPublicKey() trực tiếp (không fetch remote JWKS)

- **apps/config-service** (:3005): Standalone hoàn toàn
  - `prisma/schema.prisma` riêng: GeneralConfig, EmailConfig, Menu, Country, Province, Ward
  - Menu: `required_permission_code String?` thay FK → không phụ thuộc auth domain
  - SystemConfigModule (general + email CRUD), MenuModule (tree), LocationModule (country/province/ward)
  - InternalGuard (X-Internal-Secret) bảo vệ email config endpoint

- **nginx.conf**: thêm routes cho /api/auth/*, /api/users/*, /api/roles/*, /api/permissions/*, /api/groups/*, /api/contexts/*, /api/rbac/*, /.well-known/jwks.json (auth-service), /api/config/*, /api/menus/*, /api/countries/*, /api/provinces/* (config-service)
- **docker-compose.yml**: thêm auth-service + config-service containers
- **package.json**: thêm install:auth, install:config, start:auth, start:config

## Còn lại

- **Phase 3**: Comic Service (:3001) — phase quan trọng nhất, data migration + Kafka toggle
- **Phase 4**: Notification Service (:3004) — Kafka consumers, fanout notification, email queue

## Cách run local

```bash
# Infrastructure
docker-compose up -d main-db main-redis kafka zookeeper

# Main service (monolith)
npm run start:dev

# Storage Service
npm run start:storage

# Web API Service
npm run start:web-api
```

## Env vars quan trọng

- `AUTH_MODE=local|distributed` (default: local)
- `EVENT_DRIVER=local|kafka` (default: local)
- `AUTH_JWKS_URL` — bắt buộc khi AUTH_MODE=distributed
- `COMIC_SERVICE_URL` — web-api-service gọi đến (default: main service)
- `WEB_API_REDIS_URL` — Redis cho web-api cache
- `KAFKA_BROKERS` — bắt buộc khi EVENT_DRIVER=kafka

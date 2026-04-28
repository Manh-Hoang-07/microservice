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
- **apps/storage-service** (:3003): Reuse `FileUploadModule` từ monolith, `JwtLocalGuard` global guard
- **apps/bff-service** (:3006): `ComicClient` + `MainClient` HTTP, `BffCacheService` (ioredis), `BffHomepageService` gọi song song 6 endpoints
- **infrastructure/nginx/nginx.conf**: API Gateway routing `/api/upload/*` → storage, `/api/homepage` → bff, rest → main
- **docker-compose.yml** thêm: nginx + storage-service + bff-service containers
- **Scripts**: `npm run start:storage` (port 3003), `npm run start:bff` (port 3006)

## Còn lại

- **Phase 2**: Auth Service (:3002) + Config Service (:3005)
- **Phase 3**: Comic Service (:3001) — phase quan trọng nhất, data migration
- **Phase 4**: Notification Service (:3004)

## Cách run local

```bash
# Infrastructure
docker-compose up -d main-db main-redis kafka zookeeper

# Main service (monolith)
npm run start:dev

# Storage Service
npm run start:storage

# BFF Service
npm run start:bff
```

## Env vars quan trọng

- `AUTH_MODE=local|distributed` (default: local)
- `EVENT_DRIVER=local|kafka` (default: local)
- `AUTH_JWKS_URL` — bắt buộc khi AUTH_MODE=distributed
- `COMIC_SERVICE_URL` — BFF gọi đến (default: main service)
- `BFF_REDIS_URL` — Redis cho BFF cache
- `KAFKA_BROKERS` — bắt buộc khi EVENT_DRIVER=kafka

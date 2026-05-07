# Kien truc tong quan

## Cau truc thu muc

```
microservice/
├── apps/                          # Cac microservice
│   ├── auth-service/              # Xac thuc, JWT, OAuth
│   ├── iam-service/               # Phan quyen RBAC
│   ├── config-service/            # Cau hinh he thong
│   ├── storage-service/           # Upload file
│   ├── notification-service/      # Gui email, thong bao
│   ├── marketing-service/         # Banner, quang cao
│   ├── introduction-service/      # Gioi thieu, nhan su
│   ├── post-service/              # Bai viet CMS
│   ├── comic-service/             # Truyen tranh, chapter
│   └── web-api-service/           # API tong hop cho frontend
├── shared/                        # Thu vien dung chung
│   ├── shared-types/              # Type, interface dung chung
│   ├── bootstrap/                 # Khoi tao app NestJS (logger, health, CORS...)
│   ├── common/                    # Decorators, guards, filters, pipes
│   ├── config/                    # Module doc env
│   ├── redis/                     # Redis client wrapper
│   ├── kafka-client/              # Kafka producer/consumer
│   ├── circuit-breaker/           # Circuit breaker pattern
│   ├── tracing/                   # OpenTelemetry integration
│   └── auth-client/               # JWT verification client
├── infrastructure/                # Cau hinh ha tang
│   ├── docker/                    # Dockerfile (prod + dev), entrypoint.sh
│   ├── nginx/                     # Nginx config (prod + dev)
│   ├── k8s/                       # Kubernetes templates
│   ├── monitoring/                # Prometheus alerts
│   └── pgbouncer/                 # PgBouncer config
├── scripts/                       # Script tien ich
│   ├── deploy/                    # Script deploy
│   ├── smoke/                     # Health check, load test
│   ├── check-env.sh               # Kiem tra env
│   ├── generate-keys.sh           # Tao JWT key pair
│   └── backup-databases.sh        # Backup DB
├── docker-compose.yml             # Docker Compose day du (infra + services)
├── docker-compose.dev.yml         # Docker Compose cho dev (chi Kafka + Nginx + Jaeger)
├── ecosystem.config.js            # PM2 config cho VPS deploy
└── package.json                   # Root workspace config
```

## Cau truc ben trong moi service

Moi service theo kien truc **DDD (Domain-Driven Design)** + **Hexagonal Architecture**:

```
apps/<service>/
├── src/
│   ├── main.ts                    # Entry point
│   ├── app.module.ts              # Root module
│   ├── <domain>/                  # Cac domain cua service
│   │   ├── domain/                # Entity, value object, repository interface
│   │   ├── application/           # Use case, DTO, service
│   │   └── infrastructure/        # Repository implementation, controller
│   └── generated/                 # Prisma generated client (tu dong)
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration files
├── .env.example                   # Mau env
├── package.json
└── tsconfig.json
```

## Danh sach Service

| Service | Port | DB | Redis | Kafka | Prefix |
|---------|-----:|----|-------|-------|--------|
| auth-service | 3001 | auth_db | auth-redis | producer | `/api/auth` |
| iam-service | 3002 | iam_db | iam-redis | — | `/api/iam` |
| config-service | 3003 | config_db | — | — | `/api/config` |
| storage-service | 3004 | — | — | — | `/api/storage` |
| notification-service | 3005 | notification_db | notification-redis | consumer | `/api/notifications` |
| marketing-service | 3006 | marketing_db | — | producer | `/api/marketing` |
| introduction-service | 3007 | introduction_db | — | — | `/api/introduction` |
| post-service | 3008 | post_db | post-redis | producer | `/api/posts` |
| comic-service | 3009 | comic_db | comic-redis | producer | `/api/comics` |
| web-api-service | 3010 | — | web-api-redis | — | `/api/web` |

## Luong Request

```
Client (Browser/App)
    │
    ▼
  Nginx (port 80) ── API Gateway
    │  Route theo prefix: /api/auth/*, /api/comics/*, ...
    │
    ├──► auth-service (:3001)     ── PostgreSQL (auth_db) + Redis
    ├──► iam-service (:3002)      ── PostgreSQL (iam_db) + Redis
    ├──► config-service (:3003)   ── PostgreSQL (config_db)
    ├──► storage-service (:3004)  ── File system / S3 / Cloudinary
    ├──► notification-service (:3005) ── PostgreSQL (notification_db) + Redis
    ├──► marketing-service (:3006)    ── PostgreSQL (marketing_db)
    ├──► introduction-service (:3007) ── PostgreSQL (introduction_db)
    ├──► post-service (:3008)     ── PostgreSQL (post_db) + Redis
    ├──► comic-service (:3009)    ── PostgreSQL (comic_db) + Redis
    └──► web-api-service (:3010)  ── Redis (goi noi bo toi comic + post service)
```

## Luong Xac thuc (JWT)

1. Client goi `POST /api/auth/login` → auth-service tra ve `accessToken` + `refreshToken`
2. auth-service ky token bang **RS256** (private key)
3. Client gui token trong header: `Authorization: Bearer <accessToken>`
4. Cac service khac xac minh token qua **JWKS endpoint**: `GET /.well-known/jwks.json`
5. Khong can goi truc tiep auth-service — chi can public key tu JWKS

## Luong Event (Kafka)

```
auth-service ──publish──► [mail.send] ──consume──► notification-service ──► Gui email
comic-service ──publish──► [comic.chapter.published] ──consume──► notification-service
post-service ──publish──► [post.published] ──consume──► notification-service
marketing-service ──publish──► [marketing.*] ──consume──► notification-service
```

- Producer dung **outbox pattern** (ghi event vao DB truoc, sau do gui len Kafka)
- Consumer co **DLQ** (Dead Letter Queue): neu xu ly that bai nhieu lan → chuyen sang topic `*.dlq`
- Neu khong dung Kafka, dat `EVENT_DRIVER=local` (event chi trong process, khong cross-service)

## Giao tiep noi bo giua cac Service

- **web-api-service** goi HTTP noi bo toi `comic-service` va `post-service` de tong hop du lieu cho frontend
- Cac service dung `INTERNAL_API_SECRET` (shared secret) de xac thuc cuoc goi noi bo
- `INTERNAL_API_SECRET` phai giong nhau tren tat ca service

## Shared Packages

| Package | Chuc nang |
|---------|-----------|
| `shared-types` | Type, interface, enum dung chung |
| `bootstrap` | Khoi tao NestJS app: logger, health endpoint, CORS, graceful shutdown |
| `common` | Decorators, guards (JWT, RBAC), filters, pipes, interceptors |
| `config` | Module doc bien moi truong (.env) |
| `redis` | Redis client wrapper voi connection pooling |
| `kafka-client` | Kafka producer/consumer, outbox, DLQ |
| `circuit-breaker` | Circuit breaker cho HTTP calls |
| `tracing` | OpenTelemetry auto-instrumentation |
| `auth-client` | JWT verification, JWKS client |

Tat ca shared packages phai duoc build truoc khi service su dung:

```bash
npm run build:shared
```

## Health Check

Moi service expose:

- `GET /api/v1/health` — Liveness: process dang chay
- `GET /api/v1/health/ready` — Readiness: kiem tra ket noi DB + Redis
- `GET /.well-known/jwks.json` — Chi auth-service: cong khai public key JWT

Docker Compose va Nginx deu dung `/api/v1/health/ready` lam health check.

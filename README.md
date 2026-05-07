# Comic Platform — Backend Microservices

Backend cho nền tảng truyện tranh, xây dựng bằng **NestJS** + **Prisma** theo kiến trúc **microservices monorepo**.

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL (mỗi service 1 DB riêng)
- **Cache:** Redis
- **Message Broker:** Apache Kafka (KRaft mode)
- **Auth:** JWT RS256 + JWKS
- **API Gateway:** Nginx
- **Container:** Docker & Docker Compose
- **Process Manager:** PM2 (cho VPS deploy)
- **Observability:** OpenTelemetry + Jaeger

## Danh sach Service

| Service | Port | Prefix | Chuc nang |
|---------|-----:|--------|-----------|
| auth-service | 3001 | `/api/auth` | Dang ky, dang nhap, JWT, OAuth Google |
| iam-service | 3002 | `/api/iam` | Phan quyen RBAC, quan ly role |
| config-service | 3003 | `/api/config` | Cau hinh he thong, quoc gia, email |
| storage-service | 3004 | `/api/storage` | Upload file, anh (local/S3/Cloudinary) |
| notification-service | 3005 | `/api/notifications` | Gui email, thong bao (Kafka consumer) |
| marketing-service | 3006 | `/api/marketing` | Banner, quang cao |
| introduction-service | 3007 | `/api/introduction` | Gioi thieu, nhan su |
| post-service | 3008 | `/api/posts` | Bai viet, danh muc CMS |
| comic-service | 3009 | `/api/comics` | Truyen tranh, chapter, the loai |
| web-api-service | 3010 | `/api/web` | API tong hop cho frontend |

## Tai lieu

| Tai lieu | Mo ta |
|----------|-------|
| [Kien truc tong quan](docs/architecture/overview.md) | Cau truc thu muc, tech stack, luong chay |
| [Chay local (khong Docker)](docs/development/local-setup.md) | Huong dan cai dat va chay tren may |
| [Chay Docker cho dev](docs/development/docker-dev.md) | Dung Docker Compose cho moi truong dev |
| [Deploy Docker production](docs/deployment/docker-production.md) | Build image va deploy bang Docker |
| [Deploy VPS bang PM2](docs/deployment/vps-deploy.md) | Deploy len VPS, CI/CD, rollback |
| [Database Migration](docs/deployment/database-migration.md) | Quan ly migration voi Prisma |
| [Van hanh & Xu ly su co](docs/operations/runbook.md) | Health check, backup, xu ly loi |

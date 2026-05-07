# Chay Local (khong Docker)

Huong dan chay toan bo he thong tren may dev ma khong can Docker cho service.
Infrastructure (PostgreSQL, Redis, Kafka) co the cai truc tiep hoac chay bang Docker.

## Yeu cau

- **Node.js** >= 20 + npm
- **PostgreSQL** 15+ (moi service 1 database rieng)
- **Redis** 7+ (cho cac service co cache)
- **Kafka** (chi can khi dung `EVENT_DRIVER=kafka`)

> **Tip:** Co the chay infra bang Docker trong khi service chay tren host:
> ```bash
> npm run docker:infra
> ```
> Lenh nay khoi dong PostgreSQL, Redis, Kafka, Jaeger ma khong khoi dong cac service.

## Buoc 1: Cai dat dependencies

```bash
npm install
```

Lenh nay se tu dong build cac shared packages (do script `postinstall`).

## Buoc 2: Tao file .env cho tung service

Moi service doc env tu thu muc rieng cua no, **KHONG** phai tu root:

```bash
# Copy .env.example thanh .env cho tung service
cp apps/auth-service/.env.example apps/auth-service/.env
cp apps/iam-service/.env.example apps/iam-service/.env
cp apps/config-service/.env.example apps/config-service/.env
cp apps/storage-service/.env.example apps/storage-service/.env
cp apps/notification-service/.env.example apps/notification-service/.env
cp apps/marketing-service/.env.example apps/marketing-service/.env
cp apps/introduction-service/.env.example apps/introduction-service/.env
cp apps/post-service/.env.example apps/post-service/.env
cp apps/comic-service/.env.example apps/comic-service/.env
cp apps/web-api-service/.env.example apps/web-api-service/.env
```

Cac gia tri quan trong can sua:

| Bien | Mo ta | Vi du |
|------|-------|-------|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://postgres:postgres@localhost:5433/auth_db` |
| `REDIS_URL` | Connection string Redis | `redis://:password@localhost:6380` |
| `KAFKA_BROKERS` | Dia chi Kafka broker | `localhost:9093` |
| `EVENT_DRIVER` | Driver event: `kafka` hoac `local` | `local` (dev khong can Kafka) |
| `AUTH_JWKS_URL` | URL JWKS cua auth-service | `http://localhost:3001/.well-known/jwks.json` |
| `INTERNAL_API_SECRET` | Secret dung chung giua cac service | Bat ky chuoi >= 32 ky tu |

## Buoc 3: Tao database

Moi service co DB rieng. Port mac dinh khi chay Docker infra:

| Service | Port | Database |
|---------|-----:|----------|
| auth-service | 5433 | auth_db |
| comic-service | 5434 | comic_db |
| notification-service | 5435 | notification_db |
| config-service | 5436 | config_db |
| post-service | 5438 | post_db |
| introduction-service | 5439 | introduction_db |
| marketing-service | 5440 | marketing_db |
| iam-service | 5441 | iam_db |

> storage-service va web-api-service khong co database.

Neu cai PostgreSQL truc tiep (khong Docker), tao database thu cong:

```sql
CREATE DATABASE auth_db;
CREATE DATABASE comic_db;
CREATE DATABASE notification_db;
CREATE DATABASE config_db;
CREATE DATABASE post_db;
CREATE DATABASE introduction_db;
CREATE DATABASE marketing_db;
CREATE DATABASE iam_db;
```

## Buoc 4: Chay migration

```bash
# Chay migration cho tat ca service co DB
npm run prisma:migrate
```

Hoac chay rieng tung service:

```bash
npm -w apps/auth-service run prisma:migrate
npm -w apps/comic-service run prisma:migrate
# ... tuong tu cho cac service khac
```

## Buoc 5: Tao JWT key pair

Auth-service can cap key RSA de ky JWT:

```bash
bash scripts/generate-keys.sh
```

Copy noi dung private key va public key vao file `.env` cua auth-service:
- `JWT_PRIVATE_KEY_PEM`
- `JWT_PUBLIC_KEY_PEM`

## Buoc 6: Khoi dong

### Chay tat ca service cung luc

```bash
# Mode development (hot-reload voi ts-node)
npm run dev

# Hoac mode start (ts-node khong hot-reload)
npm run start
```

### Chay rieng 1 vai service

```bash
# Chi chay auth + web-api de test nhanh
npm run dev:auth
npm run dev:web-api
```

### Cac lenh start co san

| Lenh | Mo ta |
|------|-------|
| `npm run dev` | Chay tat ca 10 service (hot-reload) |
| `npm run start` | Chay tat ca 10 service |
| `npm run dev:auth` | Chi chay auth-service |
| `npm run dev:comic` | Chi chay comic-service |
| `npm run dev:<ten>` | Chi chay 1 service cu the |

## Buoc 7: Kiem tra

Sau khi khoi dong, kiem tra health:

```bash
# Kiem tra tung service
curl http://localhost:3001/api/v1/health    # auth-service
curl http://localhost:3009/api/v1/health    # comic-service
curl http://localhost:3010/api/v1/health    # web-api-service
```

Hoac dung script kiem tra tat ca:

```bash
bash scripts/smoke/service-health.sh http://localhost
```

## Su dung Nginx lam API Gateway (tuy chon)

Thay vi goi truc tiep tung service qua port rieng, co the dung Nginx lam gateway thong nhat:

```bash
# Khoi dong Nginx dev (proxy toi cac service tren host)
npm run nginx:up

# Tat
npm run nginx:down
```

Sau do goi API qua port 80:

```bash
curl http://localhost/api/auth/v1/health
curl http://localhost/api/comics/public/comics
```

## Luu y quan trong

1. **File .env nam trong thu muc service**, khong phai root. Vi du: `apps/auth-service/.env`
2. **`INTERNAL_API_SECRET` phai giong nhau** tren tat ca service
3. **`EVENT_DRIVER=local`** neu khong chay Kafka — event chi trong process, khong gui cross-service
4. **Prisma chi ho tro PostgreSQL** trong project nay. MySQL/SQLite se khong hoat dong
5. **Build shared truoc** neu gap loi import: `npm run build:shared`

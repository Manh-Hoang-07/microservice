# Deploy Docker cho Production

Huong dan build Docker image va deploy len production.
Ap dung cho ca **single-host** (1 may chay tat ca) va **multi-host** (moi VPS 1 service).

## Cach Dockerfile hoat dong

Project dung 1 Dockerfile duy nhat cho tat ca service: `infrastructure/docker/Dockerfile.service`.
Truyen `SERVICE_NAME` de chi dinh service can build.

### Quy trinh build (3 stage)

```
Stage 1: deps     → npm ci (cai tat ca dependencies, cache lai)
Stage 2: build    → build shared/ + build dung 1 service duoc chi dinh
Stage 3: runtime  → Image nhe (Alpine), chi chua dist/ + node_modules production
```

Du build context la toan bo monorepo, nhung **chi compile dung 1 service**.
Image cuoi chi chua nhung gi service do can de chay.

### Build 1 service

```bash
docker build \
  -f infrastructure/docker/Dockerfile.service \
  --build-arg SERVICE_NAME=auth-service \
  --build-arg SERVICE_PORT=3001 \
  -t comic-auth-service:latest \
  .
```

### Bang SERVICE_NAME va SERVICE_PORT

| SERVICE_NAME | SERVICE_PORT |
|-------------|-------------|
| auth-service | 3001 |
| iam-service | 3002 |
| config-service | 3003 |
| storage-service | 3004 |
| notification-service | 3005 |
| marketing-service | 3006 |
| introduction-service | 3007 |
| post-service | 3008 |
| comic-service | 3009 |
| web-api-service | 3010 |

---

## Phuong an 1: Single-Host (Docker Compose)

Chay tat ca service + infra tren 1 may.

### Yeu cau

- Docker & Docker Compose
- Ram >= 8GB, CPU >= 4 cores
- Domain + SSL/TLS (hoac reverse proxy phia truoc)

### Buoc 1: Cau hinh env

```bash
cp .env.docker.example .env.docker
```

**Bat buoc phai dat:**

| Bien | Mo ta |
|------|-------|
| `INTERNAL_API_SECRET` | >= 32 ky tu, giong nhau tren moi service |
| `JWT_PRIVATE_KEY_PEM` | RSA private key (PEM format) |
| `JWT_PUBLIC_KEY_PEM` | RSA public key (PEM format) |

**Nen dat cho production:**

| Bien | Mo ta |
|------|-------|
| `CORS_ORIGINS` | Danh sach domain cho phep (khong dung `*`) |
| `POSTGRES_PASSWORD` | Mat khau PostgreSQL (>= 16 ky tu) |
| `REDIS_PASSWORD` | Mat khau Redis |

### Buoc 2: Kiem tra env

```bash
bash scripts/check-env.sh --env-file .env.docker
```

### Buoc 3: Build va deploy

```bash
docker compose --env-file .env.docker up -d --build
```

### Buoc 4: Kiem tra health

```bash
bash scripts/smoke/service-health.sh http://localhost
```

Hoac kiem tra thu cong:

```bash
curl http://localhost:3001/api/v1/health        # auth-service
curl http://localhost:3001/api/v1/health/ready   # readiness (DB + Redis)
curl http://localhost/.well-known/jwks.json      # JWKS qua Nginx
```

### Cap nhat service

```bash
# Build lai va restart 1 service
docker compose --env-file .env.docker up -d --build auth-service

# Build lai tat ca
docker compose --env-file .env.docker up -d --build
```

---

## Phuong an 2: Multi-Host (moi VPS 1 service)

Moi VPS chi chay 1 service. Phu hop khi muon scale va deploy doc lap.

### Quy trinh tren moi VPS

#### 1. Cai Docker

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
```

#### 2. Clone code va build

```bash
git clone <REPO_URL> /srv/microservice
cd /srv/microservice

# Build chi service can thiet (vi du: auth-service)
docker build \
  -f infrastructure/docker/Dockerfile.service \
  --build-arg SERVICE_NAME=auth-service \
  --build-arg SERVICE_PORT=3001 \
  -t comic-auth-service:latest \
  .
```

#### 3. Tao file env

```bash
cp apps/auth-service/.env.example /srv/microservice/.env.production
```

Sua `.env.production` voi cac gia tri production thuc te:
- `DATABASE_URL` tro toi DB server
- `REDIS_URL` tro toi Redis server
- `AUTH_JWKS_URL` tro toi auth-service (URL public)
- `KAFKA_BROKERS` tro toi Kafka cluster
- `INTERNAL_API_SECRET` giong nhau tren moi service

#### 4. Chay container

```bash
docker run -d \
  --name auth-service \
  --env-file /srv/microservice/.env.production \
  -p 3001:3001 \
  --restart unless-stopped \
  comic-auth-service:latest
```

#### 5. Kiem tra

```bash
curl http://localhost:3001/api/v1/health
curl http://localhost:3001/api/v1/health/ready
```

### Deploy phien ban moi

```bash
cd /srv/microservice

# Lay code moi
git pull origin master

# Build lai image
docker build \
  -f infrastructure/docker/Dockerfile.service \
  --build-arg SERVICE_NAME=auth-service \
  --build-arg SERVICE_PORT=3001 \
  -t comic-auth-service:latest \
  .

# Restart container
docker stop auth-service && docker rm auth-service
docker run -d \
  --name auth-service \
  --env-file /srv/microservice/.env.production \
  -p 3001:3001 \
  --restart unless-stopped \
  comic-auth-service:latest
```

### Rollback

```bash
# Xem danh sach image cu
docker images comic-auth-service

# Tag image hien tai truoc khi build moi
docker tag comic-auth-service:latest comic-auth-service:backup

# Khi can rollback
docker stop auth-service && docker rm auth-service
docker run -d \
  --name auth-service \
  --env-file /srv/microservice/.env.production \
  -p 3001:3001 \
  --restart unless-stopped \
  comic-auth-service:backup
```

---

## Toi uu hoa: Dung Container Registry

Thay vi build tren moi VPS, co the build 1 lan roi push len registry:

```bash
# Build tren may CI/CD
docker build \
  -f infrastructure/docker/Dockerfile.service \
  --build-arg SERVICE_NAME=auth-service \
  --build-arg SERVICE_PORT=3001 \
  -t registry.example.com/comic/auth-service:v1.2.3 \
  .

# Push len registry
docker push registry.example.com/comic/auth-service:v1.2.3

# Tren VPS, chi can pull va chay
docker pull registry.example.com/comic/auth-service:v1.2.3
docker run -d \
  --name auth-service \
  --env-file .env.production \
  -p 3001:3001 \
  --restart unless-stopped \
  registry.example.com/comic/auth-service:v1.2.3
```

Loi ich:
- VPS khong can clone source code
- Build nhanh hon (CI/CD manh hon VPS)
- De dang rollback bang cach chay lai image version cu

---

## Database Migration trong Docker

Entrypoint cua container (`infrastructure/docker/entrypoint.sh`) **tu dong chay** `prisma migrate deploy` moi khi container khoi dong.

- An toan: `prisma migrate deploy` la idempotent (chay lai khong loi)
- Bo qua migration: dat `SKIP_MIGRATIONS=1` trong env (vi du: read-only replica)
- Service khong co Prisma (storage-service, web-api-service) se tu dong bo qua

## Luu y quan trong

1. **Khong dung `prisma migrate dev` tren production** — co the xoa va tao lai DB
2. **Build context la toan bo monorepo** nhung chi compile 1 service
3. **Them `.dockerignore`** de giam kich thuoc build context (loai `node_modules`, `.git`)
4. **Image dung Alpine** — nhe, nhanh, bao mat tot hon
5. **Entrypoint dung `dumb-init`** — xu ly SIGTERM dung de container tat gracefully

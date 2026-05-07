# Chay Docker cho Dev

Huong dan su dung Docker Compose trong moi truong development.
Co 2 cach chay: **chi infra** (service chay tren host) hoac **toan bo** (tat ca trong Docker).

---

## Cach 1: Chi chay Infrastructure bang Docker (khuyen nghi)

Cach nay chay PostgreSQL, Redis, Kafka, Jaeger trong Docker, con service chay tren host (npm).
Day la cach nhanh nhat de dev vi co hot-reload.

### Khoi dong infra

```bash
npm run docker:infra
```

Lenh nay khoi dong:
- 8 PostgreSQL containers (moi service 1 DB)
- 6 Redis containers
- Kafka + Kafka UI
- Jaeger (tracing)

### Tat infra

```bash
npm run docker:infra:down
```

### Chay service tren host

```bash
# Tao .env va chay migration (xem docs/development/local-setup.md)
npm run dev
```

### Them Nginx API Gateway (tuy chon)

```bash
npm run nginx:up      # Khoi dong Nginx dev (proxy toi host)
npm run nginx:down    # Tat Nginx
```

Nginx dev dung `host.docker.internal` de proxy request tu port 80 toi cac service tren host.

---

## Cach 2: Chay toan bo bang Docker (infra + service)

Cach nay chay tat ca trong Docker. Phu hop khi muon test moi truong giong production.

### Buoc 1: Tao file .env.docker

```bash
cp .env.docker.example .env.docker
```

Sua cac gia tri can thiet trong `.env.docker`:
- `INTERNAL_API_SECRET` (>= 32 ky tu)
- `JWT_PRIVATE_KEY_PEM`, `JWT_PUBLIC_KEY_PEM` (RSA key pair)
- Password cho Redis, Kafka UI

### Buoc 2: Build va khoi dong

```bash
docker compose --env-file .env.docker up -d --build
```

Lenh nay se:
1. Build image cho tat ca 10 service (dung `Dockerfile.service`)
2. Khoi dong infra (DB, Redis, Kafka)
3. Tu dong chay `prisma migrate deploy` cho moi service (trong entrypoint.sh)
4. Khoi dong cac service

### Buoc 3: Kiem tra

```bash
# Xem trang thai
docker compose ps

# Xem log 1 service
docker compose logs -f auth-service

# Health check
curl http://localhost:3001/api/v1/health
```

Hoac qua Nginx (port 80):

```bash
curl http://localhost/api/auth/v1/health
```

### Tat toan bo

```bash
docker compose --env-file .env.docker down
```

Xoa ca volume (mat du lieu):

```bash
docker compose --env-file .env.docker down -v
```

---

## Cach 3: Chay Docker dev voi hot-reload

Dung `docker-compose.dev.yml` ket hop `Dockerfile.dev` de chay service trong Docker nhung co hot-reload.

> Luu y: Cach nay cham hon cach 1 vi file watching qua Docker volume. Chi dung khi can test moi truong Docker.

```bash
docker compose -f docker-compose.dev.yml up -d
```

File nay chi khoi dong Kafka, Kafka UI, Jaeger, Nginx. Cac service van chay tren host.

---

## Build chi 1 service

Khi chi muon build lai 1 service ma khong build lai tat ca:

```bash
# Chi build auth-service
docker compose --env-file .env.docker build auth-service

# Build va restart
docker compose --env-file .env.docker up -d --build auth-service
```

## Cac cong truy cap

| Dich vu | URL | Ghi chu |
|---------|-----|---------|
| Nginx Gateway | http://localhost | API gateway chung |
| Kafka UI | http://localhost:8080 | Giao dien quan ly Kafka |
| Jaeger UI | http://localhost:16686 | Xem trace request |
| auth-service | http://localhost:3001 | Truy cap truc tiep |
| comic-service | http://localhost:3009 | Truy cap truc tiep |
| ... | http://localhost:{port} | Xem bang port o trang tong quan |

## Xem log va debug

```bash
# Xem log tat ca service
docker compose --env-file .env.docker logs -f

# Xem log 1 service cu the
docker compose --env-file .env.docker logs -f comic-service

# Vao shell container
docker compose --env-file .env.docker exec auth-service sh

# Xem trang thai
docker compose --env-file .env.docker ps
```

## Luu y

1. **Lan dau build se lau** vi tai dependencies. Lan sau nhanh hon nho Docker cache.
2. **Doi DB healthy truoc** khi service khoi dong — Docker Compose da cau hinh `depends_on` + `healthcheck`.
3. **Neu service loi**, xem log truoc: `docker compose logs <service-name>`.
4. **Khong can tao database thu cong** — Docker Compose tu tao thong qua bien `POSTGRES_DB`.

# Van hanh & Xu ly su co

Tai lieu danh cho nguoi van hanh he thong (on-call, devops).

## Bang Service

| Service | Port | DB | Redis | Kafka | Health Check |
|---------|-----:|----|-------|-------|-------------|
| auth-service | 3001 | auth_db | auth-redis | producer | `http://localhost:3001/api/v1/health` |
| iam-service | 3002 | iam_db | iam-redis | — | `http://localhost:3002/api/v1/health` |
| config-service | 3003 | config_db | — | — | `http://localhost:3003/api/v1/health` |
| storage-service | 3004 | — | — | — | `http://localhost:3004/api/v1/health` |
| notification-service | 3005 | notification_db | notification-redis | consumer | `http://localhost:3005/api/v1/health` |
| marketing-service | 3006 | marketing_db | — | producer | `http://localhost:3006/api/v1/health` |
| introduction-service | 3007 | introduction_db | — | — | `http://localhost:3007/api/v1/health` |
| post-service | 3008 | post_db | post-redis | producer | `http://localhost:3008/api/v1/health` |
| comic-service | 3009 | comic_db | comic-redis | producer | `http://localhost:3009/api/v1/health` |
| web-api-service | 3010 | — | web-api-redis | — | `http://localhost:3010/api/v1/health` |

## Health Check Endpoints

Moi service expose 2 endpoint:

| Endpoint | Chuc nang | Khi nao tra loi |
|----------|-----------|-----------------|
| `GET /api/v1/health` | Liveness — process dang chay | Luon tra 200 neu app up |
| `GET /api/v1/health/ready` | Readiness — DB + Redis ket noi duoc | 200 neu OK, 503 neu mat ket noi |

**Dac biet:** auth-service con co `GET /.well-known/jwks.json` (public key JWT, khong co prefix `/api/v1`).

Nginx health: `GET /nginx-health` tra 200.

---

## Xu ly su co thuong gap

### Service khong truy cap duoc tu frontend

1. Kiem tra service con song khong:
   ```bash
   curl http://localhost:<port>/api/v1/health
   ```
2. Neu 200 → van de o Nginx, DNS, hoac mang
3. Neu 503 (readiness fail) → kiem tra DB hoac Redis
4. Neu khong tra loi → kiem tra process:
   ```bash
   # PM2
   pm2 status
   pm2 logs <service>

   # Docker
   docker compose ps
   docker compose logs <service>
   ```

### Dang nhap that bai

- Kiem tra auth-service:
  ```bash
  curl http://localhost:3001/api/v1/health/ready
  ```
- Kiem tra DB auth_db co bi lock khong
- Xem log co `ThrottlerException` khong (rate limit)
- Google OAuth: kiem tra `GOOGLE_CLIENT_ID` va callback URL

### Thong bao khong gui duoc

notification-service la Kafka consumer. Kiem tra:

1. Service co dang chay khong: `curl http://localhost:3005/api/v1/health`
2. Kafka consumer lag (topic `mail.send`, `comic.chapter.published`...)
3. DLQ co message khong:
   ```bash
   # Trong Docker
   docker exec comic-kafka kafka-console-consumer \
     --bootstrap-server kafka:9092 \
     --topic mail.send.dlq \
     --from-beginning --max-messages 5
   ```
4. Kiem tra cau hinh SMTP trong env (MAIL_HOST, MAIL_USER, MAIL_PASS)

### Het ket noi database (connection exhausted)

- Moi service mac dinh `connection_limit=5`. Voi 8 service co DB × N replicas → tong ket noi tang nhanh
- Xu ly nhanh: giam so replicas
- Xu ly lau dai: bat PgBouncer (transaction mode)
  ```bash
  docker compose --profile pgbouncer up -d pgbouncer
  ```

### Service restart lien tuc (crash loop)

1. Xem log loi:
   ```bash
   pm2 logs <service> --lines 50
   # hoac
   docker compose logs --tail 50 <service>
   ```
2. Kiem tra env co thieu bien bat buoc khong
3. Kiem tra DB migration da chay chua
4. Kiem tra RAM (PM2 mac dinh restart khi vuot 768MB)

---

## Backup Database

### Cau hinh

- Script: `scripts/backup-databases.sh`
- Lich: chay cron luc 02:30 hang ngay
- Luu tai: `/var/backups/comic-platform/yyyy-mm-dd/<db>.sql.gz`
- Giu lai: 7 ban ngay + 4 ban tuan + 12 ban thang

### Cai cron

```bash
# Mo crontab
crontab -e

# Them dong
30 2 * * * /srv/microservice/app/scripts/backup-databases.sh >> /var/log/comic-platform/backup.log 2>&1
```

### Test restore

```bash
gunzip -c /var/backups/comic-platform/<ngay>/comic_db.sql.gz \
  | pg_restore -h localhost -U postgres -d comic_db_restore_test
```

> Nen test restore dinh ky (it nhat moi quy 1 lan).

---

## Rotate JWT Key (khong downtime)

1. Tao key pair moi:
   ```bash
   openssl genrsa -out private-new.pem 2048
   openssl rsa -in private-new.pem -pubout -out public-new.pem
   ```

2. Chuyen key hien tai sang PREVIOUS, dat key moi lam CURRENT:
   ```
   JWT_PRIVATE_KEY_PEM_PREVIOUS = <key cu>
   JWT_PUBLIC_KEY_PEM_PREVIOUS  = <key cu>
   JWT_PRIVATE_KEY_PEM          = <key moi>
   JWT_PUBLIC_KEY_PEM           = <key moi>
   ```

3. Restart auth-service. JWKS endpoint se tra ve ca 2 key (cu + moi).

4. Doi het thoi gian token (mac dinh 7 ngay cho refresh token).

5. Xoa cac bien `*_PREVIOUS` va restart lai.

## Rotate INTERNAL_API_SECRET

- Hien tai chua ho tro multi-key — se co gian doan ngan khi secret khac nhau giua cac service
- Nen rotate luc it traffic
- Cap nhat **dong thoi** tren tat ca service roi restart

---

## Smoke Test sau deploy

```bash
# Kiem tra health tat ca service
bash scripts/smoke/service-health.sh http://localhost

# Kiem tra JWKS (auth-service)
curl -fsS http://localhost:3001/.well-known/jwks.json | jq .keys[0].kid

# Kiem tra qua Nginx
curl http://localhost/api/auth/v1/health
curl http://localhost/api/comics/public/comics
```

---

## Quy trinh xu ly su co

1. **Nhan biet** — Nhan alert/bao loi trong vong 5 phut
2. **Xac dinh** — Service nao bi anh huong
   ```bash
   pm2 status          # hoac docker compose ps
   ```
3. **Kiem tra deploy gan day**
   ```bash
   git log --oneline -5    # Co deploy trong 30 phut qua?
   ```
4. **Neu lien quan deploy** → rollback truoc, dieu tra sau
5. **Neu khong** → xem log, kiem tra DB/Redis/Kafka
6. **Thong bao** — Cap nhat trang thai cho team
7. **Sau khi xu ly** — Viet post-mortem ngan (loi gi, tai sao, cach phong tranh)

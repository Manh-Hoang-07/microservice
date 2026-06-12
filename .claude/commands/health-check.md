Kiem tra health cua cac service. Tham so: $ARGUMENTS

Cach dung:
- `/health-check` → Kiem tra tat ca service
- `/health-check auth-service` → Kiem tra 1 service cu the

## Thuc hien

### Danh sach service va port

| Service | Port |
|---------|-----:|
| auth-service | 3001 |
| iam-service | 3002 |
| config-service | 3003 |
| storage-service | 3004 |
| notification-service | 3005 |
| cms-service | 3006 |
| post-service | 3008 |
| comic-service | 3009 |
| web-api-service | 3010 |

Health endpoint KHONG co global prefix (da exclude trong bootstrap).
- Liveness: `GET /health`
- Readiness (kiem tra DB/Redis/Kafka): `GET /health/ready`

### Kiem tra tat ca
```bash
for port in 3001 3002 3003 3004 3005 3006 3008 3009 3010; do
  curl -fsS "http://localhost:$port/health" >/dev/null 2>&1 \
    && echo "OK   :$port" || echo "FAIL :$port"
done
```

### Kiem tra 1 service (chi tiet)
```bash
curl -s http://localhost:<port>/health | jq .
curl -s http://localhost:<port>/health/ready | jq .
```

### Bao cao
Hien thi ket qua dang bang:
- Service nao dang chay (200 OK)
- Service nao loi (503 hoac khong tra loi)
- Neu co service loi, goi y kiem tra log: `pnpm --filter <service> logs` hoac `docker logs <container>`

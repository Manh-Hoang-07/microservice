# Kế hoạch đưa hệ thống lên Production

> **Trạng thái hiện tại**: Phase 0–3 đã thực hiện ở mức khả thi từ máy dev. Cần thực thi/verify trên môi trường thật trước khi go-live.
> **Mục tiêu**: Đẩy hệ thống lên production an toàn, có khả năng vận hành ổn định.

## Tiến độ hiện tại (đã làm)

- ✅ **Dockerfile multi-stage**: `infrastructure/docker/Dockerfile.service`
- ✅ **Fail-fast secrets**: `docker-compose.yml`, `.env.docker.example`, `scripts/check-env.sh`
- ✅ **Migration automation**: `infrastructure/docker/entrypoint.sh` chạy `prisma migrate deploy`
- ✅ **K8s templates**: `infrastructure/k8s/`
- ✅ **Ops docs**: `docs/RUNBOOK.md`, `docs/MIGRATIONS.md`

## Còn lại (cần verify trên staging/production)

- ⏳ Load test chuẩn (k6/Artillery) thay vì `ab` basic
- ⏳ Security review (OWASP ZAP / dependency review)
- ⏳ Staging deploy + canary/rollback rehearsal

## Checklist tổng — Done khi prod-ready

**Bắt buộc**:

- [ ] Secrets không nằm trong git (không commit `.env*`)
- [ ] `INTERNAL_API_SECRET` ≥ 32 chars và đồng bộ trên mọi service
- [ ] JWT signing keys (RS256) set đúng và có quy trình rotate
- [ ] Migrations dùng `prisma migrate deploy` (KHÔNG dùng `migrate dev` trên prod)
- [ ] Health/ready endpoints hoạt động (`/api/v1/health`, `/api/v1/health/ready`)
- [ ] Metrics endpoint hoạt động (`/api/v1/metrics`)
- [ ] Backup chạy định kỳ và đã test restore

**Nên có**:

- [ ] Monitoring + alerting đầy đủ (Prometheus/Grafana)
- [ ] PgBouncer khi scale nhiều replicas
- [ ] S3/MinIO policy tối thiểu quyền

## Tham chiếu

- Hướng dẫn deploy: `docs/deploy/PRODUCTION_DEPLOYMENT.md`
- Multi-host deploy độc lập: `docs/deploy/MULTI_HOST_PRODUCTION.md`
- K8s templates: `infrastructure/k8s/README.md`
- Runbook: `docs/RUNBOOK.md`
- Migrations: `docs/MIGRATIONS.md`


---
description: Quy tac bao mat va phan quyen
globs: apps/*/src/**/*.ts
---

# Bao mat & Phan quyen

4 decorator co san trong `@package/common`:

- `@Permission('module.manage')` — Admin route. JwtGuard verify token, RbacGuard goi IAM service kiem tra quyen.
- `@Public()` — Route cong khai, khong can dang nhap. Van try set user neu co token.
- `@Internal()` + `@UseGuards(InternalGuard)` — Route noi bo giua cac service. Xac thuc bang header `x-internal-secret`.
- `@AuditLog({ action })` — Ghi audit trail JSON cho create/update/delete. Tu dong redact field nhay cam.

Thong tin user nam trong `req.user` (JWT payload). `req.user.sub` la user ID. Truyen xuong service lam `created_user_id` / `updated_user_id`.

Group scope qua header `x-group-id` — IAM service xu ly, KHONG can xu ly trong code service.

RBAC cache Redis 60 giay, circuit breaker mo sau 5 loi. Dev mode (khong cau hinh IAM) cho phep tat ca.

INTERNAL_API_SECRET phai giong nhau tren moi service, so sanh timing-safe.

---
description: Quy tac bao mat va phan quyen
globs: apps/*/src/**/*.ts
---

# Bao mat & Phan quyen

5 decorator co san trong `@package/common`:

- `@Permission('module.manage')` — Admin route. JwtGuard verify token, RbacGuard goi IAM service kiem tra quyen.
- `@Authenticated()` — Route chi yeu cau user da dang nhap, KHONG check permission cu the. JwtGuard verify token, RbacGuard skip IAM. Dung cho `/me`, `/profile`, bookmarks, comments, ... cua user thuong.
- `@Public()` — Route cong khai, khong can dang nhap. Van try set user neu co token.
- `@Internal()` + `@UseGuards(InternalGuard)` — Route noi bo giua cac service. Xac thuc bang header `x-internal-secret`.
- `@AuditLog({ action })` — Ghi audit trail JSON cho create/update/delete. Tu dong redact field nhay cam.

Thong tin user nam trong `req.user` (JWT payload). `req.user.sub` la user ID. Truyen xuong service lam `created_user_id` / `updated_user_id`.

Permission toan cuc, khong scope theo group. Header `x-group-id` da go bo hoan toan — BE khong doc.

RBAC cache Redis 60 giay (versioned theo `rbac:meta.version`), circuit breaker mo sau 5 loi. Dev mode (NODE_ENV=development va khong cau hinh IAM_INTERNAL_URL) cho phep tat ca. Staging/production fail-closed.

INTERNAL_API_SECRET phai giong nhau tren moi service, so sanh timing-safe.

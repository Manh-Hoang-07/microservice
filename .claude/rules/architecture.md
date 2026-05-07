---
description: Quy tac kien truc module trong moi service
globs: apps/*/src/modules/**/*.ts
---

# Kien truc Module

Moi domain module trong `src/modules/<domain>/` gom 3 lop:

- **admin/** — CRUD cho quan tri vien, bao ve boi `@Permission()`. Controller chi nhan input va goi service, KHONG chua business logic.
- **public/** — API cong khai (read-only), dung `@Public()`. Co Redis cache cho du lieu it thay doi.
- **repositories/** — Data access, ke thua `PrismaRepository` tu `@package/common`. Override `buildWhere()` de custom filter.

Service ke thua `BaseService` tu `@package/common`, override lifecycle hooks thay vi viet lai method:
- `prepareFilters` — filter/search
- `beforeCreate` / `afterCreate` — slug, validate, sync relations
- `beforeUpdate` / `afterUpdate` — verify ton tai, refresh slug
- `beforeDelete` / `afterDelete` — verify ton tai, don dep
- `transform` — format response

DTO list ke thua `BaseListQueryDto` (co san page, limit, search, sort, skipCount).

Module dang ky controllers + providers + export repository.

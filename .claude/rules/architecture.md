---
description: Quy tac kien truc module trong moi service
globs: apps/*/src/modules/**/*.ts
---

# Kien truc Module

Moi domain module trong `src/modules/<domain>/` chia theo **lop audience**. Co dung 4 ten lop (chi dung tap con can thiet — khong ep tao du 4), moi lop ung voi 1 decorator xac thuc:

| Lop | Decorator | Doi tuong / pham vi |
|-----|-----------|---------------------|
| **admin/** | `@Permission()` | Super admin, quan ly moi ban ghi |
| **user/** | `@Authenticated()` | User dang nhap, du lieu CUA CHINH HO (my groups, profile, bookmarks) |
| **group/** | `@PermissionGroup()` | Thanh vien/chu nhom, thao tac TRONG MOT nhom (groupId tu route param) |
| **public/** | `@Public()` | An danh, read-only. Redis cache cho du lieu it thay doi |

- Controller chi nhan input + goi service, KHONG chua business logic.
- Lop `group/` thuong la **delegator** mong: tai dung service cua `admin/` + tiem scope `groupId` (loc theo nhom, kiem tra ban ghi thuoc nhom). KHONG viet lai CRUD.
- **repositories/** — Data access dung chung cho ca 4 lop, ke thua `PrismaRepository` tu `@package/common`. Override `buildWhere()` de custom filter. (Khong phai lop audience.)

> Luu y: rieng module `group`, lop group-scoped la `group/group/` (lap chu la cosmetic). Giu class name mo ta (vd `GroupOwnerService`) de khong trung voi `admin/`.

Service ke thua `BaseService` tu `@package/common`, override lifecycle hooks thay vi viet lai method:
- `prepareFilters` — filter/search
- `beforeCreate` / `afterCreate` — slug, validate, sync relations
- `beforeUpdate` / `afterUpdate` — verify ton tai, refresh slug
- `beforeDelete` / `afterDelete` — verify ton tai, don dep
- `transform` — format response

DTO list ke thua `BaseListQueryDto` (co san page, limit, search, sort, skipCount).

Module dang ky controllers + providers + export repository.

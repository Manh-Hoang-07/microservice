# Kế hoạch: API Chủ nhóm (Group Owner)

## Bối cảnh

Mô hình hiện tại:
- **Admin** (`group.manage`) — CRUD nhóm, quản lý thành viên toàn hệ thống
- **User** (`/user/groups`) — chỉ xem danh sách nhóm mình đang tham gia

Cần thêm lớp **Owner** — chủ nhóm (`group.ownerId === req.user.sub`) quản lý nhóm của riêng mình mà không cần quyền `group.manage`.

---

## Menu của chủ nhóm

| # | Menu | Mô tả |
|---|------|--------|
| 1 | **Nhóm của tôi** | Xem danh sách nhóm mình là chủ |
| 2 | **Thông tin nhóm** | Xem chi tiết nhóm (name, description, context, status) |
| 3 | **Danh sách thành viên** | Xem + tìm kiếm thành viên theo phân trang |
| 4 | **Thêm thành viên** | Thêm user vào nhóm theo userId |
| 5 | **Xóa thành viên** | Xóa user ra khỏi nhóm |
| 6 | **Phân vai trò** | Gán / thu hồi vai trò cho thành viên trong phạm vi nhóm |

> **Có nên cho phân vai trò không?**
> Có. Model `UserRoleAssignment` đã thiết kế scope theo `(userId, roleId, groupId)`. Chủ nhóm phân vai trò cho thành viên **trong nhóm của mình** là hợp lý và không vượt phạm vi. Chỉ được gán các role thuộc context của nhóm (`RoleContext`).

---

## API Endpoints

Base route: `/owner/groups` — service: `iam-service` (port 3002)

### Bảo mật
- Tất cả routes dùng `@Permission('user')` — yêu cầu **JWT hợp lệ** + IAM check permission code `'user'`
  - Khác `@Public()`: `@Public()` bỏ qua JWT hoàn toàn; `@Permission('user')` bắt buộc phải có token hợp lệ
  - User ID lấy từ `session()` (async context) — giống `user-group.controller.ts` hiện có
- `GroupOwnerGuard`: áp dụng **sau** JWT guard, kiểm tra `group.ownerId === BigInt(session().userId)`. Throw `ForbiddenException` nếu không phải chủ nhóm.
- Không cần `@Permission('group.manage')` — ownership IS the authorization

### Endpoints

| Method | Route | Guard bổ sung | Mô tả |
|--------|-------|---------------|--------|
| `GET` | `/owner/groups` | — | Danh sách nhóm mình là chủ (`ownerId = me`) |
| `GET` | `/owner/groups/:id` | `GroupOwnerGuard` | Chi tiết nhóm |
| `GET` | `/owner/groups/:id/members` | `GroupOwnerGuard` | Danh sách thành viên (phân trang) |
| `POST` | `/owner/groups/:id/members` | `GroupOwnerGuard` | Thêm thành viên (`{ userId }`) |
| `DELETE` | `/owner/groups/:id/members/:userId` | `GroupOwnerGuard` | Xóa thành viên |
| `GET` | `/owner/groups/:id/roles` | `GroupOwnerGuard` | Danh sách role khả dụng của context nhóm |
| `GET` | `/owner/groups/:id/members/:userId/roles` | `GroupOwnerGuard` | Xem vai trò hiện tại của 1 thành viên |
| `POST` | `/owner/groups/:id/members/:userId/roles` | `GroupOwnerGuard` | Gán vai trò cho thành viên (`{ roleId }`) |
| `DELETE` | `/owner/groups/:id/members/:userId/roles/:roleId` | `GroupOwnerGuard` | Thu hồi vai trò |

---

## Cấu trúc file

```
apps/iam-service/src/modules/group/
└── owner/
    ├── controllers/
    │   └── owner-group.controller.ts
    ├── services/
    │   └── owner-group.service.ts
    ├── guards/
    │   └── group-owner.guard.ts
    └── dtos/
        ├── list-owner-members.query.dto.ts
        └── assign-role.dto.ts          ← { roleId: bigint }
```

Đăng ký trong `group.module.ts`:
- Controller: `OwnerGroupController`
- Provider: `OwnerGroupService`
- Guard: `GroupOwnerGuard` (module-level hoặc per-controller `@UseGuards`)

---

## Logic chính

### `GroupOwnerGuard`
```
1. Lấy groupId từ route param ':id'
2. Gọi GroupRepository.findById(id) → lấy group
3. So sánh group.ownerId === BigInt(session().userId)
4. Nếu không khớp → ForbiddenException(t(i18n, 'group.NOT_OWNER'))
5. Gắn group vào request (req.group) để service tái sử dụng, tránh query lại
```

> Route `GET /owner/groups` (list) không dùng guard vì filter theo ownerId trong query.

### `OwnerGroupService`

| Method | Logic |
|--------|-------|
| `getMyGroups(ownerId)` | `repo.findMany({ ownerId })` — thêm filter `ownerId` vào `GroupRepository.buildWhere` |
| `getGroupDetail(id)` | Lấy từ `req.group` (guard đã inject, không query lại) |
| `getMembers(groupId, query)` | `repo.getMembers(groupId, skip, take)` |
| `addMember(groupId, userId)` | `repo.addMember` + `rbacCache.clearAllUserCaches(userId)` |
| `removeMember(groupId, userId)` | `repo.removeMember` + `rbacCache.clearAllUserCaches(userId)` |
| `getAvailableRoles(groupId)` | Query `prisma.roleContext.findMany({ where: { contextId: group.contextId }, include: { role: true } })` → trả về roles thuộc context nhóm |
| `getMemberRoles(groupId, userId)` | `prisma.userRoleAssignment.findMany({ where: { groupId, userId }, include: { role: true } })` |
| `assignRole(groupId, userId, roleId)` | Dùng `RbacRoleAssignmentService.assignRoleToUser(userId, roleId, groupId)` trực tiếp (không qua `RbacService` — bỏ qua privilege escalation check vì chủ nhóm là trusted role) + `rbacCache.clearAllUserCaches(userId)` |
| `revokeRole(groupId, userId, roleId)` | `prisma.userRoleAssignment.deleteMany({ where: { userId, roleId, groupId } })` + `rbacCache.clearAllUserCaches(userId)` |

### Tại sao không dùng `RbacService.assignRoleToUser`?

`RbacService.assignRoleToUser` có `assertCallerCanGrantRole` — kiểm tra người gọi phải tự mình có **tất cả các permission** của role đang gán. Chủ nhóm thường không đáp ứng điều kiện này.

Thay vào đó dùng `RbacRoleAssignmentService.assignRoleToUser` (gọi thẳng repo, không có escalation check), nhưng tự validate:
- Role phải thuộc context của nhóm (`RoleContext` check trước khi gán)
- User phải là thành viên của nhóm trước khi gán role

### Chuỗi scoping Role → Context → Group

```
Context (type, refId)
    └── roleContexts[] → Role   ← chỉ role được phép trong context này
    └── groups[]       → Group  ← nhóm thuộc context này

Khi chủ nhóm gán role:
  1. Lấy group.contextId
  2. Query RoleContext WHERE roleId = ? AND contextId = group.contextId
  3. Nếu không tồn tại → BadRequest("role không thuộc context nhóm")
  4. Nếu hợp lệ → UserRoleAssignment.create({ userId, roleId, groupId })
```

---

## Thay đổi cần thiết ở các file hiện có

| File | Thay đổi |
|------|----------|
| `group.repository.ts` | Thêm filter `ownerId` vào `buildWhere()` và `GroupFilter` type |
| `group.module.ts` | Thêm `OwnerGroupController`, `OwnerGroupService`, `GroupOwnerGuard` vào providers/controllers |
| `app.module.ts` | Không cần thay — `GroupModule` đã registered |

---

## Schema — không cần migration

Tất cả bảng cần đã có:
- `groups` — có `owner_id`
- `user_groups` — join table thành viên
- `user_role_assignments` — role scoped theo group
- `role_contexts` — filter role theo context

---

## Test plan

```
tests/group/owner/
├── owner-group.service.spec.ts   — unit test service methods
└── group-owner.guard.spec.ts     — unit test guard logic
```

---

## Thứ tự thực hiện

1. `GroupOwnerGuard` — guard cốt lõi
2. Thêm `ownerId` filter vào `GroupRepository`
3. `OwnerGroupService` — các methods cơ bản (getMyGroups → removeMember)
4. `OwnerGroupController` — wire endpoints
5. Đăng ký vào `GroupModule`
6. Role assignment methods trong service + controller
7. Viết unit tests

# Tích hợp IAM Service — Tài liệu API cho Frontend

> **Base URL:** `/api/iam` (qua Nginx proxy -> iam-service:3002)
>
> Tất cả path bên dưới đều có prefix `/api/iam`. Ví dụ: `GET /api/iam/admin/roles`

---

## Mô hình phân quyền

```
User ──hasMany──> UserRoleAssignment ──belongsTo──> Role ──hasMany──> Permission
```

- **User** có nhiều **Role** (qua `UserRoleAssignment`)
- **Role** có nhiều **Permission** (qua `RoleHasPermission`)
- Permission và Role đều có thể phân cấp (`parentId`)
- **Không có scope theo group/context** — mỗi user có 1 bộ permissions toàn cục
- **Group** vẫn tồn tại nhưng chỉ là dữ liệu tổ chức (chủ nhóm, thành viên), **không liên quan auth**

User `admin.comic@gmail.com` (ID=1) có role `super_admin` → có toàn bộ 65 permissions.
User `mod.comic@gmail.com` (ID=2) có role `group_owner` → có 6 permissions: `group.owner`, `group.comic`, `group.post`, `group.member.manage`, `group.member.add`, `group.member.remove`.

---

## Cấu trúc Response chung

```json
// Danh sách
{
  "success": true,
  "message": "Success",
  "code": "SUCCESS",
  "httpStatus": 200,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "timestamp": "2026-05-17T10:00:00+07:00"
}

// Single object
{
  "success": true,
  "message": "Success",
  "code": "SUCCESS",
  "httpStatus": 200,
  "data": { ... },
  "meta": {},
  "timestamp": "2026-05-17T10:00:00+07:00"
}
```

---

## Phân quyền endpoint

| Ký hiệu | Nghĩa |
|---------|-------|
| Public | Không cần đăng nhập |
| User | Cần header `Authorization: Bearer {token}` |
| Admin | Cần JWT có quyền tương ứng (xem từng endpoint) |

Header xác thực: `Authorization: Bearer {accessToken}` (token lấy từ Auth Service).

---

## Lưu ý chung

- **Request body, query params và response đều dùng camelCase** — `parentId`, `createdAt`, không phải `parent_id`, `created_at`.
- **ID là string** — BigInt serialize thành string. Gửi lên phải là numeric string (VD: `"123"`).
- **Enum `status`:** `"active"` | `"inactive"`.
- **Validation `code`:** 2-100 ký tự (Permission: 2-120), regex `^[a-z][a-z0-9_.-]*$` (case-insensitive). Bắt đầu bằng chữ cái, chỉ chứa chữ-số-`_`-`.`-`-`.
- **`x-group-id` header:** ĐÃ GỠ BỎ HOÀN TOÀN. Không gửi nữa, BE không đọc.

---

## Tham số phân trang chung (List API)

| Param | Kiểu | Default | Mô tả |
|-------|------|---------|-------|
| `page` | number | `1` | Trang hiện tại |
| `limit` | number | `10` | Số bản ghi mỗi trang (max 100) |
| `search` | string | — | Tìm kiếm theo `code`/`name` (max 200 ký tự) |
| `sort` | string | — | VD: `name:ASC`, `createdAt:DESC` |
| `skipCount` | boolean string | `"false"` | `"true"` -> bỏ qua đếm tổng |

---

## 1. Quản lý Vai trò (Role)

### Admin GET `/api/iam/admin/roles`

Danh sách role. Quyền: `role.manage`.

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `status` | `active` \| `inactive` | Lọc trạng thái |
| + phân trang chung | | |

**Response `data[i]`:**

```json
{
  "id": "1",
  "code": "super_admin",
  "name": "Quản trị tối cao",
  "status": "active",
  "parentId": null,
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Admin GET `/api/iam/admin/roles/:id`

Chi tiết role (bao gồm danh sách `permissions`). Quyền: `role.manage`.

**Response `data`:**

```json
{
  "id": "1",
  "code": "super_admin",
  "name": "Quản trị tối cao",
  "status": "active",
  "parentId": null,
  "parent": null,
  "children": [],
  "permissions": [
    { "id": "1", "code": "user.manage", "name": "Quản lý người dùng" },
    { "id": "2", "code": "role.manage", "name": "Quản lý vai trò" }
  ],
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Admin POST `/api/iam/admin/roles`

Tạo role mới. Quyền: `role.manage`. (HTTP 201)

```json
{
  "code": "content_manager",
  "name": "Quản lý nội dung",
  "parentId": null
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `code` | string (2-100) | Có | Regex `^[a-z][a-z0-9_.-]*$`, **unique** |
| `name` | string (max 150) | Không | Tên hiển thị |
| `parentId` | numeric string | Không | Role cha (nếu có) |

**Lỗi:** `409` — `code` đã tồn tại.

---

### Admin PUT `/api/iam/admin/roles/:id`

Cập nhật role. Quyền: `role.manage`. Tất cả field optional. **`code` không sửa được** sau khi tạo.

```json
{
  "name": "Tên mới",
  "status": "inactive",
  "parentId": "2"
}
```

Truyền `parentId: null` để bỏ parent. Hệ thống tự check vòng lặp parent-child.

---

### Admin DELETE `/api/iam/admin/roles/:id`

Xóa role. Quyền: `role.manage`.

**Lỗi `403`:** Nếu role này chứa quyền `system.manage` và xóa nó sẽ khiến hệ thống không còn ai có `system.manage` (last-admin protection).

---

### Admin PUT `/api/iam/admin/roles/:id/permissions`

Đồng bộ danh sách permission cho role. Quyền: `role.manage`.

```json
{
  "permissionIds": ["1", "2", "5", "8"]
}
```

| Field | Kiểu | Mô tả |
|-------|------|-------|
| `permissionIds` | string[] (max 500, unique, numeric) | Toàn bộ permission ID muốn gán |

> **Lưu ý bảo mật:** Caller chỉ có thể gán quyền mà chính họ đang sở hữu. Nếu gán quyền cao hơn quyền của mình → **`403 Forbidden`**.

**Response `data`:**

```json
{ "message": "Đồng bộ quyền thành công" }
```

---

## 2. Quản lý Quyền (Permission)

### Admin GET `/api/iam/admin/permissions`

Danh sách permission có phân trang. Quyền: `permission.manage`.

**Query params:** `status` + phân trang chung.

**Response `data[i]`:**

```json
{
  "id": "1",
  "code": "user.manage",
  "name": "Quản lý người dùng",
  "status": "active",
  "parentId": null,
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Admin GET `/api/iam/admin/permissions/simple`

Danh sách rút gọn (max 200) — dùng cho dropdown khi sync permissions cho role. Quyền: `permission.manage`.

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `search` | string | Tìm theo `code` hoặc `name` |

**Response `data[i]`:**

```json
{ "id": "1", "code": "user.manage", "name": "Quản lý người dùng" }
```

---

### Admin GET `/api/iam/admin/permissions/:id`

Chi tiết permission. Quyền: `permission.manage`.

---

### Admin POST `/api/iam/admin/permissions`

Tạo permission mới. Quyền: `permission.manage`. (HTTP 201)

```json
{
  "code": "comic.publish",
  "name": "Xuất bản truyện",
  "parentId": null
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `code` | string (2-120) | Có | Regex `^[a-z][a-z0-9_.-]*$`, **unique** |
| `name` | string (max 150) | Không | |
| `parentId` | numeric string | Không | |

---

### Admin PUT `/api/iam/admin/permissions/:id`

Cập nhật permission. Quyền: `permission.manage`. Tất cả optional. **`code` không sửa được.**

---

### Admin DELETE `/api/iam/admin/permissions/:id`

Xóa permission. Quyền: `permission.manage`.

---

## 3. Quản lý Nhóm (Group)

> **Lưu ý:** Group hiện chỉ là dữ liệu tổ chức (chủ nhóm + thành viên), **không liên quan phân quyền**. Permission của user vẫn toàn cục, không scope theo group.

### Admin GET `/api/iam/admin/groups`

Danh sách group. Quyền: `group.manage`.

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `type` | string (max 255) | Lọc theo type (VD: `team`, `studio`) |
| `status` | `active` \| `inactive` | |
| + phân trang | | |

**Response `data[i]`:**

```json
{
  "id": "1",
  "type": "team",
  "code": "team-alpha",
  "name": "Team Alpha",
  "description": "Mô tả nhóm",
  "status": "active",
  "ownerId": "10",
  "metadata": null,
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Admin GET `/api/iam/admin/groups/:id`

Chi tiết group. Quyền: `group.manage`.

---

### Admin POST `/api/iam/admin/groups`

Tạo group mới. Quyền: `group.manage`. (HTTP 201)

```json
{
  "type": "team",
  "code": "team-alpha",
  "name": "Team Alpha",
  "description": "Mô tả",
  "ownerId": "10"
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `type` | string (2-50) | Có | Regex `^[a-z][a-z0-9_-]*$` |
| `code` | string (2-100) | Có | Regex `^[a-z][a-z0-9_.-]*$`, **unique cho cùng `type`** |
| `name` | string (max 255) | Có | |
| `description` | string (max 1000) | Không | |
| `ownerId` | numeric string | Không | User ID của chủ nhóm. Tự động gán role `group_owner` cho user này. |

---

### Admin PUT `/api/iam/admin/groups/:id`

Cập nhật group. Quyền: `group.manage`. Tất cả optional. Khi đổi `ownerId` → user cũ bị gỡ role `group_owner`, user mới được gán.

---

### Admin DELETE `/api/iam/admin/groups/:id`

Xóa group. Quyền: `group.manage`. Member tự động cascade xóa.

---

### Admin GET `/api/iam/admin/groups/:id/members`

Danh sách thành viên group. Quyền: `group.manage`. Hỗ trợ phân trang.

**Response `data[i]`:**

```json
{
  "userId": "10",
  "groupId": "1",
  "joinedAt": "2026-01-15T10:00:00.000Z"
}
```

---

### Admin POST `/api/iam/admin/groups/:id/members`

Thêm thành viên vào group. Quyền: `group.manage`.

```json
{ "userId": "11" }
```

---

### Admin DELETE `/api/iam/admin/groups/:id/members/:userId`

Xóa thành viên khỏi group. Quyền: `group.manage`.

---

## 4. Gán Vai trò cho User (User-Role)

### Admin GET `/api/iam/admin/users/:userId/roles`

Lấy danh sách role hiện tại của user. Quyền: `user.role.assign`.

**Response `data`:**

```json
[
  { "id": "1", "code": "super_admin", "name": "Quản trị tối cao" },
  { "id": "5", "code": "content_manager", "name": "Quản lý nội dung" }
]
```

---

### Admin POST `/api/iam/admin/users/:userId/roles`

Gán 1 role cho user. Quyền: `user.role.assign`.

```json
{ "roleId": "2" }
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `roleId` | numeric string | Có | |

> **Lưu ý bảo mật:** Caller chỉ có thể gán role mà permissions của role đó là subset của caller. Gán role có quyền cao hơn → **`403 Forbidden`**.

---

### Admin DELETE `/api/iam/admin/users/:userId/roles/:roleId`

Gỡ 1 role khỏi user. Quyền: `user.role.assign`.

---

### Admin PUT `/api/iam/admin/users/:userId/roles/sync`

Đồng bộ toàn bộ role của user. Quyền: `user.role.assign`.

```json
{ "roleIds": ["1", "3", "5"] }
```

| Field | Kiểu | Mô tả |
|-------|------|-------|
| `roleIds` | string[] (max 500, unique, numeric) | Toàn bộ role ID user sẽ có sau khi sync |

Sync = thay thế toàn bộ. Truyền `[]` để xóa hết role của user.

---

## 5. Nhóm của User hiện tại

### User GET `/api/iam/user/groups`

Lấy danh sách group mà user đang đăng nhập là thành viên. Chỉ cần token, **không cần permission cụ thể**.

**Response `data`:**

```json
[
  {
    "id": "1",
    "type": "team",
    "code": "team-alpha",
    "name": "Team Alpha",
    "description": "...",
    "status": "active",
    "ownerId": "10",
    "joinedAt": "2026-01-15T10:00:00.000Z"
  }
]
```

> Dùng cho trang "Nhóm của tôi" trên FE.

---

## 6. Internal RBAC API (FE không gọi)

> Các endpoint dưới do **service nội bộ** gọi (qua header `x-internal-secret`). FE không cần biết.

### `POST /api/iam/internal/rbac/check`

Body:
```json
{ "userId": "1", "permissions": ["user.manage"] }
```

Response:
```json
{ "allowed": true }
```

### `GET /api/iam/internal/rbac/permissions?userId=1`

Response:
```json
{ "permissions": ["user.manage", "role.manage", "group.owner", ...] }
```

> ⚠️ Field/param `groupId` đã GỠ BỎ. Permissions giờ toàn cục.

---

## Luồng tích hợp tiêu biểu

### Trang "Quản lý vai trò"

```
1. GET /api/iam/admin/roles?page=1&limit=10        -> Danh sách role
2. GET /api/iam/admin/roles/:id                    -> Mở chi tiết, hiển thị permissions hiện tại
3. GET /api/iam/admin/permissions/simple?search=   -> Picker permission cho form sync
4. PUT /api/iam/admin/roles/:id/permissions        -> Save danh sách permission
```

### Trang "Tài khoản" → tab "Vai trò"

```
1. GET /api/auth/admin/users                        -> Danh sách user (từ Auth Service)
2. GET /api/iam/admin/users/:userId/roles           -> Role hiện tại của user
3. GET /api/iam/admin/roles?status=active           -> Picker role
4. PUT /api/iam/admin/users/:userId/roles/sync      -> Save toàn bộ role
```

### Trang "Nhóm"

```
1. GET /api/iam/admin/groups                        -> Danh sách
2. POST /api/iam/admin/groups                       -> Tạo (kèm ownerId)
3. GET /api/iam/admin/groups/:id/members            -> Thành viên
4. POST /api/iam/admin/groups/:id/members           -> Thêm thành viên
5. DELETE /api/iam/admin/groups/:id/members/:userId -> Xóa thành viên
```

---

## Tổng hợp endpoint

| Method | Path | Auth | Permission | Mô tả |
|--------|------|------|------------|-------|
| GET | `/api/iam/admin/roles` | Admin | `role.manage` | Danh sách role |
| GET | `/api/iam/admin/roles/:id` | Admin | `role.manage` | Chi tiết role |
| POST | `/api/iam/admin/roles` | Admin | `role.manage` | Tạo role |
| PUT | `/api/iam/admin/roles/:id` | Admin | `role.manage` | Sửa role |
| DELETE | `/api/iam/admin/roles/:id` | Admin | `role.manage` | Xóa role |
| PUT | `/api/iam/admin/roles/:id/permissions` | Admin | `role.manage` | Sync permissions cho role |
| GET | `/api/iam/admin/permissions` | Admin | `permission.manage` | Danh sách permission |
| GET | `/api/iam/admin/permissions/simple` | Admin | `permission.manage` | Permission rút gọn (picker) |
| GET | `/api/iam/admin/permissions/:id` | Admin | `permission.manage` | Chi tiết permission |
| POST | `/api/iam/admin/permissions` | Admin | `permission.manage` | Tạo permission |
| PUT | `/api/iam/admin/permissions/:id` | Admin | `permission.manage` | Sửa permission |
| DELETE | `/api/iam/admin/permissions/:id` | Admin | `permission.manage` | Xóa permission |
| GET | `/api/iam/admin/groups` | Admin | `group.manage` | Danh sách group |
| GET | `/api/iam/admin/groups/:id` | Admin | `group.manage` | Chi tiết group |
| POST | `/api/iam/admin/groups` | Admin | `group.manage` | Tạo group |
| PUT | `/api/iam/admin/groups/:id` | Admin | `group.manage` | Sửa group |
| DELETE | `/api/iam/admin/groups/:id` | Admin | `group.manage` | Xóa group |
| GET | `/api/iam/admin/groups/:id/members` | Admin | `group.manage` | Thành viên group |
| POST | `/api/iam/admin/groups/:id/members` | Admin | `group.manage` | Thêm thành viên |
| DELETE | `/api/iam/admin/groups/:id/members/:userId` | Admin | `group.manage` | Xóa thành viên |
| GET | `/api/iam/admin/users/:userId/roles` | Admin | `user.role.assign` | Role hiện tại của user |
| POST | `/api/iam/admin/users/:userId/roles` | Admin | `user.role.assign` | Gán 1 role |
| DELETE | `/api/iam/admin/users/:userId/roles/:roleId` | Admin | `user.role.assign` | Gỡ 1 role |
| PUT | `/api/iam/admin/users/:userId/roles/sync` | Admin | `user.role.assign` | Sync toàn bộ role |
| GET | `/api/iam/user/groups` | User | — | Group của user hiện tại |

---

## Thay đổi so với phiên bản trước (Changelog)

**2026-05-17 — Bỏ Context, đơn giản hoá RBAC:**
- Bỏ hoàn toàn khái niệm Context (system context, group context).
- Permission KHÔNG còn scope theo group nữa — mỗi user có 1 bộ permissions toàn cục.
- Header `x-group-id` đã gỡ bỏ — không gửi nữa.
- Field `contextId` (Create/List Group), `groupId` (Sync/Assign/Remove role) — đã bỏ.
- Các endpoint `/api/iam/contexts/*`, `/api/iam/owner/*` — đã xóa.

**2026-05-17 — URL admin endpoints có prefix `admin/`:**
- Tất cả endpoint IAM admin đổi từ `/api/iam/<resource>` → `/api/iam/admin/<resource>`.
- Ví dụ: `/api/iam/roles` → `/api/iam/admin/roles`, `/api/iam/users/:id/roles` → `/api/iam/admin/users/:id/roles`.
- Endpoint user (`/api/iam/user/groups`) giữ nguyên.
- Internal RBAC (`/api/iam/internal/rbac/*`) giữ nguyên.

---

## Tài khoản test

| User ID | Email | Role | Permissions |
|---------|-------|------|-------------|
| 1 | `admin.comic@gmail.com` | `super_admin` | All 65 |
| 2 | `mod.comic@gmail.com` | `group_owner` | 6 (group.owner, group.comic, group.post, member.*) |

Password mặc định: `Password@123`

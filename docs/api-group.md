# API Tài liệu — Nhóm (Group)

**Service:** IAM Service  
**Base URL:** `http://<host>/api/iam`  
**Cập nhật:** 2026-06-13

---

## Mục lục

- [Xác thực](#xác-thực)
- [Cấu trúc Response](#cấu-trúc-response)
- [Phân trang & Sắp xếp](#phân-trang--sắp-xếp)
- [1. Layer Admin](#1-layer-admin--apiiadmingroups)
- [2. Layer Chủ nhóm](#2-layer-chủ-nhóm--apiiamgroups)
- [3. Layer User](#3-layer-user--apiiamuser)
- [Mã lỗi thường gặp](#mã-lỗi-thường-gặp)

---

## Xác thực

Tất cả endpoint đều yêu cầu JWT Bearer token trong header:

```
Authorization: Bearer <access_token>
```

Mỗi nhóm endpoint kiểm tra quyền theo cách khác nhau:

| Layer | Kiểm tra quyền |
|-------|----------------|
| Admin | Quyền toàn cục — user phải có `group.manage` trong hệ thống |
| Chủ nhóm | Quyền phạm vi nhóm — user phải có quyền tương ứng trong nhóm đó |
| User | Chỉ cần đăng nhập (có token hợp lệ) |

---

## Cấu trúc Response

**Thành công đơn lẻ:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-06-13T10:00:00.000Z"
}
```

**Thành công danh sách (có phân trang):**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  },
  "timestamp": "2026-06-13T10:00:00.000Z"
}
```

**Thất bại:**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Không tìm thấy nhóm.",
  "timestamp": "2026-06-13T10:00:00.000Z"
}
```

---

## Phân trang & Sắp xếp

Các endpoint trả về danh sách đều hỗ trợ query params chung:

| Param | Kiểu | Mặc định | Mô tả |
|-------|------|----------|-------|
| `page` | number | `1` | Trang hiện tại |
| `limit` | number | `10` | Số bản ghi mỗi trang (max 100) |
| `sort` | string | `createdAt:desc` | Ví dụ: `name:asc`, `createdAt:desc` |
| `skipCount` | boolean | `false` | `true` để bỏ qua đếm tổng (tăng tốc) |

---

## 1. Layer Admin — `/api/iam/admin/groups`

> Yêu cầu quyền: `group.manage`

### 1.1 Danh sách nhóm

```
GET /api/iam/admin/groups
```

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `page` | number | Trang (mặc định `1`) |
| `limit` | number | Số bản ghi/trang (mặc định `10`, tối đa `100`) |
| `search` | string | Tìm theo `code` hoặc `name` — substring, không phân biệt hoa/thường |
| `sort` | string | `id:asc` \| `name:asc` \| `code:asc` \| `status:desc` \| `createdAt:desc` — mặc định `createdAt:desc` |
| `type` | string | Lọc theo loại nhóm (vd: `comic`, `post`) — khớp chính xác |
| `status` | string | `active` \| `inactive` — khớp chính xác |
| `ownerId` | string | Lọc theo ID chủ nhóm |
| `skipCount` | boolean | `true` để bỏ qua đếm tổng (tăng tốc load trang không cần pagination) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123456789",
      "code": "group-truyen-tranh-01",
      "name": "Nhóm Truyện Tranh 01",
      "description": "Nhóm chuyên dịch truyện tranh",
      "status": "active",
      "ownerId": "987654321",
      "createdAt": "2026-01-15T07:00:00.000Z"
    }
  ],
  "meta": { "total": 50, "page": 1, "limit": 10, "totalPages": 5 }
}
```

---

### 1.2 Chi tiết nhóm

```
GET /api/iam/admin/groups/:id
```

**Response `data`:**
```json
{
  "id": "123456789",
  "code": "group-truyen-tranh-01",
  "name": "Nhóm Truyện Tranh 01",
  "description": "Nhóm chuyên dịch truyện tranh",
  "type": "comic",
  "status": "active",
  "ownerId": "987654321",
  "metadata": null,
  "createdAt": "2026-01-15T07:00:00.000Z",
  "updatedAt": "2026-03-01T10:00:00.000Z"
}
```

---

### 1.3 Tạo nhóm

```
POST /api/iam/admin/groups
```

**Request body:**
```json
{
  "type": "comic",
  "code": "nhom-dich-01",
  "name": "Nhóm Dịch 01",
  "description": "Mô tả nhóm (tuỳ chọn)",
  "ownerId": "987654321"
}
```

| Field | Bắt buộc | Ràng buộc |
|-------|----------|-----------|
| `type` | ✅ | 2–50 ký tự, `[a-zA-Z][a-zA-Z0-9_-]` |
| `code` | ✅ | 2–100 ký tự, `[a-zA-Z][a-zA-Z0-9_.-]`, duy nhất |
| `name` | ✅ | Tối đa 255 ký tự |
| `description` | ❌ | Tối đa 1000 ký tự |
| `ownerId` | ❌ | ID số (string) của user làm chủ nhóm |

> Khi truyền `ownerId`, hệ thống tự động thêm user đó làm thành viên và gán vai trò `group_manager`.

---

### 1.4 Cập nhật nhóm

```
PUT /api/iam/admin/groups/:id
```

**Request body** (tất cả tuỳ chọn):
```json
{
  "name": "Tên nhóm mới",
  "description": "Mô tả mới",
  "status": "inactive",
  "ownerId": "111222333"
}
```

| Field | Mô tả |
|-------|-------|
| `name` | Tối đa 255 ký tự |
| `description` | Tối đa 1000 ký tự |
| `status` | `active` \| `inactive` |
| `ownerId` | ID số hoặc `null`/`""` để xoá chủ nhóm |

---

### 1.5 Xoá nhóm

```
DELETE /api/iam/admin/groups/:id
```

**Response:**
```json
{ "success": true, "data": { "message": "Xóa nhóm thành công." } }
```

---

### 1.6 Danh sách thành viên nhóm (Admin)

```
GET /api/iam/admin/groups/:id/members
```

**Query params:**

| Param | Mô tả |
|-------|-------|
| `search` | Tìm theo `name`, `email`, `username` — substring, không phân biệt hoa/thường |
| `roleId` | Lọc thành viên có vai trò cụ thể (ID lấy từ API assignable-roles) |
| `sort` | `name:asc` \| `email:asc` \| `username:asc` \| `status:desc` — mặc định `name:asc` |
| `page`, `limit` | Phân trang |

> **Lưu ý:** Danh sách thành viên được lọc và phân trang **sau khi** lấy thông tin user từ auth-service. Kết quả search/sort thực hiện in-memory.

**Response `data` (mỗi phần tử):**
```json
{
  "id": "987654321",
  "username": "user01",
  "email": "user01@example.com",
  "name": "Nguyễn Văn A",
  "image": "https://...",
  "status": "active"
}
```

---

### 1.7 Thêm thành viên (Admin — theo userId)

```
POST /api/iam/admin/groups/:id/members
```

**Request body:**
```json
{ "userId": "987654321" }
```

---

### 1.8 Xoá thành viên (Admin)

```
DELETE /api/iam/admin/groups/:id/members/:userId
```

---

## 2. Layer Chủ nhóm — `/api/iam/groups`

> Endpoint cho chủ nhóm hoặc thành viên có quyền được cấp trong nhóm.  
> `groupId` lấy từ route param `:id`.

---

### 2.1 Xem thông tin nhóm

```
GET /api/iam/groups/:id
```

> Yêu cầu quyền trong nhóm: `group.info.manage`

**Response `data`:** Tương tự [1.2](#12-chi-tiết-nhóm).

---

### 2.2 Cập nhật thông tin cơ bản nhóm

```
PUT /api/iam/groups/:id
```

> Yêu cầu quyền trong nhóm: `group.info.manage`

**Request body** (tất cả tuỳ chọn):
```json
{
  "name": "Tên nhóm mới",
  "description": "Mô tả mới"
}
```

> Chú ý: Chủ nhóm chỉ sửa được `name` và `description`. Thay đổi `status`, `ownerId`, `type`, `code` chỉ admin mới làm được.

---

### 2.3 Danh sách thành viên

```
GET /api/iam/groups/:id/members
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

**Query params:**

| Param | Mô tả |
|-------|-------|
| `search` | Tìm theo `name`, `email`, `username` — substring, không phân biệt hoa/thường |
| `roleId` | Lọc thành viên có vai trò cụ thể (ID lấy từ [2.6 Assignable Roles](#26-danh-sách-vai-trò-có-thể-gán)) |
| `sort` | `name:asc` \| `email:asc` \| `username:asc` \| `status:desc` — mặc định `name:asc` |
| `page`, `limit` | Phân trang |

> **Lưu ý:** Search/sort thực hiện in-memory sau khi lấy thông tin user từ auth-service.

**Response `data` (mỗi phần tử):**
```json
{
  "id": "987654321",
  "username": "user01",
  "email": "user01@example.com",
  "name": "Nguyễn Văn A",
  "image": "https://...",
  "status": "active"
}
```

---

### 2.4 Thêm thành viên vào nhóm

```
POST /api/iam/groups/:id/members
```

> Yêu cầu quyền trong nhóm: `group.member.add`

**Request body** — truyền `email` **hoặc** `username`, không bắt buộc cả hai:
```json
{ "email": "user01@example.com" }
```
```json
{ "username": "user01" }
```

**Response thành công:**
```json
{
  "success": true,
  "data": {
    "message": "Thêm thành viên thành công.",
    "user": {
      "id": "987654321",
      "username": "user01",
      "email": "user01@example.com",
      "name": "Nguyễn Văn A",
      "image": null,
      "status": "active"
    }
  }
}
```

**Lỗi có thể xảy ra:**
- `404` — Không tìm thấy người dùng với email/username này
- `409` — Người dùng đã là thành viên của nhóm này

---

### 2.5 Xoá thành viên khỏi nhóm

```
DELETE /api/iam/groups/:id/members/:userId
```

> Yêu cầu quyền trong nhóm: `group.member.remove`

---

### 2.6 Danh sách vai trò có thể gán

```
GET /api/iam/groups/:id/assignable-roles
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

Trả về danh sách tất cả vai trò nhóm hiện có trong hệ thống (`roleType = 'group'`).

**Response `data`:**
```json
[
  { "id": "1", "code": "group_manager", "name": "Quản lý nhóm (đầy đủ)" },
  { "id": "2", "code": "group_comic_manager", "name": "Quản lý truyện nhóm" },
  { "id": "3", "code": "group_comic_editor", "name": "Biên tập viên truyện" },
  { "id": "4", "code": "group_comic_translator", "name": "Dịch giả" },
  { "id": "5", "code": "group_post_manager", "name": "Quản lý bài viết nhóm" },
  { "id": "6", "code": "group_post_editor", "name": "Biên tập viên bài viết" },
  { "id": "7", "code": "group_post_writer", "name": "Tác giả bài viết" }
]
```

---

### 2.7 Xem vai trò của một thành viên

```
GET /api/iam/groups/:id/members/:userId/roles
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

**Response `data`:**
```json
[
  {
    "roleId": "2",
    "userId": "987654321",
    "groupId": "123456789",
    "role": {
      "id": "2",
      "code": "group_comic_manager",
      "name": "Quản lý truyện nhóm",
      "roleType": "group",
      "status": "active"
    }
  }
]
```

---

### 2.8 Gán một vai trò cho thành viên

```
POST /api/iam/groups/:id/members/:userId/roles
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

**Request body:**
```json
{ "roleId": "2" }
```

---

### 2.9 Thu hồi một vai trò của thành viên

```
DELETE /api/iam/groups/:id/members/:userId/roles/:roleId
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

---

### 2.10 Đồng bộ toàn bộ vai trò của thành viên

```
PUT /api/iam/groups/:id/members/:userId/roles/sync
```

> Yêu cầu quyền trong nhóm: `group.member.manage`

Thay thế **toàn bộ** vai trò hiện tại của thành viên bằng danh sách mới. Truyền mảng rỗng để xoá hết vai trò.

**Request body:**
```json
{ "roleIds": ["2", "4"] }
```

---

## 3. Layer User — `/api/iam/user`

> Chỉ yêu cầu đăng nhập. Trả về dữ liệu của chính user đang đăng nhập.

---

### 3.1 Danh sách nhóm của tôi

```
GET /api/iam/user/groups
```

**Query params:**

| Param | Mô tả |
|-------|-------|
| `search` | Tìm theo tên nhóm — substring, không phân biệt hoa/thường |
| `page`, `limit` | Phân trang |

**Response `data` (mỗi phần tử):**
```json
{
  "id": "123456789",
  "code": "nhom-dich-01",
  "name": "Nhóm Dịch 01",
  "type": "comic",
  "status": "active",
  "description": "Mô tả nhóm",
  "ownerId": "987654321",
  "metadata": null,
  "joinedAt": "2026-03-10T08:00:00.000Z"
}
```

> `joinedAt` là thời điểm user gia nhập nhóm.  
> `isOwner` có thể tự suy ra bằng cách so sánh `ownerId === currentUserId`.

---

## Mã lỗi thường gặp

| HTTP | Mô tả |
|------|-------|
| `400` | Dữ liệu đầu vào không hợp lệ (sai định dạng, thiếu field bắt buộc) |
| `401` | Chưa đăng nhập hoặc token hết hạn |
| `403` | Không có quyền thực hiện hành động này |
| `404` | Không tìm thấy nhóm / người dùng / thành viên |
| `409` | Trùng lặp dữ liệu (code nhóm đã tồn tại, user đã là thành viên) |
| `500` | Lỗi server |

---

## Quyền nhóm — tham chiếu nhanh

| Permission code | Mô tả |
|----------------|-------|
| `group.info.manage` | Xem và chỉnh sửa thông tin cơ bản nhóm |
| `group.member.manage` | Xem danh sách thành viên, quản lý vai trò |
| `group.member.add` | Thêm thành viên mới vào nhóm |
| `group.member.remove` | Xoá thành viên khỏi nhóm |

> Chủ nhóm được tự động gán vai trò `group_manager` — vai trò có đầy đủ 4 quyền trên cộng với các quyền tạo/sửa/xoá nội dung (comic, post, chapter).

---

## Vai trò nhóm — mặc định hệ thống

| Code | Tên | Quyền nội dung |
|------|-----|----------------|
| `group_manager` | Quản lý nhóm (đầy đủ) | Thành viên + comic + post + chapter |
| `group_comic_manager` | Quản lý truyện nhóm | comic + chapter (CRUD) |
| `group_comic_editor` | Biên tập viên truyện | comic view+update, chapter view+create+update |
| `group_comic_translator` | Dịch giả | comic view, chapter view+create+update |
| `group_post_manager` | Quản lý bài viết nhóm | post (CRUD) |
| `group_post_editor` | Biên tập viên bài viết | post view+create+update |
| `group_post_writer` | Tác giả bài viết | post view+create+update |

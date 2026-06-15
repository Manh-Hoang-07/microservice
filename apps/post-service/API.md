# Post Service — Tài liệu API

**Base URL:** `http://localhost:3008`  
**Prefix chung qua Nginx:** `/api/posts`

---

## Mục lục

- [Enums tham chiếu](#enums-tham-chiếu)
- [Admin Layer](#admin-layer)
  - [Bài viết (Admin)](#bài-viết-admin)
  - [Danh mục (Admin)](#danh-mục-admin)
  - [Thẻ tag (Admin)](#thẻ-tag-admin)
  - [Bình luận (Admin)](#bình-luận-admin)
  - [Thống kê (Admin)](#thống-kê-admin)
- [Group Layer](#group-layer)
  - [Bài viết (Group)](#bài-viết-group)
  - [Bình luận (Group)](#bình-luận-group)
  - [Thống kê (Group)](#thống-kê-group)
- [Public Layer](#public-layer)
- [User Layer](#user-layer)
- [Xử lý danh mục / tag đã inactive trong form sửa](#xử-lý-danh-mục--tag-đã-inactive-trong-form-sửa)
- [Response Format](#response-format)

---

## Enums tham chiếu

Các enum dưới đây hardcode trực tiếp trong frontend, **không có API trả về** — dùng để render dropdown cố định.

### PostStatus
| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `draft` | Bản nháp |
| `scheduled` | Lên lịch đăng |
| `published` | Đã xuất bản |
| `archived` | Lưu trữ |

### PostType
| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `text` | Văn bản |
| `video` | Video |
| `image` | Hình ảnh |
| `audio` | Âm thanh |

### CategoryStatus / TagStatus
| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `active` | Đang hoạt động |
| `inactive` | Không hoạt động |

### CommentStatus
| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `visible` | Hiển thị |
| `hidden` | Đã ẩn |
| `spam` | Spam |
| `deleted` | Đã xoá |

---

## Admin Layer

Tất cả endpoint admin yêu cầu header `Authorization: Bearer <token>` với quyền `post.manage`.

---

### Bài viết (Admin)

#### `GET /admin/posts` — Danh sách bài viết

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang hiện tại | Nhập tay / phân trang |
| `limit` | number | Số lượng mỗi trang | Nhập tay |
| `search` | string | Tìm theo tên (max 100 ký tự) | Ô tìm kiếm |
| `sort` | string | Trường sắp xếp | Hardcode: `name`, `createdAt`, `updatedAt`, `publishedAt`, `viewCount`, `isFeatured`, `isPinned` |
| `order` | string | Chiều sắp xếp | Hardcode: `asc`, `desc` |
| `skipCount` | boolean | Bỏ qua đếm tổng | Hardcode: `true` / `false` |
| `status` | string | Lọc trạng thái | Hardcode enum **PostStatus** |
| `postType` | string | Lọc loại bài | Hardcode enum **PostType** |
| `isFeatured` | string | Lọc bài nổi bật | Hardcode: `true`, `false` |
| `isPinned` | string | Lọc bài ghim | Hardcode: `true`, `false` |
| `categoryId` | string (số) | Lọc theo danh mục | `id` lấy từ `GET /public/post-categories` |
| `tagId` | string (số) | Lọc theo tag | `id` lấy từ `GET /public/post-tags` |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Tên bài viết",
      "slug": "ten-bai-viet",
      "excerpt": "Tóm tắt...",
      "status": "published",
      "postType": "text",
      "isFeatured": false,
      "isPinned": false,
      "publishedAt": "2024-01-15T08:00:00.000Z",
      "categories": [{ "id": 1, "name": "Tin tức", "slug": "tin-tuc" }],
      "tags": [{ "id": 1, "name": "NestJS", "slug": "nestjs" }],
      "stats": { "viewCount": "1234" },
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-15T08:00:00.000Z"
    }
  ],
  "meta": { "total": 100, "page": 1, "limit": 20, "totalPages": 5 }
}
```

---

#### `GET /admin/posts/simple` — Danh sách rút gọn

Dùng khi cần chọn bài viết liên quan trong form khác. Chỉ trả về `id`, `name`, `slug`, `status`.

**Query params:** Tương tự `GET /admin/posts`.

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": "1", "name": "Tên bài viết", "slug": "ten-bai-viet", "status": "published" }
  ]
}
```

---

#### `GET /admin/posts/:id` — Chi tiết bài viết

Dùng để load dữ liệu vào form **sửa bài viết**.

**Path params:**
- `id` (bigint) — ID bài viết lấy từ cột `id` trong danh sách `GET /admin/posts`

**Response:**
```json
{
  "id": "1",
  "name": "Tiêu đề",
  "slug": "tieu-de",
  "excerpt": "Tóm tắt",
  "content": "Nội dung HTML đầy đủ",
  "image": "https://cdn.example.com/image.jpg",
  "coverImage": "https://cdn.example.com/cover.jpg",
  "status": "draft",
  "postType": "text",
  "videoUrl": null,
  "audioUrl": null,
  "isFeatured": false,
  "isPinned": false,
  "publishedAt": null,
  "seoTitle": "",
  "seoDescription": "",
  "seoKeywords": "",
  "groupId": null,
  "categories": [{ "id": 1, "name": "Tin tức", "slug": "tin-tuc" }],
  "tags": [{ "id": 1, "name": "NestJS", "slug": "nestjs" }]
}
```

> Khi load form sửa: lấy `categories[].id` → set vào `categoryIds`, lấy `tags[].id` → set vào `tagIds`.

---

#### `POST /admin/posts` — Tạo bài viết

**Nguồn dữ liệu cho từng field trong form:**

| Field | Kiểu input | Nguồn dữ liệu / Ghi chú |
|-------|-----------|--------------------------|
| `name` | Text input | Người dùng nhập tay |
| `slug` | Text input | Tự sinh từ `name` nếu bỏ trống; người dùng có thể override |
| `excerpt` | Textarea | Người dùng nhập tay (max 2000 ký tự) |
| `content` | Rich text editor | Người dùng nhập tay (max 200.000 ký tự) |
| `image` | URL / file upload | URL trả về từ Storage Service sau khi upload |
| `coverImage` | URL / file upload | URL trả về từ Storage Service sau khi upload |
| `status` | Select/Radio | Hardcode enum **PostStatus**: `draft`, `scheduled`, `published`, `archived` |
| `postType` | Select/Radio | Hardcode enum **PostType**: `text`, `video`, `image`, `audio` |
| `videoUrl` | Text input | Người dùng nhập URL (hiện khi `postType = video`) |
| `audioUrl` | Text input | Người dùng nhập URL (hiện khi `postType = audio`) |
| `isFeatured` | Checkbox/Toggle | Hardcode: `true` / `false` |
| `isPinned` | Checkbox/Toggle | Hardcode: `true` / `false` |
| `publishedAt` | Date-time picker | Người dùng chọn (hiện khi `status = scheduled`) |
| `seoTitle` | Text input | Người dùng nhập tay (max 255 ký tự) |
| `seoDescription` | Textarea | Người dùng nhập tay (max 2000 ký tự) |
| `seoKeywords` | Text input | Người dùng nhập tay (max 500 ký tự) |
| `categoryIds` | Multi-select | **`GET /public/post-categories`** → lấy `id` của từng mục chọn |
| `tagIds` | Multi-select / Tag input | **`GET /public/post-tags`** → lấy `id` của từng tag chọn |

**Request body:**
```json
{
  "name": "Tiêu đề bài viết",
  "slug": "tieu-de-bai-viet",
  "excerpt": "Tóm tắt ngắn gọn",
  "content": "<p>Nội dung HTML</p>",
  "image": "https://cdn.example.com/image.jpg",
  "coverImage": "https://cdn.example.com/cover.jpg",
  "status": "draft",
  "postType": "text",
  "videoUrl": null,
  "audioUrl": null,
  "isFeatured": false,
  "isPinned": false,
  "publishedAt": "2024-02-01T08:00:00.000Z",
  "seoTitle": "SEO Title",
  "seoDescription": "SEO Description",
  "seoKeywords": "keyword1, keyword2",
  "categoryIds": [1, 2],
  "tagIds": [1, 3]
}
```

**Response:** `201 Created` — Object bài viết vừa tạo.

---

#### `PUT /admin/posts/:id` — Cập nhật bài viết

- `id` lấy từ cột `id` trong danh sách `GET /admin/posts`
- Dữ liệu khởi tạo form lấy từ `GET /admin/posts/:id`
- Nguồn dữ liệu từng field giống hệt form **tạo bài viết** ở trên
- Tất cả field đều optional — chỉ gửi field thay đổi

> Khi đổi `name`, `slug` tự động regenerate trừ khi người dùng tự nhập `slug` mới.  
> Sau update, cache public của bài viết tự động xoá.

**Response:** Object bài viết sau khi cập nhật.

---

#### `DELETE /admin/posts/:id` — Xoá bài viết

- `id` lấy từ cột `id` trong danh sách `GET /admin/posts`

**Response:** `200 OK`

---

### Danh mục (Admin)

#### `GET /admin/post-categories` — Danh sách danh mục

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `search` | string | Tìm theo tên | Ô tìm kiếm |
| `parentId` | string | Lọc theo danh mục cha | `id` lấy từ `GET /public/post-categories`, hoặc truyền `"null"` để lấy danh mục gốc |
| `status` | string | Lọc trạng thái | Hardcode enum **CategoryStatus**: `active`, `inactive` |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Tin tức",
      "slug": "tin-tuc",
      "description": "Mô tả danh mục",
      "parentId": null,
      "status": "active",
      "sortOrder": 0,
      "children": []
    }
  ],
  "meta": { "total": 10, "page": 1, "limit": 20 }
}
```

---

#### `GET /admin/post-categories/:id` — Chi tiết danh mục

Dùng để load dữ liệu vào form **sửa danh mục**.

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-categories`

**Response:** Object danh mục đầy đủ bao gồm SEO fields và `children`.

---

#### `POST /admin/post-categories` — Tạo danh mục

**Nguồn dữ liệu cho từng field trong form:**

| Field | Kiểu input | Nguồn dữ liệu / Ghi chú |
|-------|-----------|--------------------------|
| `name` | Text input | Người dùng nhập tay (max 255 ký tự) |
| `description` | Textarea | Người dùng nhập tay |
| `parentId` | Select | **`GET /public/post-categories`** → lấy `id` của danh mục cha, để trống nếu là danh mục gốc |
| `status` | Select/Radio | Hardcode enum **CategoryStatus**: `active`, `inactive` |
| `sortOrder` | Number input | Người dùng nhập tay (số thứ tự hiển thị) |
| `seoTitle` | Text input | Người dùng nhập tay (max 255 ký tự) |
| `seoDescription` | Textarea | Người dùng nhập tay |
| `seoKeywords` | Text input | Người dùng nhập tay (max 500 ký tự) |

**Request body:**
```json
{
  "name": "Tên danh mục",
  "description": "Mô tả",
  "parentId": 1,
  "status": "active",
  "sortOrder": 0,
  "seoTitle": "SEO Title",
  "seoDescription": "SEO Description",
  "seoKeywords": "keyword1, keyword2"
}
```

> `slug` tự động sinh từ `name`. Khi đặt `parentId`, hệ thống kiểm tra vòng lặp (cycle detection) để tránh danh mục là cha của chính nó.

**Response:** `201 Created`

---

#### `PUT /admin/post-categories/:id` — Cập nhật danh mục

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-categories`
- Dữ liệu khởi tạo form lấy từ `GET /admin/post-categories/:id`
- Nguồn dữ liệu từng field giống hệt form **tạo danh mục** ở trên

> Thay đổi `parentId` sẽ kiểm tra cycle detection. Cache public category tree tự động xoá sau update.

---

#### `DELETE /admin/post-categories/:id` — Xoá danh mục

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-categories`

---

### Thẻ tag (Admin)

#### `GET /admin/post-tags` — Danh sách tag

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `search` | string | Tìm theo tên | Ô tìm kiếm |
| `status` | string | Lọc trạng thái | Hardcode enum **TagStatus**: `active`, `inactive` |

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "NestJS", "slug": "nestjs", "description": "...", "status": "active" }
  ],
  "meta": { "total": 50, "page": 1, "limit": 20 }
}
```

---

#### `GET /admin/post-tags/:id` — Chi tiết tag

Dùng để load dữ liệu vào form **sửa tag**.

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-tags`

---

#### `POST /admin/post-tags` — Tạo tag

**Nguồn dữ liệu cho từng field trong form:**

| Field | Kiểu input | Nguồn dữ liệu / Ghi chú |
|-------|-----------|--------------------------|
| `name` | Text input | Người dùng nhập tay (max 255 ký tự) |
| `description` | Textarea | Người dùng nhập tay |
| `status` | Select/Radio | Hardcode enum **TagStatus**: `active`, `inactive` |

**Request body:**
```json
{
  "name": "Tên tag",
  "description": "Mô tả",
  "status": "active"
}
```

**Response:** `201 Created`

---

#### `PUT /admin/post-tags/:id` — Cập nhật tag

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-tags`
- Dữ liệu khởi tạo form lấy từ `GET /admin/post-tags/:id`
- Nguồn dữ liệu từng field giống hệt form **tạo tag** ở trên

---

#### `DELETE /admin/post-tags/:id` — Xoá tag

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-tags`

---

### Bình luận (Admin)

#### `GET /admin/post-comments` — Danh sách bình luận

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `search` | string | Tìm theo nội dung | Ô tìm kiếm |
| `postId` | string (số) | Lọc theo bài viết | `id` lấy từ `GET /admin/posts/simple` hoặc `GET /admin/posts` |
| `status` | string | Lọc trạng thái | Hardcode enum **CommentStatus**: `visible`, `hidden`, `spam`, `deleted` |
| `userId` | string (số) | Lọc theo người dùng | `id` lấy từ IAM Service (nếu có tích hợp) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "postId": "10",
      "userId": "5",
      "parentId": null,
      "content": "Nội dung bình luận",
      "status": "visible",
      "createdAt": "2024-01-15T08:00:00.000Z"
    }
  ]
}
```

---

#### `PATCH /admin/post-comments/:id` — Cập nhật trạng thái bình luận

- `id` lấy từ cột `id` trong danh sách `GET /admin/post-comments`

**Nguồn dữ liệu cho field `status`:**  
Hardcode enum **CommentStatus**: `visible`, `hidden`, `spam`, `deleted`

**Request body:**
```json
{ "status": "hidden" }
```

---

### Thống kê (Admin)

#### `GET /admin/stats/overview` — Tổng quan thống kê

Không có tham số. Trả về tổng hợp toàn bộ bài viết.

**Response:**
```json
{
  "success": true,
  "data": {
    "postsByStatus": {
      "draft": 10,
      "published": 85,
      "scheduled": 3,
      "archived": 12
    },
    "views": {
      "total": "123456",
      "today": "1234",
      "last7Days": "8900",
      "last30Days": "45000"
    }
  }
}
```

---

#### `GET /admin/stats/posts/:id/daily` — Thống kê theo ngày của bài viết

**Path params:**

| Param | Nguồn |
|-------|-------|
| `id` | `id` lấy từ `GET /admin/posts` |

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `startDate` | ISO 8601 | Ngày bắt đầu | Date picker (mặc định: 30 ngày trước) |
| `endDate` | ISO 8601 | Ngày kết thúc | Date picker (mặc định: hôm nay, tối đa 90 ngày) |

**Response:**
```json
{
  "success": true,
  "data": [
    { "date": "2024-01-01", "viewCount": "123" },
    { "date": "2024-01-02", "viewCount": "456" }
  ]
}
```

---

## Group Layer

Yêu cầu `Authorization: Bearer <token>`. User phải là thành viên nhóm với quyền tương ứng. `groupId` lấy từ route param, validate tại `GroupPermissionGuard`.

---

### Bài viết (Group)

#### `GET /groups/:groupId/posts` — Danh sách bài viết của nhóm

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — lấy từ context đăng nhập hoặc URL hiện tại |

**Quyền yêu cầu:** `post.view`

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `search` | string | Tìm theo tên | Ô tìm kiếm |
| `status` | string | Lọc trạng thái | Hardcode enum **PostStatus** |
| `postType` | string | Lọc loại bài | Hardcode enum **PostType** |
| `isFeatured` | string | Lọc bài nổi bật | Hardcode: `true`, `false` |
| `isPinned` | string | Lọc bài ghim | Hardcode: `true`, `false` |
| `categoryId` | string (số) | Lọc theo danh mục | `id` lấy từ `GET /public/post-categories` |
| `tagId` | string (số) | Lọc theo tag | `id` lấy từ `GET /public/post-tags` |

> Tự động lọc bài viết thuộc `groupId`. Không cần truyền `groupId` trong query.

**Response:** Tương tự `GET /admin/posts` nhưng chỉ bài viết của nhóm.

---

#### `GET /groups/:groupId/posts/:id` — Chi tiết bài viết trong nhóm

Dùng để load dữ liệu vào form **sửa bài viết** trong nhóm.

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — từ context |
| `id` | `id` lấy từ cột `id` trong `GET /groups/:groupId/posts` |

**Quyền yêu cầu:** `post.view`

> Trả về lỗi 404 nếu bài viết không thuộc nhóm.

**Response:** Tương tự `GET /admin/posts/:id`.

---

#### `POST /groups/:groupId/posts` — Tạo bài viết trong nhóm

**Quyền yêu cầu:** `post.create`

**Nguồn dữ liệu cho từng field trong form:**

| Field | Kiểu input | Nguồn dữ liệu / Ghi chú |
|-------|-----------|--------------------------|
| `name` | Text input | Người dùng nhập tay |
| `slug` | Text input | Tự sinh từ `name` nếu bỏ trống |
| `excerpt` | Textarea | Người dùng nhập tay (max 2000 ký tự) |
| `content` | Rich text editor | Người dùng nhập tay |
| `image` | URL / file upload | URL trả về từ Storage Service |
| `coverImage` | URL / file upload | URL trả về từ Storage Service |
| `status` | Select/Radio | Hardcode enum **PostStatus** |
| `postType` | Select/Radio | Hardcode enum **PostType** |
| `videoUrl` | Text input | Người dùng nhập URL (hiện khi `postType = video`) |
| `audioUrl` | Text input | Người dùng nhập URL (hiện khi `postType = audio`) |
| `isFeatured` | Checkbox/Toggle | Hardcode: `true` / `false` |
| `isPinned` | Checkbox/Toggle | Hardcode: `true` / `false` |
| `publishedAt` | Date-time picker | Người dùng chọn |
| `seoTitle` | Text input | Người dùng nhập tay |
| `seoDescription` | Textarea | Người dùng nhập tay |
| `seoKeywords` | Text input | Người dùng nhập tay |
| `categoryIds` | Multi-select | **`GET /public/post-categories`** → lấy `id` |
| `tagIds` | Multi-select / Tag input | **`GET /public/post-tags`** → lấy `id` |

> **Không truyền `groupId` trong body** — hệ thống tự inject từ route param `:groupId`.

**Request body:** Tương tự `POST /admin/posts` nhưng bỏ `groupId`.

**Response:** `201 Created`

---

#### `PUT /groups/:groupId/posts/:id` — Cập nhật bài viết trong nhóm

**Quyền yêu cầu:** `post.update`

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — từ context |
| `id` | `id` lấy từ `GET /groups/:groupId/posts` |

- Dữ liệu khởi tạo form lấy từ `GET /groups/:groupId/posts/:id`
- Nguồn dữ liệu từng field giống hệt form **tạo bài viết** ở trên

> Kiểm tra bài viết phải thuộc `groupId` trước khi update. Trả về 404 nếu không thuộc nhóm.

---

#### `DELETE /groups/:groupId/posts/:id` — Xoá bài viết trong nhóm

**Quyền yêu cầu:** `post.delete`

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — từ context |
| `id` | `id` lấy từ `GET /groups/:groupId/posts` |

> Kiểm tra bài viết thuộc nhóm trước khi xoá.

---

### Bình luận (Group)

#### `GET /groups/:groupId/post-comments` — Danh sách bình luận của nhóm

**Quyền yêu cầu:** `post.view`

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `postId` | string (số) | Lọc theo bài viết | `id` lấy từ `GET /groups/:groupId/posts` |
| `status` | string | Lọc trạng thái | Hardcode enum **CommentStatus** |

> Delegate sang `AdminCommentService`, tự động scope theo `groupId`.

---

#### `PATCH /groups/:groupId/post-comments/:id` — Cập nhật trạng thái bình luận

**Quyền yêu cầu:** `post.update`

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — từ context |
| `id` | `id` lấy từ `GET /groups/:groupId/post-comments` |

**Nguồn dữ liệu cho field `status`:**  
Hardcode enum **CommentStatus**: `visible`, `hidden`, `spam`, `deleted`

**Request body:**
```json
{ "status": "hidden" }
```

> Kiểm tra bình luận thuộc bài viết trong nhóm trước khi update.

---

### Thống kê (Group)

#### `GET /groups/:groupId/stats/overview` — Tổng quan thống kê nhóm

**Quyền yêu cầu:** `post.view`

Không có tham số thêm. Delegate sang `StatsAdminService.getOverview(groupId)`.

**Response:** Tương tự `GET /admin/stats/overview` nhưng chỉ dữ liệu của nhóm.

---

#### `GET /groups/:groupId/stats/posts/:id/daily` — Thống kê theo ngày

**Quyền yêu cầu:** `post.view`

**Path params:**

| Param | Nguồn |
|-------|-------|
| `groupId` | ID nhóm — từ context |
| `id` | `id` lấy từ `GET /groups/:groupId/posts` |

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `startDate` | ISO 8601 | Ngày bắt đầu | Date picker |
| `endDate` | ISO 8601 | Ngày kết thúc | Date picker (tối đa 90 ngày) |

> Validate bài viết phải thuộc nhóm trước khi trả về số liệu.

---

## Public Layer

Không cần authentication. Được cache Redis để tối ưu hiệu suất.

---

### `GET /public/posts` — Danh sách bài viết công khai

> Cache Redis 60s, versioned. Chỉ trả về bài viết `status = published`.

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng | Nhập tay |
| `search` | string | Tìm theo tên | Ô tìm kiếm |
| `sort` | string | Trường sắp xếp | Hardcode: `name`, `createdAt`, `publishedAt`, `viewCount` |
| `order` | string | Chiều sắp xếp | Hardcode: `asc`, `desc` |
| `postType` | string | Lọc loại bài | Hardcode enum **PostType** |
| `isFeatured` | string | Lọc bài nổi bật | Hardcode: `true`, `false` |
| `isPinned` | string | Lọc bài ghim | Hardcode: `true`, `false` |
| `categoryId` / `postCategoryId` | string (số) | Lọc theo danh mục | `id` lấy từ `GET /public/post-categories` |
| `tagId` / `postTagId` | string (số) | Lọc theo tag | `id` lấy từ `GET /public/post-tags` |

---

### `GET /public/posts/:slug` — Chi tiết bài viết theo slug

> Cache Redis 120s. Mỗi lượt xem duy nhất được ghi qua HyperLogLog, batch-flush vào DB.

**Path params:**
- `slug` — lấy từ trường `slug` trong response của `GET /public/posts`

---

### `GET /public/post-categories` — Toàn bộ cây danh mục

> Cache Redis 600s. Trả về cây phân cấp đệ quy, chỉ gồm danh mục `active`.

**Dùng để:**
- Populate dropdown "Danh mục" trong form tạo/sửa bài viết (admin & group)
- Populate filter "Danh mục" trong trang danh sách bài viết
- Render menu điều hướng theo danh mục

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Tin tức",
      "slug": "tin-tuc",
      "status": "active",
      "sortOrder": 0,
      "children": [
        {
          "id": 2,
          "name": "Tin công nghệ",
          "slug": "tin-cong-nghe",
          "children": []
        }
      ]
    }
  ]
}
```

> Khi render dropdown chọn danh mục: dùng `id` để gán vào `categoryIds[]`, dùng `name` để hiển thị label.

---

### `GET /public/post-tags` — Toàn bộ danh sách tag active

> Cache Redis 600s. Chỉ trả về tag `status = active`.

**Dùng để:**
- Populate autocomplete/tag-input "Tags" trong form tạo/sửa bài viết (admin & group)
- Populate filter "Tag" trong trang danh sách bài viết

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "NestJS", "slug": "nestjs" },
    { "id": 2, "name": "TypeScript", "slug": "typescript" }
  ]
}
```

> Khi render tag input: dùng `id` để gán vào `tagIds[]`, dùng `name` để hiển thị label.

---

### `GET /public/post-comments` — Danh sách bình luận công khai

> Cache Redis 60s, versioned. Chỉ trả về bình luận `status = visible`.

**Query params:**

| Param | Kiểu | Mô tả | Nguồn giá trị |
|-------|------|-------|--------------|
| `postId` | string (số) | **Bắt buộc** — ID bài viết | `id` lấy từ `GET /public/posts` hoặc từ context trang hiện tại |
| `page` | number | Trang | Nhập tay |
| `limit` | number | Số lượng root comments | Nhập tay |

> Mỗi root comment trả kèm `replies` (tối đa 50 reply). Comment chỉ có 2 cấp (root → reply).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "postId": "10",
      "userId": "5",
      "content": "Bình luận hay quá!",
      "status": "visible",
      "createdAt": "2024-01-15T08:00:00.000Z",
      "replies": [
        {
          "id": "2",
          "parentId": "1",
          "content": "Cảm ơn bạn!",
          "createdAt": "2024-01-15T09:00:00.000Z"
        }
      ]
    }
  ]
}
```

---

## User Layer

Yêu cầu `Authorization: Bearer <token>`. Không cần quyền cụ thể — user thao tác dữ liệu của chính mình.

---

### `POST /user/post-comments` — Tạo bình luận

**Nguồn dữ liệu cho từng field:**

| Field | Kiểu input | Nguồn dữ liệu / Ghi chú |
|-------|-----------|--------------------------|
| `postId` | Hidden / từ context | `id` của bài viết hiện tại — lấy từ `GET /public/posts/:slug` hoặc URL |
| `parentId` | Hidden / từ context | `id` của comment cha — lấy từ `GET /public/post-comments` khi user bấm "Trả lời"; để trống nếu là bình luận gốc |
| `content` | Textarea | Người dùng nhập tay (min 1, max 5000 ký tự) |

> - Hệ thống kiểm tra bài viết phải đang `published`.
> - `parentId` phải là root comment (không phải reply) — hệ thống chỉ cho phép 1 cấp thread.
> - Tạo Outbox event để gửi thông báo reply bất đồng bộ qua Notification Service.

**Request body:**
```json
{
  "postId": 10,
  "parentId": 1,
  "content": "Nội dung bình luận"
}
```

**Response:** `201 Created`

---

### `PUT /user/post-comments/:id` — Sửa bình luận của mình

**Path params:**

| Param | Nguồn |
|-------|-------|
| `id` | `id` lấy từ `GET /public/post-comments` (chỉ sửa được bình luận của chính mình) |

**Field `content`:** Người dùng nhập tay (min 1, max 10000 ký tự).

**Request body:**
```json
{ "content": "Nội dung đã chỉnh sửa" }
```

> Hệ thống kiểm tra ownership — trả về 403 nếu không phải bình luận của user đang đăng nhập.

---

### `DELETE /user/post-comments/:id` — Xoá bình luận của mình

**Path params:**

| Param | Nguồn |
|-------|-------|
| `id` | `id` lấy từ `GET /public/post-comments` (chỉ xoá được bình luận của chính mình) |

> Xoá mềm: đặt `status = deleted`, không xoá vật lý. Bình luận đã xoá không hiển thị ở public API.

---

## Xử lý danh mục / tag đã inactive trong form sửa

### Vấn đề

Bài viết được tạo khi danh mục / tag đang `active`. Sau đó admin tắt danh mục / tag đó (`status = inactive`). Lúc này:

- `GET /public/post-categories` và `GET /public/post-tags` **không trả về** mục đã inactive.
- Nhưng `GET /admin/posts/:id` (hoặc `GET /groups/:groupId/posts/:id`) **vẫn trả về đầy đủ** `categories[]` và `tags[]` kể cả mục đã inactive — vì đây là dữ liệu thực tế bài viết đang gán.

Nếu frontend chỉ render options từ public API rồi match với `categoryIds` thì mục inactive sẽ **biến mất khỏi UI** dù vẫn được gán trong DB.

---

### Cách xử lý đúng

Khi mở form sửa bài viết, frontend gọi song song hai API:

```
GET /admin/posts/:id             (hoặc GET /groups/:groupId/posts/:id)
GET /public/post-categories
GET /public/post-tags
```

Sau đó **merge options** trước khi render dropdown:

```js
// Danh mục đang được gán (kể cả inactive)
const assignedCategories = post.categories  // [{ id, name, slug, ... }]

// Options từ public API (chỉ active)
const activeCategories = await GET('/public/post-categories')  // flatten tree nếu cần

// Merge: giữ lại mục inactive đang được gán, không thêm mục inactive khác
const dropdownOptions = [
  ...activeCategories,
  ...assignedCategories.filter(c => !activeCategories.find(a => a.id === c.id))
]
```

Render mục inactive với style cảnh báo để admin nhận biết:

```
☑ Tin tức                ← active, bình thường
☑ Thể thao  ⚠ Inactive   ← inactive nhưng đang được gán, hiển thị badge
☐ Công nghệ              ← active, chưa chọn
```

Logic tương tự áp dụng cho **tags**.

---

### Hành vi sau khi admin submit

| Hành động | Kết quả |
|-----------|---------|
| Giữ nguyên (không bỏ check mục inactive) | `categoryIds` vẫn gồm id đó → DB không thay đổi |
| Bỏ check mục inactive | `categoryIds` không còn id đó → bài viết gỡ liên kết với danh mục inactive |
| Không thay đổi gì, chỉ sửa field khác | Nên giữ nguyên `categoryIds` gốc để tránh vô tình gỡ liên kết |

---

### Tại sao không gọi admin API để lấy cả inactive?

| | Admin API | Cách merge trên |
|-|-----------|----------------|
| Group layer có dùng được không? | ❌ Không — thiếu quyền `post.manage` | ✅ Có |
| Cần xử lý pagination? | ✅ Có (limit/page) | ❌ Không |
| Lấy đúng mức cần thiết? | ❌ Thừa (trả về cả inactive chưa liên quan) | ✅ Chỉ inactive đang gán |

---

## Response Format

Tất cả response theo format chuẩn:

```json
{
  "success": true,
  "data": { },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  },
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

Lỗi:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Bài viết không tồn tại"
  },
  "timestamp": "2024-01-15T08:00:00.000Z"
}
```

---

## Headers bắt buộc

| Header | Giá trị | Khi nào |
|--------|---------|---------|
| `Authorization` | `Bearer <jwt_token>` | Tất cả route có auth (admin, group, user) |
| `Content-Type` | `application/json` | POST / PUT / PATCH |
| `x-internal-secret` | `<INTERNAL_API_SECRET>` | Route nội bộ `@Internal()` |

# API Tài liệu — Thống kê Bài viết (Post Statistics)

**Base URL:** `https://api.example.com`  
**Service:** post-service (port 3008)  
**Phiên bản:** v1

> BigInt được serialize thành **string** trong response (tránh mất độ chính xác trong JS).

---

## Cơ chế đếm lượt xem

- Khi FE gọi `GET /api/public/posts/:slug`, hệ thống tự động đếm lượt xem mới.
- Deduplicate theo user (nếu có JWT) hoặc theo IP — mỗi người chỉ tính 1 lần/ngày.
- Lượt xem được buffer trong Redis và đồng bộ vào DB mỗi ~2 giây.
- Field `stats.viewCount` phản ánh lượt xem tích lũy (không phải real-time tức thì).

---

## A. Tổng quan thống kê (Admin Dashboard)

```
GET /api/admin/stats/overview
Authorization: Bearer <token>
Permission: post.manage
```

Không có query parameter.

### Response

```jsonc
{
  "success": true,
  "data": {
    "posts": {
      "total": 247,
      "published": 150,
      "draft": 50,
      "scheduled": 10,
      "archived": 37
    },
    "views": {
      "total": "1234567",     // string (BigInt) — tổng lượt xem mọi thời gian
      "today": "3421",        // string (BigInt) — lượt xem hôm nay (từ 00:00)
      "last7Days": "25000",   // string (BigInt) — 7 ngày gần nhất kể cả hôm nay
      "last30Days": "98000"   // string (BigInt) — 30 ngày gần nhất kể cả hôm nay
    }
  },
  "timestamp": "2025-06-04T08:00:00.000Z"
}
```

---

## B. Thống kê lượt xem theo ngày của 1 bài viết (Admin)

```
GET /api/admin/stats/posts/:id/daily
Authorization: Bearer <token>
Permission: post.manage
```

### Path Parameters

| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `id` | `string (số)` | ID bài viết |

### Query Parameters

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---------|------|----------|-------|
| `startDate` | `string (YYYY-MM-DD)` | Không | Ngày bắt đầu. Mặc định: 30 ngày trước `endDate` |
| `endDate` | `string (YYYY-MM-DD)` | Không | Ngày kết thúc. Mặc định: hôm nay |

> Tối đa 90 ngày mỗi request. Nếu khoảng cách > 90 ngày, `startDate` tự động điều chỉnh về `endDate - 90 ngày`.

### Response

```jsonc
{
  "success": true,
  "data": {
    "postId": "7432819023456",
    "name": "Bài viết hay nhất",
    "slug": "bai-viet-hay-nhat",
    "totalViews": "15421",       // string (BigInt) — tổng tích lũy mọi thời gian
    "daily": [
      { "date": "2025-05-06", "viewCount": "120" },
      { "date": "2025-05-07", "viewCount": "89" },
      { "date": "2025-05-08", "viewCount": "204" }
    ]
  },
  "timestamp": "2025-06-04T08:00:00.000Z"
}
```

> **Lưu ý:** Ngày không có lượt xem nào sẽ không xuất hiện trong `daily` (sparse — không fill 0). FE tự fill 0 khi vẽ chart.

### Ví dụ — 30 ngày gần nhất

```
GET /api/admin/stats/posts/7432819023456/daily
```

### Ví dụ — Tháng 5/2025

```
GET /api/admin/stats/posts/7432819023456/daily?startDate=2025-05-01&endDate=2025-05-31
```

---

## 1. Danh sách bài viết (Public)

```
GET /api/public/posts
Authorization: Không cần
```

### Query Parameters

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---------|------|----------|-------|
| `page` | `number` | Không | Trang hiện tại (mặc định: 1) |
| `limit` | `number` | Không | Số item mỗi trang (mặc định: 10, tối đa: 100) |
| `search` | `string` | Không | Tìm kiếm theo tên bài viết |
| `postType` | `string` | Không | Loại bài: `text` \| `video` \| `image` \| `audio` |
| `isFeatured` | `"true"\|"false"` | Không | Lọc bài viết nổi bật |
| `isPinned` | `"true"\|"false"` | Không | Lọc bài viết ghim |
| `categoryId` | `string (số)` | Không | Lọc theo ID danh mục (cũng nhận `postCategoryId`) |
| `tagId` | `string (số)` | Không | Lọc theo ID thẻ (cũng nhận `postTagId`) |
| `sort` | `string` | Không | Sắp xếp — xem bảng sort bên dưới |
| `skipCount` | `"true"\|"false"` | Không | Bỏ qua query đếm total (tăng hiệu năng) |

**Các giá trị `sort` hợp lệ:**

| Giá trị | Mô tả |
|---------|-------|
| `viewCount:desc` | Nhiều lượt xem nhất (dùng cho "hot/trending") |
| `viewCount:asc` | Ít lượt xem nhất |
| `createdAt:desc` | Mới nhất (mặc định) |
| `createdAt:asc` | Cũ nhất |
| `publishedAt:desc` | Mới xuất bản nhất |
| `name:asc` | Tên A→Z |
| `isFeatured:desc` | Nổi bật lên trước |

> Chỉ trả về bài có status `published`.

### Response

```jsonc
{
  "success": true,
  "data": [
    {
      "id": "7432819023456",          // string (BigInt)
      "slug": "bai-viet-hay-nhat",
      "name": "Bài viết hay nhất",
      "excerpt": "Mô tả ngắn...",
      "image": "https://cdn.example.com/img.jpg",
      "coverImage": "https://cdn.example.com/cover.jpg",
      "status": "published",
      "postType": "text",             // text | video | image | audio
      "videoUrl": null,
      "audioUrl": null,
      "isFeatured": true,
      "isPinned": false,
      "publishedAt": "2025-06-01T08:00:00.000Z",
      "seoTitle": "SEO Title",
      "seoDescription": "SEO mô tả",
      "seoKeywords": "từ khóa, seo",
      "createdAt": "2025-05-30T12:00:00.000Z",
      "updatedAt": "2025-06-01T08:00:00.000Z",
      "stats": {
        "postId": "7432819023456",    // string (BigInt)
        "viewCount": "15420",         // string (BigInt) — tổng lượt xem
        "updatedAt": "2025-06-04T07:58:00.000Z"
      },
      "categories": [
        { "id": "1", "name": "Công nghệ", "slug": "cong-nghe" }
      ],
      "tags": [
        { "id": "5", "name": "NestJS", "slug": "nestjs" }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 247,
    "totalPages": 25
  },
  "timestamp": "2025-06-04T08:00:00.000Z"
}
```

### Ví dụ — Top bài xem nhiều nhất

```
GET /api/public/posts?sort=viewCount:desc&limit=10&page=1
```

### Ví dụ — Bài nổi bật mới nhất

```
GET /api/public/posts?isFeatured=true&sort=createdAt:desc&limit=5
```

---

## 2. Chi tiết bài viết (Public) — Kèm đếm lượt xem

```
GET /api/public/posts/:slug
Authorization: Không cần (tùy chọn: Bearer token để ghi nhận user)
```

### Path Parameters

| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `slug` | `string` | Slug của bài viết |

> **Quan trọng:** Mỗi lần gọi endpoint này, hệ thống tự ghi nhận 1 lượt xem (deduplicate theo user/IP theo ngày). FE cần gọi endpoint này khi user thực sự đọc bài — không gọi ngầm, không prefetch hàng loạt.

### Response

```jsonc
{
  "success": true,
  "data": {
    "id": "7432819023456",
    "slug": "bai-viet-hay-nhat",
    "name": "Bài viết hay nhất",
    "excerpt": "Mô tả ngắn...",
    "content": "<p>Nội dung HTML đầy đủ...</p>",
    "image": "https://cdn.example.com/img.jpg",
    "coverImage": "https://cdn.example.com/cover.jpg",
    "status": "published",
    "postType": "text",
    "videoUrl": null,
    "audioUrl": null,
    "isFeatured": true,
    "isPinned": false,
    "publishedAt": "2025-06-01T08:00:00.000Z",
    "seoTitle": "SEO Title",
    "seoDescription": "SEO mô tả",
    "seoKeywords": "từ khóa, seo",
    "createdAt": "2025-05-30T12:00:00.000Z",
    "updatedAt": "2025-06-01T08:00:00.000Z",
    "stats": {
      "postId": "7432819023456",
      "viewCount": "15421",
      "updatedAt": "2025-06-04T07:58:00.000Z"
    },
    "categories": [
      { "id": "1", "name": "Công nghệ", "slug": "cong-nghe" }
    ],
    "tags": [
      { "id": "5", "name": "NestJS", "slug": "nestjs" }
    ]
  },
  "timestamp": "2025-06-04T08:00:00.000Z"
}
```

### Ví dụ request

```
GET /api/public/posts/bai-viet-hay-nhat
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...   (không bắt buộc)
```

---

## 3. Danh sách bài viết (Admin)

```
GET /api/admin/posts
Authorization: Bearer <token>
Permission: post.manage
```

### Query Parameters

Tất cả như endpoint public, thêm:

| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `status` | `string` | Lọc theo status: `draft` \| `scheduled` \| `published` \| `archived` |

> Admin thấy **tất cả** status (draft, scheduled, published, archived).

### Response

Cấu trúc giống public, thêm 2 field trong mỗi bài:

```jsonc
{
  "categories": [...],
  "categoryIds": ["1", "3"],
  "tags": [...],
  "tagIds": ["5", "8"]
}
```

---

## 4. Danh sách bài viết đơn giản (Admin — dropdown/select)

```
GET /api/admin/posts/simple
Authorization: Bearer <token>
Permission: post.manage
```

### Response

```jsonc
{
  "success": true,
  "data": [
    { "id": "7432819023456", "name": "Bài viết hay nhất", "slug": "bai-viet-hay-nhat", "status": "published" },
    { "id": "7432819023457", "name": "Bài viết thứ 2",   "slug": "bai-viet-thu-2",    "status": "draft" }
  ]
}
```

Dùng cho dropdown chọn bài viết, không có thống kê.

---

## 5. Chi tiết bài viết (Admin)

```
GET /api/admin/posts/:id
Authorization: Bearer <token>
Permission: post.manage
```

### Path Parameters

| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `id` | `string (số)` | ID bài viết (BigInt dạng string) |

---

## 6. Tạo bài viết (Admin)

```
POST /api/admin/posts
Authorization: Bearer <token>
Permission: post.manage
Content-Type: application/json
```

### Request Body

```jsonc
{
  "name": "Tiêu đề bài viết",              // bắt buộc, max 255 ký tự
  "slug": "tieu-de-bai-viet",              // tùy chọn, tự sinh từ name nếu không truyền
  "excerpt": "Mô tả ngắn",                // tùy chọn, max 2000 ký tự
  "content": "<p>Nội dung HTML</p>",      // tùy chọn, max 200.000 ký tự
  "image": "https://cdn/.../img.jpg",     // tùy chọn, max 500 ký tự
  "coverImage": "https://cdn/.../c.jpg",  // tùy chọn, max 500 ký tự
  "status": "draft",                      // draft | scheduled | published | archived
  "postType": "text",                     // text | video | image | audio
  "videoUrl": "https://...",              // tùy chọn, http(s) URL
  "audioUrl": "https://...",              // tùy chọn, http(s) URL
  "isFeatured": false,
  "isPinned": false,
  "publishedAt": "2025-06-10T08:00:00Z",  // tùy chọn, ISO 8601
  "seoTitle": "SEO Title",                // tùy chọn, max 255 ký tự
  "seoDescription": "SEO mô tả",         // tùy chọn, max 2000 ký tự
  "seoKeywords": "từ khóa",              // tùy chọn, max 500 ký tự
  "categoryIds": [1, 3],                  // tùy chọn, mảng ID danh mục (số nguyên)
  "tagIds": [5, 8]                        // tùy chọn, mảng ID thẻ (số nguyên)
}
```

### Response — 201 Created

Trả về bài viết đã tạo với `stats.viewCount` ban đầu là `"0"`.

---

## 7. Cập nhật bài viết (Admin)

```
PUT /api/admin/posts/:id
Authorization: Bearer <token>
Permission: post.manage
Content-Type: application/json
```

Body giống `POST`, tất cả field đều optional.

---

## 8. Xóa bài viết (Admin)

```
DELETE /api/admin/posts/:id
Authorization: Bearer <token>
Permission: post.manage
```

### Response

```jsonc
{ "success": true, "data": null }
```

---

## Mã lỗi thường gặp

| HTTP Code | Mô tả |
|-----------|-------|
| `400` | Dữ liệu đầu vào không hợp lệ (validation error) |
| `401` | Chưa đăng nhập / token không hợp lệ |
| `403` | Không có quyền `post.manage` |
| `404` | Bài viết không tồn tại hoặc chưa published (public route) |
| `409` | Slug đã tồn tại |

---

## Lưu ý tích hợp FE

1. **`id` và `viewCount` là string** — BigInt được serialize thành string để tránh mất độ chính xác trong JS. Đừng dùng `parseInt()` nếu giá trị > 2^53.
2. **Hiển thị lượt xem:** Đọc `post.stats.viewCount` (string), convert sang `Number()` để hiển thị nếu giá trị < 9 triệu tỷ (safe).
3. **Endpoint lấy detail tự đếm view** — chỉ gọi `GET /api/public/posts/:slug` khi user thực sự mở trang đọc bài, không gọi trong preview/hover/prefetch.
4. **Trending/Hot:** Dùng `?sort=viewCount:desc` để lấy bài xem nhiều nhất.
5. **`stats` có thể null** với bài rất cũ chưa có record stats — FE cần guard: `post.stats?.viewCount ?? "0"`.

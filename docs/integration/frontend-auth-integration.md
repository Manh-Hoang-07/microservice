# Tích hợp Auth Service — Tài liệu API cho Frontend

> **Base URL:** `/api/auth` (qua Nginx proxy -> auth-service:3001)
>
> Tất cả path bên dưới đều có prefix `/api/auth`. Ví dụ: `POST /api/auth/login`

---

## Cấu trúc Response chung

```json
// Thành công
{
  "success": true,
  "message": "Success",
  "code": "SUCCESS",
  "httpStatus": 200,
  "data": { ... },
  "meta": {},
  "timestamp": "2026-05-13T10:00:00+07:00"
}

// Lỗi
{
  "success": false,
  "message": "Mô tả lỗi",
  "code": "ERROR_CODE",
  "httpStatus": 400,
  "data": null,
  "meta": {},
  "timestamp": "2026-05-13T10:00:00+07:00"
}
```

---

## Phân quyền

| Ký hiệu | Nghĩa |
|---------|-------|
| Public | Không cần đăng nhập |
| User | Cần header `Authorization: Bearer {token}` |
| Admin | Cần JWT có quyền `user.manage` |

---

## Lưu ý chung

- **Request body và response đều dùng camelCase** — `countryId`, `createdAt`, không phải `country_id`.
- **ID là string** — BigInt serialize thành string. Gửi lên phải là numeric string (VD: `"123"`).
- **Token**: lưu `accessToken` và `refreshToken` phía client. Gửi `Authorization: Bearer {accessToken}` cho mọi request cần xác thực.
- **Throttle**: các endpoint auth có giới hạn request/phút để chống brute-force.
- **Enum `status`:** `"active"` | `"inactive"` | `"locked"`.
- **Enum `gender`:** `"male"` | `"female"` | `"other"`.

---

## 1. Đăng nhập / Đăng ký / OTP

### Public POST `/api/auth/login`

Đăng nhập bằng email + password. **Throttle: 5 req/60s**

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "12345678",
  "remember": true
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `email` | string (email) | Có | Tự động trim + lowercase |
| `password` | string (6-72) | Có | |
| `remember` | boolean | Không | `true` -> refresh token TTL dài hơn |

**Response `data`:**

```json
{
  "token": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "expiresIn": 3600
}
```

> **Lưu ý:** Response login chỉ trả token, KHÔNG trả user object. FE cần gọi thêm `GET /api/auth/me` để lấy thông tin user.

**Lỗi thường gặp:**
- `401` — Email hoặc mật khẩu không đúng
- `403` — Tài khoản bị khóa
- `429` — Quá nhiều request

---

### Public POST `/api/auth/register/send-otp`

Gửi OTP xác thực email trước khi đăng ký. **Throttle: 2 req/60s**

```json
{ "email": "newuser@example.com" }
```

**Response `data`:**

```json
{ "message": "OTP_SENT" }
```

---

### Public POST `/api/auth/register`

Đăng ký tài khoản mới. **Throttle: 5 req/60s**

**Request Body:**

```json
{
  "name": "Nguyen Van A",
  "email": "newuser@example.com",
  "username": "nguyenvana",
  "phone": "+84901234567",
  "password": "MyPass1234",
  "confirmPassword": "MyPass1234",
  "otp": "123456"
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `name` | string (max 255) | Có | Trim |
| `email` | string (email) | Có | Trim + lowercase |
| `username` | string (3-50) | Không | Chỉ `a-z0-9_`, tự động lowercase |
| `phone` | string | Không | Format: `+?[0-9]{6,20}` |
| `password` | string (8-72) | Có | |
| `confirmPassword` | string | Có | Phải khớp `password` |
| `otp` | string (6 số) | Có | OTP nhận qua email |

**Response `data`:** (HTTP 201)

```json
{
  "user": {
    "id": "2",
    "username": "nguyenvana",
    "email": "newuser@example.com",
    "phone": "+84901234567",
    "name": "Nguyen Van A",
    "image": null,
    "googleId": null,
    "status": "active",
    "emailVerifiedAt": "2026-05-13T10:00:00.000Z",
    "phoneVerifiedAt": null,
    "lastLoginAt": null,
    "createdUserId": null,
    "updatedUserId": null,
    "createdAt": "2026-05-13T10:00:00.000Z",
    "updatedAt": "2026-05-13T10:00:00.000Z",
    "profile": null
  }
}
```

> **Lưu ý:** Register trả full user object (trừ `password` và `rememberToken`).

---

### Public POST `/api/auth/forgot-password/send-otp`

Gửi OTP reset password. **Throttle: 2 req/60s**

```json
{ "email": "user@example.com" }
```

**Response `data`:**

```json
{ "message": "OTP_SENT" }
```

Luôn trả `200` bất kể email có tồn tại hay không (chống enumeration).

---

### Public POST `/api/auth/reset-password`

Đặt lại mật khẩu bằng OTP. **Throttle: 3 req/60s**

```json
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "NewPass1234",
  "confirmPassword": "NewPass1234"
}
```

| Field | Kiểu | Bắt buộc |
|-------|------|----------|
| `email` | string (email) | Có |
| `otp` | string (6 số) | Có |
| `password` | string (8-72) | Có |
| `confirmPassword` | string | Có — phải khớp |

**Response `data`:**

```json
{ "success": true }
```

---

## 2. Token & Session

### Public POST `/api/auth/refresh`

Làm mới access token. **Throttle: 10 req/60s**

```json
{ "refreshToken": "eyJhbGciOi..." }
```

Cũng có thể gửi qua cookie `refresh_token` (không cần body).

**Response `data`:**

```json
{
  "token": "eyJhbGciOi...(mới)",
  "refreshToken": "eyJhbGciOi...(mới)",
  "expiresIn": 3600
}
```

---

### Public POST `/api/auth/logout`

Đăng xuất session hiện tại.

```json
{ "refreshToken": "eyJhbGciOi..." }
```

Hoặc gửi qua cookie. Server tự động xóa cookie `access_token` và `refresh_token`.

**Response `data`:**

```json
{ "success": true }
```

---

### User POST `/api/auth/logout-all`

Thu hồi tất cả session của user hiện tại. Không cần body.

**Response `data`:**

```json
{ "success": true }
```

---

## 3. Thông tin User hiện tại

### User GET `/api/auth/me`

Lấy thông tin user đang đăng nhập.

**Response `data`:**

```json
{
  "id": "1",
  "username": "admin",
  "email": "user@example.com",
  "phone": "+84901234567",
  "name": "Admin User",
  "image": "https://cdn.example.com/avatar.jpg",
  "googleId": null,
  "status": "active",
  "emailVerifiedAt": "2026-01-01T00:00:00.000Z",
  "phoneVerifiedAt": null,
  "lastLoginAt": "2026-05-13T10:00:00.000Z",
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-05-13T10:00:00.000Z",
  "profile": {
    "id": "1",
    "userId": "1",
    "birthday": "1990-01-15",
    "gender": "male",
    "address": "123 ABC Street",
    "countryId": "1",
    "provinceId": "2",
    "wardId": "3",
    "about": "Hello world",
    "createdUserId": null,
    "updatedUserId": null,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

## 4. Profile (User tự quản lý)

### User GET `/api/auth/user/profile`

Lấy profile của mình. Response giống GET /me (full user + profile).

---

### User PATCH `/api/auth/user/profile`

Cập nhật profile. Tất cả field optional — chỉ gửi field cần thay đổi.

```json
{
  "name": "Nguyen Van B",
  "image": "https://cdn.example.com/new-avatar.jpg",
  "birthday": "1990-01-15",
  "gender": "male",
  "address": "456 DEF Street",
  "countryId": "1",
  "provinceId": "2",
  "wardId": "3",
  "about": "Updated bio"
}
```

| Field | Kiểu | Mô tả |
|-------|------|-------|
| `name` | string (max 255) | |
| `image` | string (max 255) | URL avatar |
| `birthday` | string | Format `YYYY-MM-DD` |
| `gender` | `male` \| `female` \| `other` | |
| `countryId` | numeric string (1-20 digits) | |
| `provinceId` | numeric string (1-20 digits) | |
| `wardId` | numeric string (1-20 digits) | |
| `about` | string (max 2000) | |

---

### User PATCH `/api/auth/user/profile/change-password`

Đổi mật khẩu.

```json
{
  "oldPassword": "OldPass1234",
  "password": "NewPass1234",
  "confirmPassword": "NewPass1234"
}
```

**Response `data`:**

```json
{ "success": true }
```

---

## 5. Google OAuth

### Public GET `/api/auth/google`

Redirect đến trang đăng nhập Google.

### Public GET `/api/auth/google/callback`

Google redirect về đây. Server set cookie và redirect về FE.

**Luồng tích hợp:**

```
1. FE: window.location.href = '/api/auth/google'
2. User đăng nhập Google
3. Server nhận callback, tạo/cập nhật user, set cookies
4. Thành công: redirect về {GOOGLE_FRONTEND_URL}/auth/google/success (set cookie access_token, refresh_token)
5. Thất bại: redirect về {GOOGLE_FRONTEND_URL}/login?error={code}
   - error code: bad_request | unauthorized | auth_failed
6. FE đọc token từ cookie hoặc gọi GET /api/auth/me
```

**Cookies được set:**
- `access_token` (HttpOnly, Secure)
- `refresh_token` (HttpOnly, Secure)

---

## 6. Quản lý User (Admin)

### Admin GET `/api/auth/admin/users`

Danh sách user có phân trang.

**Query params:**

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `email` | string | Lọc theo email |
| `phone` | string | Lọc theo SĐT |
| `status` | `active` \| `inactive` \| `locked` | |
| `skip` | number | Mặc định `0` |
| `take` | number | Mặc định `10` |
| `sort` | string | VD: `createdAt` (field sort) |
| `skipCount` | boolean string | `"true"` -> bỏ qua đếm tổng |

**Response `data`:**

```json
[
  {
    "id": "1",
    "username": "admin",
    "email": "user@example.com",
    "phone": "+84901234567",
    "name": "Admin User",
    "image": null,
    "status": "active",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "lastLoginAt": "2026-05-13T10:00:00.000Z"
  }
]
```

**Response `meta`:**

```json
{
  "total": 100,
  "skip": 0,
  "take": 10,
  "pageCount": 10,
  "pageNumber": 1
}
```

---

### Admin GET `/api/auth/admin/users/simple`

Danh sách rút gọn — dùng cho dropdown. Max 200 records.

**Response `data[i]`:**

```json
{
  "id": "1",
  "name": "Admin User",
  "email": "user@example.com",
  "image": null,
  "status": "active"
}
```

---

### Admin GET `/api/auth/admin/users/:id`

Chi tiết user (bao gồm profile).

**Response `data`:**

```json
{
  "id": "1",
  "username": "admin",
  "email": "user@example.com",
  "phone": "+84901234567",
  "name": "Admin User",
  "image": null,
  "googleId": null,
  "status": "active",
  "emailVerifiedAt": "2026-01-01T00:00:00.000Z",
  "phoneVerifiedAt": null,
  "lastLoginAt": "2026-05-13T10:00:00.000Z",
  "createdUserId": null,
  "updatedUserId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-05-13T10:00:00.000Z",
  "profile": {
    "id": "1",
    "userId": "1",
    "birthday": "1990-01-15",
    "gender": "male",
    "address": "123 ABC Street",
    "countryId": "1",
    "provinceId": "2",
    "wardId": "3",
    "about": "Hello world",
    "createdUserId": null,
    "updatedUserId": null,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

### Admin POST `/api/auth/admin/users`

Tạo user mới. (HTTP 201)

```json
{
  "email": "new@example.com",
  "username": "newuser",
  "phone": "+84901234567",
  "password": "Pass1234",
  "name": "New User",
  "image": "https://...",
  "profile": {
    "birthday": "1995-06-15",
    "gender": "female",
    "address": "...",
    "countryId": "1",
    "provinceId": "2",
    "wardId": "3",
    "about": "..."
  }
}
```

| Field | Kiểu | Bắt buộc |
|-------|------|----------|
| `password` | string (6-72) | Có |
| `email` | email | Không |
| `username` | string (max 50) | Không |
| `phone` | string (max 20) | Không |
| `name` | string (max 255) | Không |
| `image` | string (max 255) | Không |
| `profile` | object | Không |

---

### Admin PUT `/api/auth/admin/users/:id`

Cập nhật user. Giống POST, tất cả optional (kể cả `password`).

---

### Admin DELETE `/api/auth/admin/users/:id`

Xóa user.

**Response `data`:**

```json
{ "success": true }
```

---

### Admin PATCH `/api/auth/admin/users/:id/password`

Admin đổi mật khẩu user.

```json
{ "password": "NewPass1234" }
```

| Field | Kiểu | Bắt buộc |
|-------|------|----------|
| `password` | string (6-72) | Có |

**Response `data`:**

```json
{ "success": true }
```

---

### Admin PATCH `/api/auth/admin/users/:id/status`

Đổi trạng thái user.

```json
{ "status": "active" }
```

| Field | Kiểu | Bắt buộc |
|-------|------|----------|
| `status` | `active` \| `inactive` \| `locked` | Có |

**Response `data`:**

```json
{ "success": true }
```

---

## Luồng tích hợp tiêu biểu

### Đăng ký

```
1. POST /api/auth/register/send-otp   ->  { email }
2. User nhận OTP qua email
3. POST /api/auth/register             ->  { name, email, password, confirmPassword, otp }
4. Lưu token, redirect trang chủ
```

### Đăng nhập

```
1. POST /api/auth/login                ->  { email, password }
2. Nhận { token, refreshToken, expiresIn } — KHÔNG có user
3. Lưu accessToken + refreshToken
4. GET /api/auth/me                    ->  Lấy thông tin user
5. Gửi header: Authorization: Bearer {accessToken}
```

### Refresh token

```
1. Khi nhận 401 Unauthorized
2. POST /api/auth/refresh              ->  { refreshToken }
3. Lưu token mới, retry request gốc
4. Nếu refresh cũng 401 -> redirect login
```

### Quên mật khẩu

```
1. POST /api/auth/forgot-password/send-otp  ->  { email }
2. User nhận OTP qua email
3. POST /api/auth/reset-password            ->  { email, otp, password, confirmPassword }
4. Redirect login
```

---

## 7. Enum (Danh sách giá trị)

### Public GET `/api/auth/users/enums/:key`

Lấy danh sách giá trị enum để hiển thị dropdown / label. **Không cần đăng nhập.**

| Key | Mô tả | Giá trị |
|-----|-------|---------|
| `genders` | Giới tính | `male`, `female`, `other` |
| `statuses` | Trạng thái user | `active`, `inactive`, `locked` |

**Ví dụ request:**

```
GET /api/auth/users/enums/genders
GET /api/auth/users/enums/statuses
```

**Response `data`:**

```json
[
  { "value": "male", "label": "Nam" },
  { "value": "female", "label": "Nữ" },
  { "value": "other", "label": "Khác" }
]
```

> Dùng để hiển thị label tiếng Việt trong dropdown thay vì hiển thị raw enum value.

---

## Tổng hợp endpoint

| Method | Path | Auth | Mô tả |
|--------|------|------|-------|
| POST | `/api/auth/login` | Public | Đăng nhập |
| POST | `/api/auth/register` | Public | Đăng ký |
| POST | `/api/auth/register/send-otp` | Public | Gửi OTP đăng ký |
| POST | `/api/auth/logout` | Public | Đăng xuất |
| POST | `/api/auth/logout-all` | User | Đăng xuất tất cả |
| POST | `/api/auth/refresh` | Public | Làm mới token |
| GET | `/api/auth/me` | User | Thông tin user |
| POST | `/api/auth/forgot-password/send-otp` | Public | Gửi OTP quên MK |
| POST | `/api/auth/reset-password` | Public | Đặt lại MK |
| GET | `/api/auth/google` | Public | OAuth Google |
| GET | `/api/auth/google/callback` | Public | Callback OAuth |
| GET | `/api/auth/user/profile` | User | Lấy profile |
| PATCH | `/api/auth/user/profile` | User | Cập nhật profile |
| PATCH | `/api/auth/user/profile/change-password` | User | Đổi mật khẩu |
| GET | `/api/auth/admin/users` | Admin | Danh sách user |
| GET | `/api/auth/admin/users/simple` | Admin | DS rút gọn |
| GET | `/api/auth/admin/users/:id` | Admin | Chi tiết user |
| POST | `/api/auth/admin/users` | Admin | Tạo user |
| PUT | `/api/auth/admin/users/:id` | Admin | Cập nhật user |
| DELETE | `/api/auth/admin/users/:id` | Admin | Xóa user |
| PATCH | `/api/auth/admin/users/:id/password` | Admin | Đổi MK user |
| PATCH | `/api/auth/admin/users/:id/status` | Admin | Đổi trạng thái |
| GET | `/api/auth/users/enums/genders` | Public | Enum giới tính |
| GET | `/api/auth/users/enums/statuses` | Public | Enum trạng thái user |

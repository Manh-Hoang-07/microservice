# Đánh giá & Convention cấu trúc Microservices

## Tổng quan cấu trúc hiện tại

| Service | Folder src/ |
|---------|-------------|
| auth-service | `config` `database` `guards` `internal` `jwks` `kafka` `modules` `security` |
| bff-service | `cache` `clients` `comics` `config` `homepage` `posts` `search` |
| comic-service | `common` `database` `kafka` `modules` |
| config-service | `common` `config` `database` `modules` |
| introduction-service | `common` `config` `database` `modules` |
| marketing-service | `database` `kafka` `modules` |
| notification-service | `config` `content-template` `database` `kafka-consumer` `mail` `notification` `queue` |
| post-service | `common` `database` `kafka` `modules` |
| storage-service | `config` `upload` |

---

## 1. Database — Đúng, không nên package hóa ✅

**Hiện trạng:** 7 services đều có `src/database/database.module.ts` + `src/database/prisma.service.ts` với nội dung gần như giống hệt nhau.

**Tại sao không thể shared:**
- Mỗi service có **Prisma schema riêng** (`prisma/schema.prisma`) sinh ra client riêng
- `PrismaService` phải extends đúng `PrismaClient` của từng service — không thể dùng chung instance
- Type safety sẽ mất nếu shared (không biết model nào thuộc service nào)

**Kết luận:** Code trông giống nhau nhưng có lý do chính đáng. Giữ nguyên.

---

## 2. Kafka — Đúng, giữ nguyên ✅

**Hiện trạng:** 4 services (auth, comic, marketing, post) có `src/kafka/`:
```
kafka/
├── kafka.module.ts
└── services/
    └── outbox-relay.service.ts   ← thin wrapper gọi OutboxRelayService từ @package/common
```

Logic nặng đã nằm trong `@package/common`, service chỉ giữ config (tên table, topic map). Đúng.

**Convention thống nhất:**
- Producer outbox → `src/kafka/`
- Consumer (subscribe topic) → `src/kafka-consumer/` (notification-service)

---

## 3. Enum — Convention mới ❌ → cần sửa

**Hiện trạng (không nhất quán):**

| Service | Vị trí enum hiện tại |
|---------|---------------------|
| comic-service | `src/common/enums.ts` — thùng rác |
| post-service | `src/common/enums.ts` — thùng rác |
| introduction-service | `src/common/enums.ts` — thùng rác |
| config-service | Inline trong DTO file |
| notification-service | Inline trong DTO file |

**Convention mới — áp dụng ngay:**

Enum thuộc domain nào thì sống trong folder `enums/` của domain đó. Không có `src/common/enums.ts`.
Nếu 2 service dùng cùng tên enum thì chấp nhận duplicate — đây là microservice, mỗi service độc lập.

```
modules/
└── comic/
    ├── enums/
    │   ├── comic-status.enum.ts     ← export enum ComicStatus
    │   └── chapter-status.enum.ts   ← export enum ChapterStatus
    ├── admin/
    ├── public/
    └── comic.module.ts
```

**Không cho phép:**
- `src/common/enums.ts` (file thùng rác)
- Enum inline trong DTO hoặc service file

---

## 4. Interface — Convention mới ❌ → cần sửa

**Hiện trạng:** Hầu hết interface định nghĩa inline trong chính file sử dụng.

**Convention mới — áp dụng ngay:**

Mọi interface đều phải có file `.interface.ts` riêng. Không inline bất kể interface lớn hay nhỏ. Lý do: dễ tìm, dễ import, dễ mock khi test.

```
modules/
└── menu/
    ├── interfaces/
    │   ├── menu-filter.interface.ts
    │   ├── menu-repository.interface.ts
    │   └── menu-tree-item.interface.ts
    ├── admin/
    ├── public/
    └── menu.module.ts
```

Interface dùng chung nhiều module trong 1 service → đặt trong `src/interfaces/`. - không nhé, cũng riêng theo microservice luôn

---

## 5. Cấu trúc module — Convention mới ❌ → cần sửa

**Hiện trạng:** Không nhất quán — flat ở service này, có subfolder ở service kia.

**Convention mới — áp dụng thống nhất:**

Mọi module đều dùng cấu trúc phân quyền. Không có controller/service ngang cấp với module file.

```
modules/
└── <domain>/
    ├── admin/                        ← route /admin/... (cần quyền admin)
    │   ├── controllers/
    │   │   └── <domain>.controller.ts
    │   ├── dtos/
    │   │   ├── create-<domain>.dto.ts
    │   │   └── update-<domain>.dto.ts
    │   └── services/
    │       └── <domain>.service.ts
    ├── public/                       ← route /... (public hoặc user đã login)
    │   ├── controllers/
    │   │   └── <domain>.controller.ts
    │   ├── dtos/
    │   │   └── <domain>-query.dto.ts
    │   └── services/
    │       └── <domain>.service.ts
    ├── enums/                        ← enum của domain này
    │   └── <domain>-status.enum.ts
    ├── interfaces/                   ← interface của domain này
    │   ├── <domain>-filter.interface.ts
    │   └── <domain>-repository.interface.ts
    ├── repositories/
    │   └── <domain>.repository.ts
    └── <domain>.module.ts
```

**Nếu domain không có phân biệt admin/public** (internal-only service) → vẫn tạo subfolder theo chức năng, không để flat:
```
└── <domain>/
    ├── controllers/
    ├── services/
    ├── dtos/
    ├── interfaces/
    └── <domain>.module.ts
```

---

## 6. Config & Validation — Không hợp lý, cần tách ❌

**Hiện trạng:** Joi validation schema được khai báo trực tiếp inline trong `ConfigModule.forRoot()` ở `app.module.ts`:

```typescript
// app.module.ts — hiện tại
ConfigModule.forRoot({
  validationSchema: Joi.object({
    PORT: Joi.number().port().default(3001),
    DATABASE_URL: Joi.string().required(),
    REDIS_URL: Joi.string().optional().allow(''),
    // ... 10-15 biến nữa
  }).unknown(true),
})
```

**Vấn đề:**
- `app.module.ts` phình to do chứa logic không phải của nó — module chỉ nên khai báo imports/providers
- Khi thêm biến env mới phải vào `app.module.ts` thay vì file config
- Không tìm nhanh được "service này validate những biến env nào"
- Không reuse được schema giữa các môi trường (test, e2e)

**Convention mới:**

Tách validation schema ra file `src/config/env.validation.ts`:

```typescript
// src/config/env.validation.ts
import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3001),
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().optional().allow(''),
  AUTH_JWKS_URL: Joi.string().optional().allow(''),
  KAFKA_BROKERS: Joi.string().optional().allow(''),
  EVENT_DRIVER: Joi.string().optional().allow(''),
}).unknown(true);
```

```typescript
// app.module.ts — sau khi tách
import { envValidationSchema } from './config/env.validation';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env', '.env.local'],
  load: [createAppConfig(3001), createKafkaConfig(), createRedisConfig()],
  validationSchema: envValidationSchema,
})
```

**Quy tắc cho `src/config/`:**

| File | Nội dung |
|------|----------|
| `env.validation.ts` | Joi schema validate env vars của service này |
| `<feature>.config.ts` | `registerAs()` factory cho config phức tạp (storage, mail, bff...) |

Config đơn giản (port, db url, redis url) dùng factory từ `@package/config`. Config phức tạp có nhiều field (storage với S3/cloudinary/local, mail, bff urls) mới cần file riêng.

---

## 7. `common/` local — Cần dọn ❌

**Hiện trạng:**

| Service | Nội dung `src/common/` |
|---------|----------------------|
| comic-service | `enums.ts` → sẽ xóa khi enum chuyển vào domain |
| post-service | `enums.ts` → sẽ xóa khi enum chuyển vào domain |
| introduction-service | `enums.ts` → sẽ xóa khi enum chuyển vào domain |
| config-service | `core/base.service.ts`, `core/pagination.helper.ts`, `core/prisma.repository.ts`, `core/primary-key.util.ts` |

**Vấn đề config-service:** `src/common/core/` có `BaseService<T>`, `PrismaRepository<T>`, `PaginationHelper` — cần kiểm tra xem `@package/common` đã export tương đương chưa. Nếu có → migrate và xóa.

**Rule:** Thư mục `src/common/` trong service chỉ được phép chứa thứ **không thuộc về bất kỳ module nào cụ thể** và **chưa có trong @package**. Không dùng làm thùng rác.

---

## 8. Guards — Giữ nguyên ✅

- `auth-service/src/guards/auth-jwt.guard.ts`: inject `JwksService` để verify public key động → khác bản chất với `JwtGuard` shared → hợp lý
- Các service khác dùng `JwtGuard` từ `@package/common` → đúng

---

## Tổng hợp — Convention đã chốt

| # | Hạng mục | Convention | Trạng thái |
|---|----------|-----------|-----------|
| 1 | **Enum** | File riêng trong `enums/` của domain, không `common/enums.ts`, chấp nhận duplicate giữa services | ❌ Cần sửa |
| 2 | **Interface** | Luôn file `.interface.ts` riêng, không inline | ❌ Cần sửa |
| 3 | **Cấu trúc module** | Bắt buộc `admin/` + `public/` (hoặc subfolder theo chức năng), không flat | ❌ Cần sửa |
| 4 | **Config validation** | Tách ra `src/config/env.validation.ts`, không inline trong `app.module.ts` | ❌ Cần sửa |
| 5 | **`src/common/` local** | Chỉ chứa thứ không thuộc module nào, không dùng làm thùng rác | ❌ Cần dọn |
| 6 | **Database module** | Riêng từng service (Prisma schema khác nhau) | ✅ Giữ nguyên |
| 7 | **Kafka producer** | `src/kafka/` + thin wrapper gọi `@package/common` | ✅ Giữ nguyên |
| 8 | **Kafka consumer** | `src/kafka-consumer/` (chỉ notification-service) | ✅ Giữ nguyên |
| 9 | **AuthJwtGuard** | Local ở auth-service vì cần inject JwksService | ✅ Giữ nguyên |

# Kế hoạch: Áp dụng Repository Pattern cho toàn bộ services

**Ngày lập:** 2026-04-29  
**Phạm vi:** comic-service, post-service, introduction-service, marketing-service, notification-service, auth-service, config-service  
**Bỏ qua:** bff-service (không có DB), storage-service (không có DB)

---

## 1. Convention

### Cấu trúc file

```
src/modules/<domain>/
├── repositories/
│   └── <domain>.repository.ts     ← file duy nhất, không có interface file riêng
├── admin/
├── public/
└── <domain>.module.ts
```

### Template repository

```typescript
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ComicRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.ComicWhereInput, options: { skip: number; take: number }) {
    return this.prisma.comic.findMany({ where, skip: options.skip, take: options.take });
  }

  findById(id: bigint) {
    return this.prisma.comic.findUnique({ where: { id } });
  }

  create(data: Prisma.ComicCreateInput) {
    return this.prisma.comic.create({ data });
  }

  update(id: bigint, data: Prisma.ComicUpdateInput) {
    return this.prisma.comic.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.comic.delete({ where: { id } });
  }
}
```

### Quy tắc

- **Plain class** — không có `IRepository<T>`, không generic, không interface riêng
- **Method signatures** — chỉ expose những gì service thực sự dùng, không tạo method thừa
- **Prisma types** — dùng `Prisma.XxxWhereInput`, `Prisma.XxxCreateInput`, v.v. làm type cho params
- **Đăng ký trong module** — thêm vào `providers` của module, `PrismaService` phải có sẵn (từ `DatabaseModule`)
- **Inject vào service** — thay dependency cũ bằng repository trong constructor

---

## 2. Thứ tự thực hiện

1. **introduction-service** — đơn giản nhất, 8 module CRUD thuần, không có outbox/stats
2. **marketing-service** — 3 module, có outbox pattern cần chú ý
3. **notification-service** — 3 module, có projection model lạ
4. **post-service** — 5 module, có stats + outbox
5. **comic-service** — phức tạp nhất, 11 module, có stats/daily-stats/outbox/junction tables
6. **auth-service** — đã có sẵn một số repo, kiểm tra và bổ sung
7. **config-service** — refactor: thay thế pattern phức tạp (IRepository + PrismaRepository + BaseService) bằng plain class

---

## 3. Chi tiết từng service

---

### 3.1 introduction-service

**PrismaService path:** `src/database/prisma.service.ts`

| Module | File cần tạo | Prisma model |
|--------|-------------|--------------|
| about | `src/modules/about/repositories/about-section.repository.ts` | `aboutSection` |
| certificate | `src/modules/certificate/repositories/certificate.repository.ts` | `certificate` |
| faq | `src/modules/faq/repositories/faq.repository.ts` | `faq` |
| gallery | `src/modules/gallery/repositories/gallery.repository.ts` | `gallery` |
| partner | `src/modules/partner/repositories/partner.repository.ts` | `partner` |
| project | `src/modules/project/repositories/project.repository.ts` | `project` |
| staff | `src/modules/staff/repositories/staff.repository.ts` | `staff` |
| testimonial | `src/modules/testimonial/repositories/testimonial.repository.ts` | `testimonial` |

**Thay đổi trong mỗi module file (`*.module.ts`):**
```typescript
import { AboutSectionRepository } from './repositories/about-section.repository';

providers: [AboutSectionRepository, AboutAdminService, AboutPublicService],
exports: [AboutSectionRepository],
```

**Thay đổi trong mỗi service file:**
```typescript
// Trước
constructor(private readonly prisma: PrismaService) {}
this.prisma.aboutSection.findMany(...)

// Sau
constructor(private readonly aboutRepo: AboutSectionRepository) {}
this.aboutRepo.findMany(...)
```

---

### 3.2 marketing-service

**PrismaService path:** `src/database/prisma.service.ts`

| Module | File cần tạo | Prisma models |
|--------|-------------|---------------|
| banner | `src/modules/banner/repositories/banner.repository.ts` | `banner` |
| banner-location | `src/modules/banner-location/repositories/banner-location.repository.ts` | `bannerLocation` |
| contact | `src/modules/contact/repositories/contact.repository.ts` | `contact`, `marketingOutbox` |

**Lưu ý outbox:** `marketingOutbox` chỉ dùng trong `contact` module để publish event. Đặt trong `ContactRepository` dùng transaction:

```typescript
// contact.repository.ts
async createWithOutbox(data: Prisma.ContactCreateInput, outboxData: Prisma.MarketingOutboxCreateInput) {
  return this.prisma.$transaction([
    this.prisma.contact.create({ data }),
    this.prisma.marketingOutbox.create({ data: outboxData }),
  ]);
}
```

---

### 3.3 notification-service

**Cấu trúc:** Không dùng `src/modules/`, các folder ngang cấp với nhau.  
**PrismaService path:** `src/database/prisma.service.ts`

| Folder | File cần tạo | Prisma model |
|--------|-------------|--------------|
| notification | `src/notification/repositories/notification.repository.ts` | `notification` |
| content-template | `src/content-template/repositories/content-template.repository.ts` | `contentTemplate` |
| kafka-consumer | `src/kafka-consumer/repositories/comic-followers-projection.repository.ts` | `comicFollowersProjection` |

**Lưu ý:** `comicFollowersProjection` là read model — chỉ cần `findMany`/`upsert`, được ghi từ Kafka event, không cần `create`/`delete` riêng.

---

### 3.4 post-service

**PrismaService path:** `src/database/prisma.service.ts`

| Module | File cần tạo | Prisma models |
|--------|-------------|---------------|
| post | `src/modules/post/repositories/post.repository.ts` | `post`, `postStats`, `postPostcategory`, `postPosttag` |
| post-category | `src/modules/post-category/repositories/post-category.repository.ts` | `postCategory` |
| post-comment | `src/modules/post-comment/repositories/post-comment.repository.ts` | `postComment`, `postOutbox` |
| post-stats | `src/modules/post-stats/repositories/post-stats.repository.ts` | `postStats`, `postDailyStats` |
| post-tag | `src/modules/post-tag/repositories/post-tag.repository.ts` | `postTag` |

**Lưu ý junction tables:** `postPostcategory` và `postPosttag` là many-to-many. Đưa vào `PostRepository` vì chỉ có nghĩa trong context của post:

```typescript
// post.repository.ts
async createWithRelations(data: Prisma.PostCreateInput, categoryIds: bigint[], tagIds: bigint[]) {
  return this.prisma.$transaction(async (tx) => {
    const post = await tx.post.create({ data });
    if (categoryIds.length) {
      await tx.postPostcategory.createMany({
        data: categoryIds.map((categoryId) => ({ postId: post.id, categoryId })),
      });
    }
    if (tagIds.length) {
      await tx.postPosttag.createMany({
        data: tagIds.map((tagId) => ({ postId: post.id, tagId })),
      });
    }
    return post;
  });
}
```

---

### 3.5 comic-service

**PrismaService path:** `src/database/prisma.service.ts`

| Module | File cần tạo | Prisma models |
|--------|-------------|---------------|
| bookmark | `src/modules/bookmark/repositories/bookmark.repository.ts` | `bookmark` |
| chapter | `src/modules/chapter/repositories/chapter.repository.ts` | `chapter`, `chapterPage` |
| comic | `src/modules/comic/repositories/comic.repository.ts` | `comic`, `comicStats`, `comicCategoryOnComic` |
| comic-category | `src/modules/comic-category/repositories/comic-category.repository.ts` | `comicCategory` |
| comment | `src/modules/comment/repositories/comic-comment.repository.ts` | `comicComment`, `comicOutbox` |
| follow | `src/modules/follow/repositories/comic-follow.repository.ts` | `comicFollow`, `comicStats`, `comicOutbox` |
| homepage | `src/modules/homepage/repositories/homepage.repository.ts` | `comicCategory`, `comic` |
| reading-history | `src/modules/reading-history/repositories/reading-history.repository.ts` | `readingHistory` |
| review | `src/modules/review/repositories/comic-review.repository.ts` | `comicReview`, `comicStats` |
| stats | `src/modules/stats/repositories/comic-stats.repository.ts` | `comic`, `comicStats` |
| view-tracking | `src/modules/view-tracking/repositories/view-tracking.repository.ts` | `comicStats`, `comicDailyStats` |

**Lưu ý:**
- `comicStats` bị dùng ở nhiều module — mỗi module tự thao tác qua repository của mình, không tạo shared `ComicStatsRepository`
- `comicOutbox` dùng trong `comment` và `follow` — đặt inline trong transaction của từng repository tương ứng

---

### 3.6 auth-service

**Trạng thái:** Đã có `repositories/` folder trong: `context`, `group`, `permission`, `rbac`, `user`.

| Module | Trạng thái | Hành động |
|--------|-----------|-----------|
| auth | Chưa có repo | Tạo `src/modules/auth/repositories/auth.repository.ts` — model `user` (query cho login, register, find by email) |
| context | Đã có | Kiểm tra đủ method chưa, bổ sung nếu thiếu |
| group | Đã có | Kiểm tra, bổ sung nếu thiếu |
| permission | Đã có | Kiểm tra, bổ sung nếu thiếu |
| rbac | Đã có | Kiểm tra — dùng nhiều model (`userRoleAssignment`, `roleHasPermission`, `roleContext`) — có thể cần tách thêm repo |
| user | Đã có | Kiểm tra, bổ sung nếu thiếu |

---

### 3.7 config-service — Refactor

**Trạng thái hiện tại:** Đã có repos nhưng theo pattern phức tạp:
- `src/common/core/prisma.repository.ts` — abstract generic base class `PrismaRepository<Model, Where, Create, Update, Order>`
- `src/common/core/base.service.ts` — abstract generic `BaseService<T, R extends IRepository<T>>` với 10+ hooks
- `src/common/interfaces/repository.interface.ts` — `IRepository<T>` interface
- Mỗi module có **2 file**: `*.repository.ts` (interface) + `*.repository.impl.ts` (implementation)

**Mục tiêu:** Xóa toàn bộ layer abstraction, gộp về plain class.

#### Modules cần refactor

| Module | File interface (xoá) | File impl (đổi tên + đơn giản hóa) | Prisma model | Service hiện tại |
|--------|---------------------|-------------------------------------|--------------|-----------------|
| location/country | `repositories/country.repository.ts` | `repositories/country.repository.impl.ts` → `repositories/country.repository.ts` | `Country` | extends BaseService |
| location/province | `repositories/province.repository.ts` | `repositories/province.repository.impl.ts` → `repositories/province.repository.ts` | `Province` | extends BaseService |
| location/ward | `repositories/ward.repository.ts` | `repositories/ward.repository.impl.ts` → `repositories/ward.repository.ts` | `Ward` | extends BaseService |
| menu | `repositories/menu.repository.ts` | `repositories/menu.repository.impl.ts` → `repositories/menu.repository.ts` | `Menu` | extends BaseService |
| system-config/email | `repositories/email-config.repository.ts` | `repositories/email-config.repository.impl.ts` → `repositories/email-config.repository.ts` | `EmailConfig` | plain service |
| system-config/general | `repositories/general-config.repository.ts` | `repositories/general-config.repository.impl.ts` → `repositories/general-config.repository.ts` | `GeneralConfig` | plain service |

#### Thứ tự thực hiện cho config-service

**Bước 1:** Tạo 6 plain repository files mới (thay thế cả interface + impl)

```typescript
// country.repository.ts — thay thế country.repository.ts (interface) + country.repository.impl.ts
@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.CountryWhereInput, options: { skip: number; take: number; orderBy?: Prisma.CountryOrderByWithRelationInput }) {
    return this.prisma.country.findMany({ where, ...options });
  }

  count(where: Prisma.CountryWhereInput) {
    return this.prisma.country.count({ where });
  }

  findById(id: number) {
    return this.prisma.country.findUnique({ where: { id } });
  }

  create(data: Prisma.CountryCreateInput) {
    return this.prisma.country.create({ data });
  }

  update(id: number, data: Prisma.CountryUpdateInput) {
    return this.prisma.country.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.country.delete({ where: { id } });
  }
}
```

**Bước 2:** Viết lại các service đang `extends BaseService` — bỏ inheritance, viết thẳng các method

```typescript
// Trước: country.service.ts
export class CountryAdminService extends BaseService<Country, ICountryRepository> {
  constructor(@Inject(COUNTRY_REPOSITORY) repo: ICountryRepository) {
    super(repo);
  }
  // dùng this.getList(), this.getOne(), this.create(), v.v. từ BaseService
}

// Sau: country.service.ts
export class CountryAdminService {
  constructor(private readonly countryRepo: CountryRepository) {}

  async getList(query: ListCountryDto): Promise<IPaginatedResult<Country>> {
    const { page, limit, ...filters } = query;
    const skip = (page - 1) * limit;
    const where = this.buildWhere(filters);
    const [data, total] = await Promise.all([
      this.countryRepo.findMany(where, { skip, take: limit }),
      this.countryRepo.count(where),
    ]);
    return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  private buildWhere(filters: Partial<ListCountryDto>): Prisma.CountryWhereInput {
    // logic filter cụ thể của Country
  }
  // ...
}
```

**Bước 3:** Xoá các file không còn dùng

```
src/common/core/prisma.repository.ts        ← xoá
src/common/core/base.service.ts             ← xoá
src/common/interfaces/repository.interface.ts   ← xoá (hoặc giữ nếu còn import ở nơi khác)
src/common/interfaces/prisma-delegate.interface.ts  ← xoá
```

**Bước 4:** Cập nhật module files — thay `useClass: CountryRepositoryImpl` bằng `CountryRepository` trực tiếp, bỏ `COUNTRY_REPOSITORY` token nếu không còn dùng

**Lưu ý pagination:** `src/common/core/pagination.helper.ts` có `createPaginationMeta()` và `prepareQuery()` — **giữ lại file này** nếu các service mới vẫn cần. Chỉ xoá `PrismaRepository` và `BaseService`.

---

## 4. Checklist thực hiện

### introduction-service
- [ ] Tạo 8 repository files
- [ ] Cập nhật 8 module files (thêm vào providers/exports)
- [ ] Cập nhật ~16 service files (thay PrismaService bằng Repository)

### marketing-service
- [ ] Tạo 3 repository files
- [ ] Cập nhật 3 module files
- [ ] Cập nhật ~5 service files

### notification-service
- [ ] Tạo 3 repository files
- [ ] Cập nhật 3 module files
- [ ] Cập nhật ~4 service files

### post-service
- [ ] Tạo 5 repository files
- [ ] Cập nhật 5 module files
- [ ] Cập nhật ~10 service files

### comic-service
- [ ] Tạo 11 repository files
- [ ] Cập nhật 11 module files
- [ ] Cập nhật ~18 service files

### auth-service
- [ ] Kiểm tra 5 repo hiện có
- [ ] Tạo repo cho auth module
- [ ] Bổ sung method còn thiếu

### config-service
- [ ] Tạo 6 plain repository files mới
- [ ] Viết lại 4 service files đang extends BaseService (country, province, ward, menu)
- [ ] Cập nhật 2 service files plain (email-config, general-config) — chỉ đổi injection
- [ ] Cập nhật 6 module files (bỏ token, đổi useClass)
- [ ] Xoá `src/common/core/prisma.repository.ts`
- [ ] Xoá `src/common/core/base.service.ts`
- [ ] Xoá `src/common/interfaces/repository.interface.ts`
- [ ] Xoá `src/common/interfaces/prisma-delegate.interface.ts`
- [ ] Xoá 6 interface files (`*.repository.ts` cũ) và 6 impl files (`*.repository.impl.ts`)

---

## 5. Tổng kết số lượng

| Service | Repos tạo mới | Repos refactor | Service files cập nhật |
|---------|--------------|----------------|----------------------|
| introduction-service | 8 | 0 | ~16 |
| marketing-service | 3 | 0 | ~5 |
| notification-service | 3 | 0 | ~4 |
| post-service | 5 | 0 | ~10 |
| comic-service | 11 | 0 | ~18 |
| auth-service | 1 | 5 (review) | ~7 |
| config-service | 6 (gộp từ 12) | 6+6 (xoá 12 cũ) | ~6 + xoá 4 base classes |
| **Tổng** | **~37 files mới** | **~12 refactor** | **~66 files cập nhật** |

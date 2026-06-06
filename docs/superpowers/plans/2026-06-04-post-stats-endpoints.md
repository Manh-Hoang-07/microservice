# Post Statistics Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng 2 admin endpoint thống kê bài viết: tổng quan dashboard và biểu đồ lượt xem theo ngày cho từng bài.

**Architecture:** Mở rộng `StatsModule` với lớp admin gồm controller + service + DTO. Thêm 3 query method vào `StatsRepository` (aggregate views, daily breakdown, post stats). Không thay đổi module khác.

**Tech Stack:** NestJS, Prisma (groupBy, aggregate, findMany), class-validator, Jest (unit test với mock)

---

## File Map

| Hành động | File |
|-----------|------|
| Modify | `apps/post-service/src/modules/stats/repositories/stats.repository.ts` |
| Create | `apps/post-service/src/modules/stats/admin/dtos/stats-query.dto.ts` |
| Create | `apps/post-service/src/modules/stats/admin/services/stats.service.ts` |
| Create | `apps/post-service/src/modules/stats/admin/controllers/stats.controller.ts` |
| Modify | `apps/post-service/src/modules/stats/stats.module.ts` |
| Create | `apps/post-service/tests/modules/stats/admin/services/stats.service.spec.ts` |
| Modify | `docs/api-post-statistics.md` |

---

## Task 1: Thêm query methods vào StatsRepository

**Files:**
- Modify: `apps/post-service/src/modules/stats/repositories/stats.repository.ts`

- [ ] **Step 1: Mở file và thêm 3 method mới vào cuối class**

Nội dung đầy đủ của file sau khi sửa:

```typescript
import { Injectable } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class StatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStats(postId: PrimaryKey, count: number) {
    return this.prisma.stats.upsert({
      where: { postId: postId },
      create: { postId: postId, viewCount: BigInt(count) },
      update: { viewCount: { increment: BigInt(count) } },
    });
  }

  upsertDailyStats(postId: PrimaryKey, date: Date, count: number) {
    return this.prisma.dailyStats.upsert({
      where: { postId_statDate: { postId: postId, statDate: date } },
      create: { postId: postId, statDate: date, viewCount: BigInt(count) },
      update: { viewCount: { increment: BigInt(count) } },
    });
  }

  async getOverview() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last7 = new Date(today);
    last7.setDate(today.getDate() - 6);
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);

    const [postGroups, totalAgg, todayAgg, last7Agg, last30Agg] = await Promise.all([
      this.prisma.post.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.stats.aggregate({ _sum: { viewCount: true } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: today } } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: last7 } } }),
      this.prisma.dailyStats.aggregate({ _sum: { viewCount: true }, where: { statDate: { gte: last30 } } }),
    ]);

    const postCounts: Record<string, number> = { total: 0 };
    for (const g of postGroups) {
      postCounts[g.status] = g._count._all;
      postCounts['total'] += g._count._all;
    }

    return {
      postCounts,
      totalViews: totalAgg._sum.viewCount ?? BigInt(0),
      viewsToday: todayAgg._sum.viewCount ?? BigInt(0),
      viewsLast7Days: last7Agg._sum.viewCount ?? BigInt(0),
      viewsLast30Days: last30Agg._sum.viewCount ?? BigInt(0),
    };
  }

  getPostStats(postId: PrimaryKey) {
    return this.prisma.stats.findUnique({ where: { postId } });
  }

  getDailyStatsForPost(postId: PrimaryKey, startDate: Date, endDate: Date) {
    return this.prisma.dailyStats.findMany({
      where: { postId, statDate: { gte: startDate, lte: endDate } },
      orderBy: { statDate: 'asc' },
      select: { statDate: true, viewCount: true },
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/post-service/src/modules/stats/repositories/stats.repository.ts
git commit -m "feat(post-stats): add overview and daily query methods to StatsRepository"
```

---

## Task 2: Tạo DTO

**Files:**
- Create: `apps/post-service/src/modules/stats/admin/dtos/stats-query.dto.ts`

- [ ] **Step 1: Tạo file DTO**

```typescript
import { IsDateString, IsOptional } from 'class-validator';

export class DailyStatsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/post-service/src/modules/stats/admin/dtos/stats-query.dto.ts
git commit -m "feat(post-stats): add DailyStatsQueryDto"
```

---

## Task 3: Tạo StatsAdminService

**Files:**
- Create: `apps/post-service/src/modules/stats/admin/services/stats.service.ts`

- [ ] **Step 1: Tạo file service**

```typescript
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { StatsRepository } from '../../repositories/stats.repository';
import { PrismaService } from '../../../../core/database/prisma.service';
import { DailyStatsQueryDto } from '../dtos/stats-query.dto';
import { toPrimaryKey } from 'src/types';

const MAX_DAYS = 90;
const DEFAULT_DAYS = 29;

@Injectable()
export class StatsAdminService {
  constructor(
    private readonly statsRepo: StatsRepository,
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async getOverview() {
    const data = await this.statsRepo.getOverview();
    return {
      posts: data.postCounts,
      views: {
        total: data.totalViews,
        today: data.viewsToday,
        last7Days: data.viewsLast7Days,
        last30Days: data.viewsLast30Days,
      },
    };
  }

  async getPostDailyStats(id: string, query: DailyStatsQueryDto) {
    let postId: bigint;
    try {
      postId = toPrimaryKey(id);
    } catch {
      throw new BadRequestException('Invalid post ID');
    }

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, name: true, slug: true },
    });
    if (!post) throw new NotFoundException(t(this.i18n, 'post.POST_NOT_FOUND'));

    const end = query.endDate ? new Date(query.endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    let start: Date;
    if (query.startDate) {
      start = new Date(query.startDate);
      start.setHours(0, 0, 0, 0);
    } else {
      start = new Date(end);
      start.setDate(start.getDate() - DEFAULT_DAYS);
      start.setHours(0, 0, 0, 0);
    }

    // Cap tối đa 90 ngày để tránh query quá lớn
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    if (diffDays > MAX_DAYS) {
      start = new Date(end);
      start.setDate(start.getDate() - MAX_DAYS);
      start.setHours(0, 0, 0, 0);
    }

    const [stats, daily] = await Promise.all([
      this.statsRepo.getPostStats(postId),
      this.statsRepo.getDailyStatsForPost(postId, start, end),
    ]);

    return {
      postId: post.id,
      name: post.name,
      slug: post.slug,
      totalViews: stats?.viewCount ?? BigInt(0),
      daily: daily.map((d) => ({
        date: d.statDate.toISOString().slice(0, 10),
        viewCount: d.viewCount,
      })),
    };
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/post-service/src/modules/stats/admin/services/stats.service.ts
git commit -m "feat(post-stats): add StatsAdminService with overview and daily stats"
```

---

## Task 4: Tạo StatsAdminController

**Files:**
- Create: `apps/post-service/src/modules/stats/admin/controllers/stats.controller.ts`

- [ ] **Step 1: Tạo file controller**

```typescript
import { Controller, Get, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { StatsAdminService } from '../services/stats.service';
import { DailyStatsQueryDto } from '../dtos/stats-query.dto';

@Controller('admin/stats')
export class StatsAdminController {
  constructor(private readonly statsService: StatsAdminService) {}

  @Permission('post.manage')
  @Get('overview')
  getOverview() {
    return this.statsService.getOverview();
  }

  @Permission('post.manage')
  @Get('posts/:id/daily')
  getPostDailyStats(@Param('id') id: string, @Query() query: DailyStatsQueryDto) {
    return this.statsService.getPostDailyStats(id, query);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/post-service/src/modules/stats/admin/controllers/stats.controller.ts
git commit -m "feat(post-stats): add StatsAdminController"
```

---

## Task 5: Cập nhật StatsModule

**Files:**
- Modify: `apps/post-service/src/modules/stats/stats.module.ts`

- [ ] **Step 1: Cập nhật module để register controller và service mới**

```typescript
import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { StatsRepository } from './repositories/stats.repository';
import { StatsAdminController } from './admin/controllers/stats.controller';
import { StatsAdminService } from './admin/services/stats.service';

@Module({
  controllers: [StatsAdminController],
  providers: [StatsRepository, ViewCronService, StatsAdminService],
})
export class StatsModule {}
```

- [ ] **Step 2: Build kiểm tra compile**

```bash
pnpm build:shared && pnpm --filter post-service build
```

Expected: build thành công, không có lỗi TypeScript.

- [ ] **Step 3: Commit**

```bash
git add apps/post-service/src/modules/stats/stats.module.ts
git commit -m "feat(post-stats): register StatsAdminController and StatsAdminService in StatsModule"
```

---

## Task 6: Viết unit test cho StatsAdminService

**Files:**
- Create: `apps/post-service/tests/modules/stats/admin/services/stats.service.spec.ts`

- [ ] **Step 1: Tạo file test**

```typescript
// ---------------------------------------------------------------------------
// Module mocks — đặt trước tất cả import
// ---------------------------------------------------------------------------
jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('@package/common', () => ({
  t: (_i18n: any, key: string) => key,
}));

jest.mock('nestjs-i18n', () => ({
  I18nService: jest.fn(),
}));

jest.mock('src/generated/prisma', () => ({
  PrismaClient: class {},
  Prisma: {},
}), { virtual: true });

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}), { virtual: true });

jest.mock('src/types', () => ({
  toPrimaryKey: (v: string) => BigInt(v),
}), { virtual: true });

jest.mock('../../../../../src/modules/stats/repositories/stats.repository', () => ({
  StatsRepository: jest.fn(),
}));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StatsAdminService } from '../../../../../src/modules/stats/admin/services/stats.service';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeMockStatsRepo() {
  return {
    getOverview: jest.fn().mockResolvedValue({
      postCounts: { total: 10, published: 6, draft: 4 },
      totalViews: BigInt(1000),
      viewsToday: BigInt(50),
      viewsLast7Days: BigInt(300),
      viewsLast30Days: BigInt(800),
    }),
    getPostStats: jest.fn().mockResolvedValue({ viewCount: BigInt(500) }),
    getDailyStatsForPost: jest.fn().mockResolvedValue([
      { statDate: new Date('2025-06-01'), viewCount: BigInt(50) },
      { statDate: new Date('2025-06-02'), viewCount: BigInt(80) },
    ]),
  };
}

function makeMockPrisma(postOverride?: any) {
  return {
    post: {
      findUnique: jest.fn().mockResolvedValue(
        postOverride !== undefined
          ? postOverride
          : { id: BigInt(1), name: 'Test Post', slug: 'test-post' },
      ),
    },
  };
}

function makeService(statsRepo?: any, prisma?: any) {
  return new StatsAdminService(
    statsRepo ?? makeMockStatsRepo(),
    prisma ?? makeMockPrisma(),
    { translate: jest.fn() } as any,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('StatsAdminService', () => {
  describe('getOverview', () => {
    it('trả về cấu trúc posts và views', async () => {
      const service = makeService();
      const result = await service.getOverview();

      expect(result.posts).toEqual({ total: 10, published: 6, draft: 4 });
      expect(result.views.total).toBe(BigInt(1000));
      expect(result.views.today).toBe(BigInt(50));
      expect(result.views.last7Days).toBe(BigInt(300));
      expect(result.views.last30Days).toBe(BigInt(800));
    });
  });

  describe('getPostDailyStats', () => {
    it('ném BadRequestException khi id không hợp lệ', async () => {
      const service = makeService();
      await expect(service.getPostDailyStats('not-a-number', {})).rejects.toThrow(BadRequestException);
    });

    it('ném NotFoundException khi bài viết không tồn tại', async () => {
      const service = makeService(undefined, makeMockPrisma(null));
      await expect(service.getPostDailyStats('1', {})).rejects.toThrow(NotFoundException);
    });

    it('trả về thông tin bài viết và daily array', async () => {
      const service = makeService();
      const result = await service.getPostDailyStats('1', {
        startDate: '2025-06-01',
        endDate: '2025-06-02',
      });

      expect(result.postId).toBe(BigInt(1));
      expect(result.name).toBe('Test Post');
      expect(result.slug).toBe('test-post');
      expect(result.totalViews).toBe(BigInt(500));
      expect(result.daily).toHaveLength(2);
      expect(result.daily[0]).toEqual({ date: '2025-06-01', viewCount: BigInt(50) });
      expect(result.daily[1]).toEqual({ date: '2025-06-02', viewCount: BigInt(80) });
    });

    it('dùng giá trị mặc định 30 ngày khi không truyền startDate/endDate', async () => {
      const statsRepo = makeMockStatsRepo();
      const service = makeService(statsRepo);
      await service.getPostDailyStats('1', {});

      const [, [postId, start, end]] = statsRepo.getDailyStatsForPost.mock.calls[0]
        ? [null, statsRepo.getDailyStatsForPost.mock.calls[0]]
        : [null, [null, null, null]];

      expect(postId).toBe(BigInt(1));
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
      expect(diffDays).toBeLessThanOrEqual(30);
    });

    it('trả về totalViews = 0 khi post chưa có stats row', async () => {
      const statsRepo = makeMockStatsRepo();
      statsRepo.getPostStats.mockResolvedValue(null);
      const service = makeService(statsRepo);
      const result = await service.getPostDailyStats('1', {});
      expect(result.totalViews).toBe(BigInt(0));
    });
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận PASS**

```bash
pnpm --filter post-service test --testPathPattern="stats/admin/services"
```

Expected output:
```
PASS tests/modules/stats/admin/services/stats.service.spec.ts
  StatsAdminService
    getOverview
      ✓ trả về cấu trúc posts và views
    getPostDailyStats
      ✓ ném BadRequestException khi id không hợp lệ
      ✓ ném NotFoundException khi bài viết không tồn tại
      ✓ trả về thông tin bài viết và daily array
      ✓ dùng giá trị mặc định 30 ngày khi không truyền startDate/endDate
      ✓ trả về totalViews = 0 khi post chưa có stats row
```

- [ ] **Step 3: Commit**

```bash
git add apps/post-service/tests/modules/stats/admin/services/stats.service.spec.ts
git commit -m "test(post-stats): add unit tests for StatsAdminService"
```

---

## Task 7: Cập nhật tài liệu API

**Files:**
- Modify: `docs/api-post-statistics.md`

- [ ] **Step 1: Thêm section thống kê vào đầu file, trước phần "1. Danh sách bài viết"**

Thay nội dung file bằng toàn bộ nội dung dưới đây (giữ nguyên phần cũ, chèn thêm phần mới):

Sau dòng `---` đầu tiên (sau phần "Cơ chế đếm lượt xem"), thêm 2 section mới:

---

### Section mới cần chèn vào file `docs/api-post-statistics.md`

Chèn vào **trước** dòng `## 1. Danh sách bài viết (Public)`:

```markdown
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
      "total": "1234567",       // string (BigInt) — tổng lượt xem mọi thời gian
      "today": "3421",          // string (BigInt) — lượt xem hôm nay
      "last7Days": "25000",     // string (BigInt) — 7 ngày gần nhất (kể cả hôm nay)
      "last30Days": "98000"     // string (BigInt) — 30 ngày gần nhất
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
    "totalViews": "15421",        // string (BigInt) — tổng tích lũy mọi thời gian
    "daily": [
      { "date": "2025-05-06", "viewCount": "120" },
      { "date": "2025-05-07", "viewCount": "89" },
      { "date": "2025-05-08", "viewCount": "204" }
    ]
  },
  "timestamp": "2025-06-04T08:00:00.000Z"
}
```

> **Lưu ý:** Ngày không có lượt xem nào sẽ không xuất hiện trong mảng `daily` (sparse array, không fill 0). FE cần tự fill 0 khi vẽ chart.

### Ví dụ — Lấy 30 ngày gần nhất

```
GET /api/admin/stats/posts/7432819023456/daily
```

### Ví dụ — Lấy tháng 5/2025

```
GET /api/admin/stats/posts/7432819023456/daily?startDate=2025-05-01&endDate=2025-05-31
```

---
```

- [ ] **Step 2: Commit**

```bash
git add docs/api-post-statistics.md
git commit -m "docs: add admin stats endpoints to api-post-statistics.md"
```

---

## Tóm tắt Endpoints mới

| Method | Route | Auth | Mô tả |
|--------|-------|------|-------|
| GET | `/api/admin/stats/overview` | `post.manage` | Tổng quan: số bài theo status + tổng/hôm nay/7ngày/30ngày lượt xem |
| GET | `/api/admin/stats/posts/:id/daily` | `post.manage` | Lượt xem theo ngày cho 1 bài (max 90 ngày, mặc định 30 ngày) |

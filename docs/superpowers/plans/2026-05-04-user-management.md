# User Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add admin user CRUD (list, detail, create, update, delete, change password, change status) and user self-service profile (view, update, change password) to auth-service, mirroring the monolith at `D:\comic\src\modules\system\user`.

**Architecture:** New `UserModule` in auth-service with admin/ and user/ sub-modules. Separate `UserAdminRepository` for admin/profile queries (paginated list, search, filters). Reuses existing PrismaService + Prisma schema (User + Profile models already exist). Follows the same controller/service/DTO patterns as comic-service admin CRUD.

**Tech Stack:** NestJS 11, Prisma 7.8, class-validator, bcryptjs, @package/common (BaseListQueryDto, parseQueryOptions, createPaginationMeta, Permission decorator, JwtGuard, RbacGuard)

**Reference:** Monolith source at `D:\comic\src\modules\system\user` (admin + user controllers, services, DTOs)

---

## File Structure

```
apps/auth-service/src/modules/user/
├── repositories/
│   └── user-admin.repository.ts    — Paginated queries, search, profile include
├── admin/
│   ├── controllers/
│   │   └── user.controller.ts      — 8 endpoints (CRUD + password + status)
│   ├── services/
│   │   └── user.service.ts         — Business logic, password hashing, profile sync
│   └── dtos/
│       ├── user-query.dto.ts       — List filters (search, status, email, phone)
│       ├── create-user.dto.ts      — Create with nested profile
│       ├── update-user.dto.ts      — Update with nested profile
│       ├── admin-change-password.dto.ts — Admin sets new password
│       └── change-status.dto.ts    — Ban/activate user
├── user/
│   ├── controllers/
│   │   └── profile.controller.ts   — 3 endpoints (get, update, change-password)
│   ├── services/
│   │   └── profile.service.ts      — Self-service profile logic
│   └── dtos/
│       ├── update-profile.dto.ts   — Name, avatar, bio, location
│       └── change-password.dto.ts  — Old password + new password
└── user.module.ts                  — Module registration
```

**Existing files to modify:**
- `apps/auth-service/src/app.module.ts` — Import UserModule

---

## Task 1: UserAdminRepository

**Files:**
- Create: `apps/auth-service/src/modules/user/repositories/user-admin.repository.ts`

- [ ] **Step 1: Create the repository**

```typescript
// apps/auth-service/src/modules/user/repositories/user-admin.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Prisma } from '../../../generated/prisma';
import {
  parseQueryOptions,
  createPaginationMeta,
} from '@package/common';

export interface UserFilter {
  search?: string;
  email?: string;
  phone?: string;
  status?: string;
}

type Tx = Prisma.TransactionClient | PrismaService;

const LIST_SELECT = {
  id: true,
  username: true,
  email: true,
  phone: true,
  name: true,
  image: true,
  status: true,
  created_at: true,
  last_login_at: true,
} satisfies Prisma.UserSelect;

const DETAIL_SELECT = {
  id: true,
  username: true,
  email: true,
  phone: true,
  name: true,
  image: true,
  status: true,
  email_verified_at: true,
  phone_verified_at: true,
  last_login_at: true,
  created_user_id: true,
  updated_user_id: true,
  created_at: true,
  updated_at: true,
  profile: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class UserAdminRepository {
  private readonly logger = new Logger(UserAdminRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  get client(): PrismaService {
    return this.prisma;
  }

  async findAll(query: any) {
    const opts = parseQueryOptions(query);
    const where = this.buildWhere(query);

    const skipCount = query.skipCount === 'true';

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: LIST_SELECT,
        skip: opts.skip,
        take: opts.take,
        orderBy: this.buildOrderBy(query.sort),
      }),
      skipCount ? Promise.resolve(0) : this.prisma.user.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(opts, total) };
  }

  async findAllSimple(query: any) {
    const limit = Math.min(Number(query.limit) || 50, 200);
    const where = this.buildWhere(query);

    const data = await this.prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, image: true, status: true },
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    return { data };
  }

  async findById(id: bigint) {
    return this.prisma.user.findUnique({
      where: { id },
      select: DETAIL_SELECT,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async create(data: Prisma.UserCreateInput, tx: Tx = this.prisma) {
    return tx.user.create({ data, select: DETAIL_SELECT });
  }

  async update(id: bigint, data: Prisma.UserUpdateInput, tx: Tx = this.prisma) {
    return tx.user.update({ where: { id }, data, select: DETAIL_SELECT });
  }

  async delete(id: bigint) {
    await this.prisma.user.delete({ where: { id } });
  }

  async upsertProfile(
    userId: bigint,
    data: Prisma.ProfileCreateWithoutUserInput,
    tx: Tx = this.prisma,
  ) {
    return tx.profile.upsert({
      where: { user_id: userId },
      create: { user_id: userId, ...data },
      update: data,
    });
  }

  async checkUnique(
    fields: { email?: string; username?: string; phone?: string },
    excludeId?: bigint,
  ) {
    const conditions: Prisma.UserWhereInput[] = [];
    if (fields.email) conditions.push({ email: fields.email });
    if (fields.username) conditions.push({ username: fields.username });
    if (fields.phone) conditions.push({ phone: fields.phone });
    if (!conditions.length) return null;

    return this.prisma.user.findFirst({
      where: {
        OR: conditions,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true, email: true, username: true, phone: true },
    });
  }

  private buildWhere(query: any): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (query.search) {
      where.OR = [
        { email: { startsWith: query.search, mode: 'insensitive' } },
        { username: { startsWith: query.search, mode: 'insensitive' } },
        { name: { startsWith: query.search, mode: 'insensitive' } },
        { phone: { startsWith: query.search } },
      ];
    }

    if (query.email) where.email = query.email;
    if (query.phone) where.phone = query.phone;
    if (query.status) where.status = query.status;

    return where;
  }

  private buildOrderBy(sort?: string): Prisma.UserOrderByWithRelationInput {
    if (!sort) return { created_at: 'desc' };
    const [field, dir] = sort.split(':');
    const allowed = ['created_at', 'name', 'email', 'status', 'last_login_at'];
    if (!allowed.includes(field)) return { created_at: 'desc' };
    return { [field]: dir === 'asc' ? 'asc' : 'desc' };
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /d/microservice && npx tsc --noEmit -p apps/auth-service/tsconfig.json 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add apps/auth-service/src/modules/user/repositories/user-admin.repository.ts
git commit -m "feat(auth): add UserAdminRepository for user management queries"
```

---

## Task 2: Admin DTOs

**Files:**
- Create: `apps/auth-service/src/modules/user/admin/dtos/user-query.dto.ts`
- Create: `apps/auth-service/src/modules/user/admin/dtos/create-user.dto.ts`
- Create: `apps/auth-service/src/modules/user/admin/dtos/update-user.dto.ts`
- Create: `apps/auth-service/src/modules/user/admin/dtos/admin-change-password.dto.ts`
- Create: `apps/auth-service/src/modules/user/admin/dtos/change-status.dto.ts`

- [ ] **Step 1: Create UserQueryDto**

```typescript
// apps/auth-service/src/modules/user/admin/dtos/user-query.dto.ts
import { IsOptional, IsString, Matches } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class UserQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(active|inactive|locked)$/, { message: 'status must be active, inactive or locked' })
  status?: string;
}
```

- [ ] **Step 2: Create ProfileDataDto (shared nested DTO)**

```typescript
// apps/auth-service/src/modules/user/admin/dtos/create-user.dto.ts
import {
  IsOptional, IsNotEmpty, IsString, IsEmail, MinLength, MaxLength,
  Matches, ValidateNested, Transform,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProfileDataDto {
  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  country_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  province_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  ward_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  about?: string;
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username may only contain letters, digits and underscore.' })
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email.' })
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^\+?[0-9]{6,20}$/, { message: 'Invalid phone number.' })
  @MaxLength(20)
  phone?: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDataDto)
  profile?: ProfileDataDto;
}
```

- [ ] **Step 3: Create UpdateUserDto**

```typescript
// apps/auth-service/src/modules/user/admin/dtos/update-user.dto.ts
import {
  IsOptional, IsString, IsEmail, MinLength, MaxLength,
  Matches, ValidateNested, Transform,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProfileDataDto {
  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  country_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  province_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  ward_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  about?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username may only contain letters, digits and underscore.' })
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail({}, { message: 'Invalid email.' })
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^\+?[0-9]{6,20}$/, { message: 'Invalid phone number.' })
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(72)
  password?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDataDto)
  profile?: ProfileDataDto;
}
```

- [ ] **Step 4: Create AdminChangePasswordDto and ChangeStatusDto**

```typescript
// apps/auth-service/src/modules/user/admin/dtos/admin-change-password.dto.ts
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AdminChangePasswordDto {
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(72)
  password: string;
}
```

```typescript
// apps/auth-service/src/modules/user/admin/dtos/change-status.dto.ts
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty({ message: 'Status cannot be empty.' })
  @IsString()
  @Matches(/^(active|inactive|locked)$/, {
    message: 'Status must be active, inactive or locked.',
  })
  status: string;
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/auth-service/src/modules/user/admin/dtos/
git commit -m "feat(auth): add admin user management DTOs"
```

---

## Task 3: Admin UserService

**Files:**
- Create: `apps/auth-service/src/modules/user/admin/services/user.service.ts`

- [ ] **Step 1: Create the admin user service**

```typescript
// apps/auth-service/src/modules/user/admin/services/user.service.ts
import {
  Injectable, Logger, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UserAdminRepository } from '../../repositories/user-admin.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AdminChangePasswordDto } from '../dtos/admin-change-password.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';

@Injectable()
export class AdminUserService {
  private readonly logger = new Logger(AdminUserService.name);

  constructor(
    private readonly repo: UserAdminRepository,
    private readonly config: ConfigService,
  ) {}

  async getList(query: any) {
    return this.repo.findAll(query);
  }

  async getSimpleList(query: any) {
    return this.repo.findAllSimple(query);
  }

  async getOne(id: bigint) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.sanitize(user);
  }

  async create(dto: CreateUserDto, actorId?: bigint) {
    await this.assertUnique({ email: dto.email, username: dto.username, phone: dto.phone });

    const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
    const hashedPassword = await bcrypt.hash(dto.password, rounds);

    const user = await this.repo.client.$transaction(async (tx) => {
      const created = await this.repo.create(
        {
          username: dto.username ?? null,
          email: dto.email ?? null,
          phone: dto.phone ?? null,
          password: hashedPassword,
          name: dto.name ?? null,
          image: dto.image ?? null,
          status: 'active',
          created_user_id: actorId ?? null,
          updated_user_id: actorId ?? null,
        },
        tx,
      );

      if (dto.profile) {
        await this.repo.upsertProfile(
          created.id,
          this.buildProfileData(dto.profile, actorId),
          tx,
        );
      }

      return created;
    });

    return this.getOne(user.id);
  }

  async update(id: bigint, dto: UpdateUserDto, actorId?: bigint) {
    await this.getOne(id); // ensure exists
    await this.assertUnique(
      { email: dto.email, username: dto.username, phone: dto.phone },
      id,
    );

    const data: Record<string, any> = { updated_user_id: actorId ?? null };
    if (dto.username !== undefined) data.username = dto.username;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.image !== undefined) data.image = dto.image;

    if (dto.password) {
      const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
      data.password = await bcrypt.hash(dto.password, rounds);
    }

    await this.repo.client.$transaction(async (tx) => {
      await this.repo.update(id, data, tx);

      if (dto.profile) {
        await this.repo.upsertProfile(
          id,
          this.buildProfileData(dto.profile, actorId),
          tx,
        );
      }
    });

    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id); // ensure exists
    await this.repo.delete(id);
    return { success: true };
  }

  async changePassword(id: bigint, dto: AdminChangePasswordDto) {
    await this.getOne(id); // ensure exists
    const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
    const hashed = await bcrypt.hash(dto.password, rounds);
    await this.repo.update(id, { password: hashed });
    return { success: true };
  }

  async changeStatus(id: bigint, dto: ChangeStatusDto) {
    const user = await this.getOne(id);
    await this.repo.update(id, { status: dto.status });
    return { ...user, status: dto.status };
  }

  private async assertUnique(
    fields: { email?: string; username?: string; phone?: string },
    excludeId?: bigint,
  ) {
    const existing = await this.repo.checkUnique(fields, excludeId);
    if (!existing) return;

    if (fields.email && existing.email === fields.email) {
      throw new BadRequestException('Email already in use.');
    }
    if (fields.username && existing.username === fields.username) {
      throw new BadRequestException('Username already in use.');
    }
    if (fields.phone && existing.phone === fields.phone) {
      throw new BadRequestException('Phone already in use.');
    }
  }

  private buildProfileData(profile: any, actorId?: bigint) {
    const data: Record<string, any> = {};
    if (profile.birthday) data.birthday = new Date(profile.birthday);
    if (profile.gender !== undefined) data.gender = profile.gender;
    if (profile.address !== undefined) data.address = profile.address;
    if (profile.country_id) data.country_id = BigInt(profile.country_id);
    if (profile.province_id) data.province_id = BigInt(profile.province_id);
    if (profile.ward_id) data.ward_id = BigInt(profile.ward_id);
    if (profile.about !== undefined) data.about = profile.about;
    if (actorId) {
      data.created_user_id = actorId;
      data.updated_user_id = actorId;
    }
    return data;
  }

  private sanitize(user: any) {
    const { password, remember_token, ...rest } = user;
    return rest;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/auth-service/src/modules/user/admin/services/user.service.ts
git commit -m "feat(auth): add AdminUserService with CRUD + password + status"
```

---

## Task 4: Admin UserController

**Files:**
- Create: `apps/auth-service/src/modules/user/admin/controllers/user.controller.ts`

- [ ] **Step 1: Create the admin controller**

```typescript
// apps/auth-service/src/modules/user/admin/controllers/user.controller.ts
import {
  Controller, Get, Post, Put, Patch, Delete,
  Query, Param, Body, Req,
} from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminUserService } from '../services/user.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AdminChangePasswordDto } from '../dtos/admin-change-password.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';

@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  @Permission('user.manage')
  @Get()
  getList(@Query() query: UserQueryDto) {
    return this.userService.getList(query);
  }

  @Permission('user.manage')
  @Get('simple')
  getSimpleList(@Query() query: UserQueryDto) {
    return this.userService.getSimpleList(query);
  }

  @Permission('user.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOne(BigInt(id));
  }

  @Permission('user.manage')
  @Post()
  create(@Body() dto: CreateUserDto, @Req() req: any) {
    const actorId = req.user?.sub ? BigInt(req.user.sub) : undefined;
    return this.userService.create(dto, actorId);
  }

  @Permission('user.manage')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req: any) {
    const actorId = req.user?.sub ? BigInt(req.user.sub) : undefined;
    return this.userService.update(BigInt(id), dto, actorId);
  }

  @Permission('user.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(BigInt(id));
  }

  @Permission('user.manage')
  @Patch(':id/password')
  changePassword(@Param('id') id: string, @Body() dto: AdminChangePasswordDto) {
    return this.userService.changePassword(BigInt(id), dto);
  }

  @Permission('user.manage')
  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
    return this.userService.changeStatus(BigInt(id), dto);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/auth-service/src/modules/user/admin/controllers/user.controller.ts
git commit -m "feat(auth): add AdminUserController with 8 CRUD endpoints"
```

---

## Task 5: User Profile DTOs

**Files:**
- Create: `apps/auth-service/src/modules/user/user/dtos/update-profile.dto.ts`
- Create: `apps/auth-service/src/modules/user/user/dtos/change-password.dto.ts`

- [ ] **Step 1: Create UpdateProfileDto**

```typescript
// apps/auth-service/src/modules/user/user/dtos/update-profile.dto.ts
import {
  IsOptional, IsString, MaxLength, Matches, Transform,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  country_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  province_id?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/)
  ward_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  about?: string;
}
```

- [ ] **Step 2: Create ChangePasswordDto**

```typescript
// apps/auth-service/src/modules/user/user/dtos/change-password.dto.ts
import { IsNotEmpty, IsString, MinLength, MaxLength, Validate } from 'class-validator';
import { MatchConstraint } from '../../../modules/auth/dto/register.dto';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Current password cannot be empty.' })
  @IsString()
  old_password: string;

  @IsNotEmpty({ message: 'New password cannot be empty.' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @MaxLength(72)
  password: string;

  @IsNotEmpty({ message: 'Confirm password cannot be empty.' })
  @IsString()
  @Validate(MatchConstraint, ['password'], { message: 'Passwords do not match.' })
  confirmPassword: string;
}
```

> **Note:** If `MatchConstraint` is not exported from `register.dto.ts`, extract it to a shared file `apps/auth-service/src/modules/auth/validators/match.validator.ts` and import from there. Check the existing export before proceeding.

- [ ] **Step 3: Commit**

```bash
git add apps/auth-service/src/modules/user/user/dtos/
git commit -m "feat(auth): add user profile DTOs (update-profile, change-password)"
```

---

## Task 6: ProfileService

**Files:**
- Create: `apps/auth-service/src/modules/user/user/services/profile.service.ts`

- [ ] **Step 1: Create profile service**

```typescript
// apps/auth-service/src/modules/user/user/services/profile.service.ts
import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../../database/prisma.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getProfile(userId: bigint) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        name: true,
        image: true,
        status: true,
        email_verified_at: true,
        phone_verified_at: true,
        last_login_at: true,
        created_at: true,
        profile: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: bigint, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Separate user-level vs profile-level fields
    const userData: Record<string, any> = {};
    if (dto.name !== undefined) userData.name = dto.name;
    if (dto.image !== undefined) userData.image = dto.image;

    const profileData: Record<string, any> = {};
    if (dto.birthday !== undefined) profileData.birthday = dto.birthday ? new Date(dto.birthday) : null;
    if (dto.gender !== undefined) profileData.gender = dto.gender;
    if (dto.address !== undefined) profileData.address = dto.address;
    if (dto.country_id !== undefined) profileData.country_id = dto.country_id ? BigInt(dto.country_id) : null;
    if (dto.province_id !== undefined) profileData.province_id = dto.province_id ? BigInt(dto.province_id) : null;
    if (dto.ward_id !== undefined) profileData.ward_id = dto.ward_id ? BigInt(dto.ward_id) : null;
    if (dto.about !== undefined) profileData.about = dto.about;

    const hasUserUpdate = Object.keys(userData).length > 0;
    const hasProfileUpdate = Object.keys(profileData).length > 0;

    if (!hasUserUpdate && !hasProfileUpdate) {
      return this.getProfile(userId);
    }

    await this.prisma.$transaction(async (tx) => {
      if (hasUserUpdate) {
        await tx.user.update({ where: { id: userId }, data: userData });
      }
      if (hasProfileUpdate) {
        await tx.profile.upsert({
          where: { user_id: userId },
          create: { user_id: userId, ...profileData },
          update: profileData,
        });
      }
    });

    return this.getProfile(userId);
  }

  async changePassword(userId: bigint, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.password) {
      throw new BadRequestException('Account uses social login. Password cannot be changed.');
    }

    const isValid = await bcrypt.compare(dto.old_password, user.password);
    if (!isValid) {
      throw new BadRequestException('Current password is incorrect.');
    }

    const rounds = Number(this.config.get('BCRYPT_ROUNDS') ?? 12);
    const hashed = await bcrypt.hash(dto.password, rounds);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { success: true };
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/auth-service/src/modules/user/user/services/profile.service.ts
git commit -m "feat(auth): add ProfileService for user self-service"
```

---

## Task 7: ProfileController

**Files:**
- Create: `apps/auth-service/src/modules/user/user/controllers/profile.controller.ts`

- [ ] **Step 1: Create profile controller**

```typescript
// apps/auth-service/src/modules/user/user/controllers/profile.controller.ts
import { Controller, Get, Patch, Body, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Controller('user/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Permission('user')
  @Get()
  getProfile(@Req() req: any) {
    return this.profileService.getProfile(BigInt(req.user.sub));
  }

  @Permission('user')
  @Patch()
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(BigInt(req.user.sub), dto);
  }

  @Permission('user')
  @Patch('change-password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.profileService.changePassword(BigInt(req.user.sub), dto);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/auth-service/src/modules/user/user/controllers/profile.controller.ts
git commit -m "feat(auth): add ProfileController with get/update/change-password"
```

---

## Task 8: UserModule + AppModule Registration

**Files:**
- Create: `apps/auth-service/src/modules/user/user.module.ts`
- Modify: `apps/auth-service/src/app.module.ts`

- [ ] **Step 1: Create UserModule**

```typescript
// apps/auth-service/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserAdminRepository } from './repositories/user-admin.repository';
import { AdminUserController } from './admin/controllers/user.controller';
import { AdminUserService } from './admin/services/user.service';
import { ProfileController } from './user/controllers/profile.controller';
import { ProfileService } from './user/services/profile.service';

@Module({
  controllers: [AdminUserController, ProfileController],
  providers: [UserAdminRepository, AdminUserService, ProfileService],
})
export class UserModule {}
```

- [ ] **Step 2: Register in AppModule**

Open `apps/auth-service/src/app.module.ts` and add:

```typescript
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // ... existing imports ...
    UserModule,   // <-- add this
  ],
  // ...
})
export class AppModule { ... }
```

- [ ] **Step 3: Verify build**

Run: `cd /d/microservice && npm run build:shared && npm -w apps/auth-service run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add apps/auth-service/src/modules/user/user.module.ts apps/auth-service/src/app.module.ts
git commit -m "feat(auth): register UserModule with admin + profile controllers"
```

---

## Task 9: Update Nginx Config for New Routes

The admin/user endpoints are under auth-service which uses `/api/v1/auth/` prefix in nginx.
These new routes (`admin/users`, `user/profile`) do NOT start with `auth/`, so they need their own nginx routing.

**Files:**
- Modify: `infrastructure/nginx/nginx.conf`
- Modify: `infrastructure/nginx/nginx.dev.conf`

- [ ] **Step 1: Add admin/users and user/profile routes to nginx.conf**

Add these location blocks **before** the fallback `location /api/v1/` block in both nginx config files:

```nginx
    # ── Auth Service: admin users + user profile ──────────────────────────
    # These routes belong to auth-service but don't start with /auth/
    location /api/v1/auth/admin/users/ {
        limit_req zone=api_limit burst=20 nodelay;
        rewrite ^/api/v1/auth(/.*)$ /api/v1$1 break;
        proxy_pass http://auth_service;
        include /etc/nginx/snippets/proxy_common.conf;
    }

    location /api/v1/auth/user/profile {
        limit_req zone=api_limit burst=20 nodelay;
        rewrite ^/api/v1/auth(/.*)$ /api/v1$1 break;
        proxy_pass http://auth_service;
        include /etc/nginx/snippets/proxy_common.conf;
    }
```

This keeps all auth-service routes under `/api/v1/auth/` namespace:
- `/api/v1/auth/login` — existing auth
- `/api/v1/auth/admin/users/` — admin user management
- `/api/v1/auth/user/profile` — user self-service profile

- [ ] **Step 2: Apply same changes to nginx.dev.conf**

Same location blocks, same position (before the fallback).

- [ ] **Step 3: Commit**

```bash
git add infrastructure/nginx/nginx.conf infrastructure/nginx/nginx.dev.conf
git commit -m "feat(nginx): add routes for admin/users and user/profile under /auth/"
```

---

## Task 10: Verify MatchConstraint Export

**Files:**
- Check: `apps/auth-service/src/modules/auth/dto/register.dto.ts`
- Possibly create: `apps/auth-service/src/common/validators/match.validator.ts`

- [ ] **Step 1: Check if MatchConstraint is exported**

Open `apps/auth-service/src/modules/auth/dto/register.dto.ts` and check if `MatchConstraint` is exported with `export class MatchConstraint`.

If **yes**: the import in `change-password.dto.ts` works as-is.

If **no** (not exported): Extract it to a shared location:

```typescript
// apps/auth-service/src/common/validators/match.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match', async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must match ${args.constraints[0]}`;
  }
}
```

Then update the import in `change-password.dto.ts`:
```typescript
import { MatchConstraint } from '../../../../common/validators/match.validator';
```

And update `register.dto.ts` to also import from the shared location.

- [ ] **Step 2: Commit if changes made**

```bash
git add -A
git commit -m "refactor(auth): extract MatchConstraint to shared validator"
```

---

## Task 11: Smoke Test

- [ ] **Step 1: Build the full project**

```bash
cd /d/microservice
npm run build:shared
npm -w apps/auth-service run build
```

Expected: Build succeeds.

- [ ] **Step 2: Verify endpoints register**

Start auth-service locally and check logs for route registration:
```
npm -w apps/auth-service run start:dev
```

Look for these routes in startup output:
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/users/simple`
- `GET /api/v1/admin/users/:id`
- `POST /api/v1/admin/users`
- `PUT /api/v1/admin/users/:id`
- `DELETE /api/v1/admin/users/:id`
- `PATCH /api/v1/admin/users/:id/password`
- `PATCH /api/v1/admin/users/:id/status`
- `GET /api/v1/user/profile`
- `PATCH /api/v1/user/profile`
- `PATCH /api/v1/user/profile/change-password`

- [ ] **Step 3: Quick curl tests (with running DB)**

```bash
# Health check
curl -s http://localhost:3002/api/v1/health

# Admin list (should return 401 without token, confirming guard works)
curl -s http://localhost:3002/api/v1/admin/users

# Profile (should return 401 without token)
curl -s http://localhost:3002/api/v1/user/profile
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(auth): complete user management — admin CRUD + user profile"
```

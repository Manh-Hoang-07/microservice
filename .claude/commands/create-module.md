Tao module moi theo chuan muc du an. Tham so: $ARGUMENTS

Neu $ARGUMENTS khong du, hoi nguoi dung:
1. Ten service (vi du: comic-service)
2. Ten module/domain (vi du: genre)
3. Can admin CRUD, public API, hay ca hai?
4. Co Prisma model chua? (neu chua, tao truoc)

## BAT BUOC truoc khi tao

1. Doc Prisma schema cua service de biet cac model/field
2. Doc 1 module tuong tu trong cung service de thay cach import, naming thuc te
3. Doc `apps/<service>/src/app.module.ts` de biet cach dang ky

## Tao theo thu tu

### 1. Repository (extends PrismaRepository)

```typescript
// modules/<domain>/repositories/<domain>.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '@package/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { Prisma } from 'src/generated/prisma';

export interface <Domain>Filter {
  search?: string;
  status?: string;
}

@Injectable()
export class <Domain>Repository extends PrismaRepository<any> {
  constructor(prisma: PrismaService) {
    super(prisma, '<model>');  // ten Prisma model lowercase
  }

  buildWhere(filter: <Domain>Filter): Prisma.<Model>WhereInput {
    const where: Prisma.<Model>WhereInput = {};
    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search.slice(0, 100), mode: 'insensitive' } },
      ];
    }
    if (filter.status) where.status = filter.status;
    return where;
  }
}
```

### 2. DTOs

- `create-<domain>.dto.ts` — class-validator, @MaxLength cho string
- `update-<domain>.dto.ts` — tat ca field optional
- `list-<domain>.query.dto.ts` — extends BaseListQueryDto

### 3. Admin Service (extends BaseService)

```typescript
import { Injectable } from '@nestjs/common';
import { BaseService, SlugHelper, t } from '@package/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class Admin<Domain>Service extends BaseService<any, <Domain>Repository> {
  constructor(repo: <Domain>Repository, private readonly i18n: I18nService) {
    super(repo);
  }

  prepareFilters(filter: any) { return filter; }

  async beforeCreate(data: any) {
    if (data.title) {
      data.slug = await SlugHelper.uniqueSlug(data.title, {
        findOne: (f) => this.repository.findOne({ slug: f.slug }),
      });
    }
    return data;
  }

  async beforeUpdate(id: any, data: any) {
    await this.getOne(id);
    return data;
  }

  async beforeDelete(id: any) {
    await this.getOne(id);
  }

  transform(entity: any) {
    if (!entity) return null;
    return { ...entity };
  }
}
```

### 4. Admin Controller

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';

@Controller('admin/<domain-plural>')
export class Admin<Domain>Controller {
  constructor(private readonly service: Admin<Domain>Service) {}

  @Permission('<domain>.manage')
  @Get()
  getList(@Query() query: List<Domain>QueryDto) { return this.service.getList(query); }

  @Permission('<domain>.manage')
  @Get(':id')
  getOne(@Param('id', ParseBigIntPipe) id: bigint) { return this.service.getOne(id); }

  @Permission('<domain>.manage')
  @AuditLog({ action: '<domain>.create' })
  @Post()
  create(@Body() dto: Create<Domain>Dto, @Req() req: any) {
    return this.service.create({ ...dto, created_user_id: req.user?.sub });
  }

  @Permission('<domain>.manage')
  @AuditLog({ action: '<domain>.update' })
  @Put(':id')
  update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: Update<Domain>Dto, @Req() req: any) {
    return this.service.update(id, { ...dto, updated_user_id: req.user?.sub });
  }

  @Permission('<domain>.manage')
  @AuditLog({ action: '<domain>.delete' })
  @Delete(':id')
  delete(@Param('id', ParseBigIntPipe) id: bigint) { return this.service.delete(id); }
}
```

### 5. Public Service + Controller (neu can)

- `@Public()` decorator
- Redis cache (versioning + single-flight)
- Select it field, chi public status

### 6. Module

```typescript
@Module({
  controllers: [Admin<Domain>Controller, Public<Domain>Controller],
  providers: [<Domain>Repository, Admin<Domain>Service, Public<Domain>Service],
  exports: [<Domain>Repository],
})
export class <Domain>Module {}
```

### 7. Dang ky

Import module vao `app.module.ts` cua service.

### 8. Verify

```bash
npm run build:shared && npm -w apps/<service> run build
```

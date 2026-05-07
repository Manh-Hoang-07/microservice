Them CRUD endpoints cho module. Tham so: $ARGUMENTS

Neu $ARGUMENTS khong du, hoi:
1. Service nao? (vi du: comic-service)
2. Module nao? (vi du: genre)
3. Admin, public, hay ca hai?

## BAT BUOC: doc code truoc

1. Doc Prisma schema de biet fields
2. Doc module hien tai (neu da co repository/service)
3. Doc 1 module tuong tu de lay pattern

## Tao theo thu tu

### 1. DTOs

```typescript
// list-<domain>.query.dto.ts
import { BaseListQueryDto } from '@package/common';
import { IsOptional, IsEnum } from 'class-validator';

export class List<Domain>QueryDto extends BaseListQueryDto {
  @IsOptional() @IsEnum(Status) status?: Status;
}

// create-<domain>.dto.ts
export class Create<Domain>Dto {
  @IsString() @MaxLength(255) title: string;
  @IsOptional() @IsString() @MaxLength(20_000) description?: string;
  // ...
}

// update-<domain>.dto.ts — tat ca optional
export class Update<Domain>Dto {
  @IsOptional() @IsString() @MaxLength(255) title?: string;
  // ...
}
```

### 2. Repository (neu chua co) — extends PrismaRepository

### 3. Admin Service — extends BaseService
Override: prepareFilters, beforeCreate (slug), beforeUpdate (verify), beforeDelete (verify), transform

### 4. Admin Controller
5 endpoints: GET /, GET /:id, POST /, PUT /:id, DELETE /:id
Decorators: @Permission, @AuditLog (create/update/delete), ParseBigIntPipe

### 5. Public (neu can)
@Public(), Redis cache, chi read

### 6. Cap nhat module file — them controllers + providers

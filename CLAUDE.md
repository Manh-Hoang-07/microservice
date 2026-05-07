# Comic Platform — Microservices Monorepo

## Tong quan

Backend nen tang truyen tranh: NestJS + Prisma, microservices monorepo.
10 service (`apps/`), 8 shared packages (`shared/`), PostgreSQL + Redis + Kafka + Nginx.

## Lenh thuong dung

```bash
npm install                              # Cai dat (tu dong build shared)
npm run dev                              # Chay tat ca 10 service (hot-reload)
npm run dev:<ten>                        # auth|comic|config|web-api|iam|introduction|marketing|notification|post|storage
npm run build:shared                     # Build shared (BAT BUOC truoc khi build service)
npm run build                            # Build tat ca
npm run prisma:migrate                   # Migrate dev
npm run prisma:deploy                    # Migrate production
npm run docker:infra                     # Chay infra Docker
npm test                                 # Test
```

## Bang Service

| Service | Port | Prefix |
|---------|-----:|--------|
| auth-service | 3001 | /api/auth |
| iam-service | 3002 | /api/iam |
| config-service | 3003 | /api/config |
| storage-service | 3004 | /api/storage |
| notification-service | 3005 | /api/notifications |
| marketing-service | 3006 | /api/marketing |
| introduction-service | 3007 | /api/introduction |
| post-service | 3008 | /api/posts |
| comic-service | 3009 | /api/comics |
| web-api-service | 3010 | /api/web |

## Chuan muc code (ap dung cho chuc nang moi)

### Controller

```typescript
@Controller('admin/comics')
export class AdminComicController {
  constructor(private readonly service: AdminComicService) {}

  @Permission('comic.manage')
  @AuditLog({ action: 'comic.create' })
  @Post()
  async create(@Body() dto: CreateComicDto, @Req() req: Request) {
    const actorId = req.user?.sub ? toPrimaryKey(req.user.sub) : undefined;
    return this.service.create(dto, actorId);
  }
}
```

- `@Permission()` cho admin, `@Public()` cho public, `@Internal()` + `@UseGuards(InternalGuard)` cho noi bo
- `@AuditLog({ action })` cho create/update/delete (shared/common)
- `ParseBigIntPipe` cho route param: `@Param('id', ParseBigIntPipe) id: bigint`
- Lay user tu `req.user.sub`, truyen actorId xuong service

### Service — ke thua BaseService

```typescript
@Injectable()
export class AdminComicService extends BaseService<Comic, ComicRepository> {
  constructor(repo: ComicRepository, private readonly i18n: I18nService) {
    super(repo);
  }

  // Override lifecycle hooks
  async beforeCreate(data) { /* slug, validate */ }
  async afterCreate(entity, data) { /* sync relations, clear cache */ }
  async beforeUpdate(id, data) { /* verify, refresh slug */ }
  async beforeDelete(id) { /* verify ton tai */ }
  prepareFilters(filter) { /* buildWhere logic */ }
  transform(entity) { /* format response */ }
}
```

- BaseService co san trong `@package/common`: getList, getOne, create, update, delete
- Override hooks thay vi viet lai toan bo method
- Tra ve ResponseUtil format tu dong qua TransformInterceptor

### Repository — ke thua PrismaRepository

```typescript
@Injectable()
export class ComicRepository extends PrismaRepository<Comic> {
  constructor(prisma: PrismaService) {
    super(prisma, 'comic');  // ten model trong Prisma
  }

  buildWhere(filter) { /* convert filter → Prisma where */ }
}
```

- PrismaRepository co san: findAll, findById, create, update, delete, count, exists
- Override `buildWhere()` cho filter logic rieng

### DTO

```typescript
export class CreateComicDto {
  @IsString() @MaxLength(255) title: string;
  @IsOptional() @IsString() @Matches(SLUG_RE) slug?: string;
  @IsOptional() @IsString() @MaxLength(20_000) description?: string;
}

export class ListComicsQueryDto extends BaseListQueryDto {
  @IsOptional() @IsEnum(ComicStatus) status?: ComicStatus;
}
```

- Ke thua `BaseListQueryDto` cho list endpoint (page, limit, search, sort, skipCount)
- class-validator decorators, @MaxLength cho string

### Response

TransformInterceptor tu dong wrap thanh:
```json
{ "success": true, "data": {...}, "meta": {...}, "timestamp": "..." }
```

Hoac dung ResponseUtil khi can custom:
```typescript
return ResponseUtil.success(data);
return ResponseUtil.paginated(items, page, limit, total);
return ResponseUtil.created(entity);
return ResponseUtil.deleted();
```

### Error

```typescript
throw new NotFoundException(t(this.i18n, 'comic.NOT_FOUND'));
throw new BadRequestException(t(this.i18n, 'comic.SLUG_IN_USE'));
```

GlobalExceptionFilter bat tat ca, wrap thanh ApiResponse.

## Shared packages co san

| Package | Chuc nang chinh |
|---------|-----------------|
| `@package/common` | BaseService, PrismaRepository, guards, decorators, ResponseUtil, SlugHelper, ParseBigIntPipe, SanitizeHtmlPipe, AuditLog, GlobalExceptionFilter |
| `@package/bootstrap` | createApp(), JsonLogger, FileLogger, MetricsModule |
| `@package/config` | createAppConfig(), createKafkaConfig(), createRedisConfig() |
| `@package/redis` | RedisService (get/set/del/incr + pub/sub + hash + set) |
| `@package/kafka-client` | KafkaProducerService.emit(topic, payload), KafkaClientModule |
| `@package/shared-types` | Event interfaces (ChapterPublished, UserRegistered, MailSend...) |
| `@package/circuit-breaker` | createCircuitBreaker() |
| `@package/tracing` | initTracing() — OpenTelemetry |
| `@package/auth-client` | JwtLocalGuard cho microservice |

## Quy tac

- File .env trong `apps/<service>/.env` — KHONG o root
- INTERNAL_API_SECRET giong nhau tren moi service
- Build shared truoc: `npm run build:shared`
- Production dung `prisma migrate deploy`, KHONG `migrate dev`
- Moi service 1 DB rieng
- Naming: file kebab-case, class PascalCase, bien camelCase, constant UPPER_SNAKE_CASE

Tao microservice moi. Tham so: $ARGUMENTS

Neu $ARGUMENTS khong du, hoi:
1. Ten service (vi du: payment-service)
2. Port (vi du: 3011)
3. Can database? Redis? Kafka?

## BAT BUOC: doc code truoc

Doc 1 service tuong tu (vi du: introduction-service) de lay pattern:
- package.json, tsconfig.json, .env.example
- src/main.ts, src/app.module.ts, src/types.ts
- src/core/ (config, database)

## Tao cau truc

```
apps/<service>/
  package.json           # scripts: start, start:dev, build, prisma:*
  tsconfig.json          # extends root
  .env.example           # template env
  src/
    main.ts              # createApp() tu @package/bootstrap
    app.module.ts        # imports: CoreModule, HealthModule, AuditModule, MetricsModule
    types.ts             # PrimaryKey, toPrimaryKey()
    core/
      config/env.validation.ts
      core.module.ts     # ConfigModule, DatabaseModule (neu co), RedisModule (neu co)
      database/          # neu co DB
        database.module.ts
        prisma.service.ts
    modules/
  prisma/                # neu co DB
    schema.prisma
```

## main.ts

```typescript
import { createApp } from '@package/bootstrap';
import { AppModule } from './app.module';

async function bootstrap() {
  await createApp({
    serviceName: '<service-name>',
    defaultPort: <port>,
    module: AppModule,
  });
}
bootstrap();
```

## Cap nhat cac file khac

1. Root `package.json` — them scripts: build:<ten>, start:<ten>, dev:<ten>
2. `ecosystem.config.js` — them vao SERVICES array
3. `docker-compose.yml` — service + DB + Redis containers
4. `infrastructure/nginx/nginx.conf` + `nginx.dev.conf` — upstream + location
5. `CLAUDE.md` + `README.md` + `docs/architecture/overview.md` + `docs/operations/runbook.md` — bang service

## Verify

```bash
npm install && npm run build:shared && npm -w apps/<service> run build
```

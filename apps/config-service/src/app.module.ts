import { Module } from '@nestjs/common';
import { MetricsModule } from '@package/bootstrap';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { I18nModule, AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { createAppConfig } from '@package/config';
import { envValidationSchema } from './config/env.validation';
import { JwtGuard, RbacGuard, GlobalExceptionFilter, HealthModule, BigIntSerializationInterceptor } from '@package/common';
import { RedisModule } from '@package/redis';
import { DatabaseModule } from './database/database.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { MenuModule } from './modules/menu/menu.module';
import { LocationModule } from './modules/location/location.module';
import { CachePurgeModule } from './modules/cache-purge/cache-purge.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [createAppConfig(3003, { internalApiSecret: process.env.INTERNAL_API_SECRET || '' })],
      validationSchema: envValidationSchema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    RedisModule,
    DatabaseModule,
    HealthModule.register('config-service'),
    MetricsModule,
    SystemConfigModule,
    MenuModule,
    LocationModule,
    CachePurgeModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // Bound abuse before any auth work runs.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
    // RBAC must follow JwtGuard. Without this guard, `@Permission(...)`
    // decorators are decoration-only and any authenticated user can call
    // admin endpoints (incl. SMTP credentials, menu admin, location admin).
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new RbacGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class ConfigAppModule {}

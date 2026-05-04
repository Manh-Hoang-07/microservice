import { Module } from '@nestjs/common';
import { MetricsModule } from '@package/bootstrap';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { I18nModule, AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { createAppConfig, createRedisConfig } from '@package/config';
import {
  JwtGuard,
  RbacGuard,
  GlobalExceptionFilter,
  BigIntSerializationInterceptor,
  HealthModule,
  AuditModule,
} from '@package/common';
import { RedisModule } from '@package/redis';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { RbacModule } from './rbac/rbac.module';
import { InternalModule } from './internal/internal.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { ContextModule } from './modules/context/context.module';
import { GroupModule } from './modules/group/group.module';
import { UserRoleModule } from './modules/user-role/user-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [
        createAppConfig(3008, {
          internalApiSecret: process.env.INTERNAL_API_SECRET || '',
        }),
        createRedisConfig(),
      ],
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
    DatabaseModule,
    RedisModule,
    RbacModule,
    HealthModule.register('iam-service'),
    MetricsModule,
    AuditModule,
    InternalModule,
    PermissionModule,
    RoleModule,
    ContextModule,
    GroupModule,
    UserRoleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // ThrottlerGuard MUST be in APP_GUARD chain — without it, the
    // ThrottlerModule.forRoot() rate limit never applies. This was a
    // regression from the round-1 fixes: post/comic/marketing/intro/notif
    // were wired but iam was not.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
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
export class AppModule {}

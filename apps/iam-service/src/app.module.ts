import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig } from '@package/config';
import {
  JwtGuard,
  RbacGuard,
  GlobalExceptionFilter,
  BigIntSerializationInterceptor,
  HealthModule,
} from '@package/common';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
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
      ],
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    SecurityModule,
    RbacModule,
    HealthModule.register('iam-service'),
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

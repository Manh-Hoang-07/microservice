import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsModule } from "@package/bootstrap";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as path from 'path';
import cookieParser = require('cookie-parser');
import { I18nModule, AcceptLanguageResolver, QueryResolver, I18nService } from 'nestjs-i18n';
import { createAppConfig, createKafkaConfig, createRedisConfig } from '@package/config';
import { RedisModule } from '@package/redis';
import { envValidationSchema } from './config/env.validation';
import jwtConfig from './config/jwt.config';

import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { JwksModule } from './jwks/jwks.module';
import { JwksService } from './jwks/services/jwks.service';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { TokenBlacklistService } from './security/services/token-blacklist.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuditModule, GlobalExceptionFilter, HealthModule, CommonKafkaModule } from '@package/common';
import { InternalModule } from './internal/internal.module';
import { KafkaModule } from './kafka/kafka.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [
        createAppConfig(3002, {
          internalApiSecret: process.env.INTERNAL_API_SECRET || '',
        }),
        jwtConfig,
        createKafkaConfig(),
        createRedisConfig(),
      ],
      validationSchema: envValidationSchema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, 'i18n'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    RedisModule,
    SecurityModule,
    JwksModule,
    AuthModule,
    HealthModule.register('auth-service'),
    MetricsModule,
    CommonKafkaModule,
    AuditModule,
    InternalModule,
    KafkaModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // Throttler MUST run before AuthJwtGuard so per-route `@Throttle()`
    // decorators on /auth/login, /auth/refresh, /auth/forgot-password,
    // /auth/register/send-otp actually bound brute-force attempts. Without
    // this, every `@Throttle({...})` is just metadata.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_GUARD,
      useFactory: (
        reflector: Reflector,
        config: ConfigService,
        jwksService: JwksService,
        i18n: I18nService,
        blacklist: TokenBlacklistService,
      ) => new AuthJwtGuard(reflector, config, jwksService, i18n, blacklist),
      inject: [Reflector, ConfigService, JwksService, I18nService, TokenBlacklistService],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

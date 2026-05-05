import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsModule } from "@package/bootstrap";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { I18nThrottlerGuard } from './core/guards/throttler.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as path from 'path';
import cookieParser = require('cookie-parser');
import { I18nModule, AcceptLanguageResolver, QueryResolver, I18nService } from 'nestjs-i18n';
import { createAppConfig, createKafkaConfig, createRedisConfig } from '@package/config';
import { RedisModule } from '@package/redis';
import { envValidationSchema } from './core/config/env.validation';
import jwtConfig from './core/config/jwt.config';

import { DatabaseModule } from './core/database/database.module';
import { SecurityModule } from './core/security/security.module';
import { AuthJwtGuard } from './core/guards/auth-jwt.guard';
import { TokenBlacklistService } from './core/security/services/token-blacklist.service';
import { KafkaModule } from './kafka/kafka.module';
import { JwksModule } from './jwks/jwks.module';
import { JwksService } from './jwks/services/jwks.service';
import { AuthModule } from './modules/auth/auth.module';
import { InternalModule } from './internal/internal.module';
import { UserModule } from './modules/user/user.module';
import { AuditModule, GlobalExceptionFilter, HealthModule, CommonKafkaModule, BigIntSerializationInterceptor } from '@package/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [
        createAppConfig(3001, {
          internalApiSecret: process.env.INTERNAL_API_SECRET || '',
        }),
        jwtConfig,
        createKafkaConfig(),
        createRedisConfig(),
      ],
      validationSchema: envValidationSchema,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
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
    { 
      provide: APP_GUARD,
      useClass: I18nThrottlerGuard
    },
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
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

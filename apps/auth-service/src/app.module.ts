import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig, createKafkaConfig } from '@package/config';
import { envValidationSchema } from './config/env.validation';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';

import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { JwksModule } from './jwks/jwks.module';
import { JwksService } from './jwks/services/jwks.service';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthModule } from './modules/auth/auth.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { GlobalExceptionFilter, HealthModule } from '@package/common';
import { InternalModule } from './internal/internal.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [
        createAppConfig(3002, {
          internalApiSecret: process.env.INTERNAL_API_SECRET || '',
          frontendUrl: process.env.GOOGLE_FRONTEND_URL || 'http://localhost:3000',
        }),
        jwtConfig,
        mailConfig,
        createKafkaConfig(),
      ],
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    SecurityModule,
    JwksModule,
    AuthModule,
    RbacModule,
    HealthModule.register('auth-service'),
    InternalModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService, jwksService: JwksService) =>
        new AuthJwtGuard(reflector, config, jwksService),
      inject: [Reflector, ConfigService, JwksService],
    },
  ],
})
export class AppModule {}

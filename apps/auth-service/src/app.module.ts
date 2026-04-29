import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import mailConfig from './config/mail.config';
import kafkaConfig from './config/kafka.config';

import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { JwksModule } from './jwks/jwks.module';
import { JwksService } from './jwks/services/jwks.service';
import { JwtGuard } from '@package/common';
import { AuthModule } from './modules/auth/auth.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { HealthModule } from './health/health.module';
import { InternalModule } from './internal/internal.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, jwtConfig, mailConfig, kafkaConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3002),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().optional().allow(''),
        JWT_PRIVATE_KEY_PEM: Joi.string().optional().allow(''),
        JWT_PUBLIC_KEY_PEM: Joi.string().optional().allow(''),
        JWT_EXPIRES_IN: Joi.string().default('1h'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
        JWT_ISSUER: Joi.string().default('auth-service'),
        JWT_AUDIENCE: Joi.string().default('comic-platform'),
        GOOGLE_CLIENT_ID: Joi.string().optional().allow(''),
        GOOGLE_CLIENT_SECRET: Joi.string().optional().allow(''),
        GOOGLE_CALLBACK_URL: Joi.string().optional().allow(''),
        GOOGLE_FRONTEND_URL: Joi.string().optional().allow(''),
        MAIL_HOST: Joi.string().optional().allow(''),
        MAIL_PORT: Joi.number().default(587),
        MAIL_USER: Joi.string().optional().allow(''),
        MAIL_PASS: Joi.string().optional().allow(''),
        MAIL_FROM: Joi.string().optional().allow(''),
        KAFKA_BROKERS: Joi.string().optional().allow(''),
        EVENT_DRIVER: Joi.string().optional().allow(''),
        INTERNAL_API_SECRET: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    SecurityModule,
    JwksModule,
    AuthModule,
    RbacModule,
    HealthModule,
    InternalModule,
    KafkaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, jwksService: JwksService) =>
        new JwtGuard(reflector, jwksService),
      inject: [Reflector, JwksService],
    },
  ],
})
export class AppModule {}

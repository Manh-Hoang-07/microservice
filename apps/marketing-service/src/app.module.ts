import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

import { createAppConfig, createKafkaConfig } from '@package/config';

import { DatabaseModule } from './database/database.module';
import { JwtGuard, BigIntSerializationInterceptor, GlobalExceptionFilter, HealthModule } from '@package/common';
import { KafkaModule } from './kafka/kafka.module';

import { BannerModule } from './modules/banner/banner.module';
import { BannerLocationModule } from './modules/banner-location/banner-location.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [createAppConfig(3009), createKafkaConfig()],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3009),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        AUTH_JWKS_URL: Joi.string().optional().allow(''),
        KAFKA_BROKERS: Joi.string().optional().allow(''),
        EVENT_DRIVER: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    HealthModule.register('marketing-service'),
    KafkaModule,
    BannerModule,
    BannerLocationModule,
    ContactModule,
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
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class AppModule {}

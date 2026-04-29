import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

import appConfig from './config/app.config';
import kafkaConfig from './config/kafka.config';

import { DatabaseModule } from './database/database.module';
import { JwtGuard } from './guards/jwt.guard';
import { BigIntSerializationInterceptor } from './common/bigint-serialization.interceptor';
import { HealthModule } from './health/health.module';
import { KafkaModule } from './kafka/kafka.module';

import { BannerModule } from './modules/banner/banner.module';
import { BannerLocationModule } from './modules/banner-location/banner-location.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, kafkaConfig],
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
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    HealthModule,
    KafkaModule,
    BannerModule,
    BannerLocationModule,
    ContactModule,
  ],
  providers: [
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

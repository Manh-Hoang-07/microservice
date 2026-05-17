import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsModule } from "@package/bootstrap";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig, createKafkaConfig } from '@package/config';
import { envValidationSchema } from './core/config/env.validation';

import { CoreModule } from './core/core.module';
import { RedisModule, RedisService } from '@package/redis';
import { KafkaProducerService } from '@package/kafka-client';
import { JwtGuard, RbacGuard, GlobalExceptionFilter, HealthModule, CommonKafkaModule, BigIntSerializationInterceptor, SessionModule, SessionContextMiddleware } from '@package/common';
import { PrismaService } from './core/database/prisma.service';
import { ThrottlerGuard } from '@nestjs/throttler';
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
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    CoreModule,
    RedisModule,
    CommonKafkaModule,
    KafkaModule,
    HealthModule.register({
      serviceName: 'marketing-service',
      probes: [
        {
          provide: 'HEALTH_DB_PROBE',
          inject: [PrismaService],
          useFactory: (prisma: PrismaService) => () => prisma.$queryRawUnsafe('SELECT 1').then(() => {}),
        },
        {
          provide: 'HEALTH_REDIS_PROBE',
          inject: [RedisService],
          useFactory: (redis: RedisService) => () => redis.ping(),
        },
        {
          provide: 'HEALTH_KAFKA_PROBE',
          inject: [KafkaProducerService],
          useFactory: (kafka: KafkaProducerService) => () => kafka.ping(),
        },
      ],
    }),
    MetricsModule,
    SessionModule,
    BannerModule,
    BannerLocationModule,
    ContactModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
    // RbacGuard required so `@Permission('banner.manage' | 'contact.manage')`
    // is enforced; without it any authenticated user can write banners.
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService, redis: RedisService) =>
        new RbacGuard(reflector, config, redis),
      inject: [Reflector, ConfigService, RedisService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SessionContextMiddleware).forRoutes('*path');
  }
}

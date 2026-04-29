import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

import appConfig from './config/app.config';
import kafkaConfig from './config/kafka.config';
import redisConfig from './config/redis.config';

import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { JwtGuard } from './guards/jwt.guard';
import { BigIntSerializationInterceptor } from './common/bigint-serialization.interceptor';
import { HealthModule } from './health/health.module';
import { KafkaModule } from './kafka/kafka.module';

import { PostModule } from './modules/post/post.module';
import { PostCategoryModule } from './modules/post-category/post-category.module';
import { PostTagModule } from './modules/post-tag/post-tag.module';
import { PostCommentModule } from './modules/post-comment/post-comment.module';
import { PostStatsModule } from './modules/post-stats/post-stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, kafkaConfig, redisConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3007),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().optional().allow(''),
        AUTH_JWKS_URL: Joi.string().optional().allow(''),
        KAFKA_BROKERS: Joi.string().optional().allow(''),
        EVENT_DRIVER: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    RedisModule,
    HealthModule,
    KafkaModule,
    PostModule,
    PostCategoryModule,
    PostTagModule,
    PostCommentModule,
    PostStatsModule,
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

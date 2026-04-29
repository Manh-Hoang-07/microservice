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
import { RedisModule } from '@package/redis';
import { JwtGuard } from '@package/common';
import { BigIntSerializationInterceptor } from '@package/common';
import { HealthModule } from './health/health.module';
import { KafkaModule } from './kafka/kafka.module';

import { ComicModule } from './modules/comic/comic.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { ComicCategoryModule } from './modules/comic-category/comic-category.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReviewModule } from './modules/review/review.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { FollowModule } from './modules/follow/follow.module';
import { ReadingHistoryModule } from './modules/reading-history/reading-history.module';
import { StatsModule } from './modules/stats/stats.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { ViewTrackingModule } from './modules/view-tracking/view-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, kafkaConfig, redisConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3001),
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
    ComicModule,
    ChapterModule,
    ComicCategoryModule,
    CommentModule,
    ReviewModule,
    BookmarkModule,
    FollowModule,
    ReadingHistoryModule,
    StatsModule,
    HomepageModule,
    ViewTrackingModule,
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

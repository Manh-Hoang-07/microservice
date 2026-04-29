import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig, createKafkaConfig, createRedisConfig } from '@package/config';
import { envValidationSchema } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from '@package/redis';
import { JwtGuard, BigIntSerializationInterceptor, GlobalExceptionFilter, HealthModule } from '@package/common';
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
      load: [createAppConfig(3001), createKafkaConfig(), createRedisConfig()],
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    RedisModule,
    HealthModule.register('comic-service'),
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

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig, createKafkaConfig, createRedisConfig } from '@package/config';
import { envValidationSchema } from './config/env.validation';
import mailConfig from './config/mail.config';

import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { JwtGuard, BigIntSerializationInterceptor, GlobalExceptionFilter, HealthModule } from '@package/common';
import { NotificationModule } from './notification/notification.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { QueueModule } from './queue/queue.module';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [createAppConfig(3004), createKafkaConfig('notification-service'), mailConfig, createRedisConfig('redis://localhost:6382')],
      validationSchema: envValidationSchema,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    MailModule,
    HealthModule.register('notification-service'),
    NotificationModule,
    ContentTemplateModule,
    QueueModule,
    KafkaConsumerModule,
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

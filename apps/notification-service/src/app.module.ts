import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

import appConfig from './config/app.config';
import kafkaConfig from './config/kafka.config';
import mailConfig from './config/mail.config';
import redisConfig from './config/redis.config';

import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { JwtGuard } from '@package/common';
import { BigIntSerializationInterceptor } from '@package/common';
import { HealthModule } from './health/health.module';
import { NotificationModule } from './notification/notification.module';
import { ContentTemplateModule } from './content-template/content-template.module';
import { QueueModule } from './queue/queue.module';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, kafkaConfig, mailConfig, redisConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3004),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().optional().allow(''),
        AUTH_JWKS_URL: Joi.string().optional().allow(''),
        KAFKA_BROKERS: Joi.string().optional().allow(''),
        KAFKA_GROUP_ID: Joi.string().optional().allow(''),
        MAIL_HOST: Joi.string().optional().allow(''),
        MAIL_PORT: Joi.number().default(587),
        MAIL_USER: Joi.string().optional().allow(''),
        MAIL_PASS: Joi.string().optional().allow(''),
        MAIL_FROM: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    MailModule,
    HealthModule,
    NotificationModule,
    ContentTemplateModule,
    QueueModule,
    KafkaConsumerModule,
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

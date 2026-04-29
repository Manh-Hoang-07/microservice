import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { NotificationProcessor } from './processors/notification.processor';
import { ContentTemplateModule } from '../content-template/content-template.module';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'notification',
      useFactory: (config: ConfigService) => ({
        redis: config.get<string>('redis.url') || 'redis://localhost:6382',
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
          removeOnComplete: true,
        },
        limiter: { max: 10, duration: 1000 },
      }),
      inject: [ConfigService],
    }),
    ContentTemplateModule,
  ],
  providers: [NotificationProcessor],
  exports: [BullModule],
})
export class QueueModule {}

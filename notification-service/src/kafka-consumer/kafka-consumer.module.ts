import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './services/kafka-consumer.service';
import { NotificationModule } from '../notification/notification.module';
import { ContentTemplateModule } from '../content-template/content-template.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [NotificationModule, ContentTemplateModule, QueueModule],
  providers: [KafkaConsumerService],
})
export class KafkaConsumerModule {}

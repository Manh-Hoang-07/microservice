import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './services/kafka-consumer.service';
import { NotificationModule } from '../notification/notification.module';
import { ContentTemplateModule } from '../content-template/content-template.module';
import { QueueModule } from '../queue/queue.module';
import { FollowersProjectionRepository } from './repositories/followers-projection.repository';

@Module({
  imports: [NotificationModule, ContentTemplateModule, QueueModule],
  providers: [FollowersProjectionRepository, KafkaConsumerService],
})
export class KafkaConsumerModule {}

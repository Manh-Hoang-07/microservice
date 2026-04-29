import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRelayService } from '@package/common';
import { PrismaService } from '../../database/prisma.service';

const TABLE_NAME = 'postOutbox';
const TOPIC_MAP: Record<string, string> = {
  'post.comment.created': 'post.comment.created',
  'contact.submitted': 'contact.submitted',
};

@Injectable()
export class PostOutboxCronService implements OnModuleInit {
  constructor(
    private readonly outboxRelay: OutboxRelayService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.outboxRelay.init(this.prisma, {
      clientId: 'post-service-outbox',
      tableName: TABLE_NAME,
      topicMap: TOPIC_MAP,
    });
  }

  @Cron('*/5 * * * * *')
  async relayOutbox() {
    await this.outboxRelay.relay(TABLE_NAME, TOPIC_MAP);
  }
}

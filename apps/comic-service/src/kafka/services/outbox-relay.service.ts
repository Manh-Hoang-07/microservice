import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRelayService } from '@package/common';
import { PrismaService } from '../../database/prisma.service';

const TABLE_NAME = 'comic_outbox';
const TOPIC_MAP: Record<string, string> = {
  'comic.chapter.published': 'comic.chapter.published',
  'comic.comment.created': 'comic.comment.created',
  'user.followed.comic': 'user.followed.comic',
  'user.unfollowed.comic': 'user.unfollowed.comic',
};

@Injectable()
export class OutboxCronService implements OnModuleInit {
  constructor(
    private readonly outboxRelay: OutboxRelayService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.outboxRelay.init(this.prisma, {
      clientId: 'comic-service-outbox',
      tableName: TABLE_NAME,
      topicMap: TOPIC_MAP,
    });
  }

  // 30s instead of 5s — see comment in auth-service outbox cron.
  @Cron('*/30 * * * * *')
  async relayOutbox() {
    await this.outboxRelay.relay(TABLE_NAME, TOPIC_MAP);
  }
}

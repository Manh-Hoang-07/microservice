import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxRelayService } from '@package/common';
import { PrismaService } from '../../database/prisma.service';

const TABLE_NAME = 'comicOutbox';
const TOPIC_MAP: Record<string, string> = {
  'comic.chapter.published': 'comic.chapter.published',
  'comic.comment.created': 'comic.comment.created',
  'user.followed.comic': 'user.followed.comic',
  'user.unfollowed.comic': 'user.unfollowed.comic',
};

@Injectable()
export class ComicOutboxCronService implements OnModuleInit {
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

  @Cron('*/5 * * * * *')
  async relayOutbox() {
    await this.outboxRelay.relay(TABLE_NAME, TOPIC_MAP);
  }
}

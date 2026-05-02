import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload, KafkaConfig } from 'kafkajs';
import { KafkaHandler } from '../handlers/kafka-handler.interface';
import { ChapterPublishedHandler } from '../handlers/chapter-published.handler';
import { CommentCreatedHandler } from '../handlers/comment-created.handler';
import { UserFollowedHandler } from '../handlers/user-followed.handler';
import { UserUnfollowedHandler } from '../handlers/user-unfollowed.handler';
import { UserRegisteredHandler } from '../handlers/user-registered.handler';
import { PasswordResetHandler } from '../handlers/password-reset.handler';
import { ContactSubmittedHandler } from '../handlers/contact-submitted.handler';
import { PostCommentCreatedHandler } from '../handlers/post-comment-created.handler';
import { MailSendHandler } from '../handlers/mail-send.handler';

const MAX_PAYLOAD_BYTES = 256 * 1024;
const DEDUP_LRU_SIZE = 5_000;

/** Tiny in-memory LRU for at-least-once dedup. */
class LruSet {
  private readonly set = new Set<string>();
  constructor(private readonly capacity: number) {}
  has(key: string): boolean {
    return this.set.has(key);
  }
  add(key: string): void {
    if (this.set.has(key)) {
      this.set.delete(key);
      this.set.add(key);
      return;
    }
    if (this.set.size >= this.capacity) {
      const oldest = this.set.values().next().value;
      if (oldest !== undefined) this.set.delete(oldest);
    }
    this.set.add(key);
  }
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private consumer: Consumer | null = null;
  private handlers!: Map<string, KafkaHandler>;
  private readonly seen = new LruSet(DEDUP_LRU_SIZE);

  constructor(
    private readonly config: ConfigService,
    private readonly chapterPublished: ChapterPublishedHandler,
    private readonly commentCreated: CommentCreatedHandler,
    private readonly userFollowed: UserFollowedHandler,
    private readonly userUnfollowed: UserUnfollowedHandler,
    private readonly userRegistered: UserRegisteredHandler,
    private readonly passwordReset: PasswordResetHandler,
    private readonly contactSubmitted: ContactSubmittedHandler,
    private readonly postCommentCreated: PostCommentCreatedHandler,
    private readonly mailSend: MailSendHandler,
  ) {}

  async onModuleInit() {
    this.handlers = new Map<string, KafkaHandler>([
      ['comic.chapter.published', this.chapterPublished],
      ['comic.comment.created', this.commentCreated],
      ['user.followed.comic', this.userFollowed],
      ['user.unfollowed.comic', this.userUnfollowed],
      ['user.registered', this.userRegistered],
      ['user.password.reset', this.passwordReset],
      ['contact.submitted', this.contactSubmitted],
      ['post.comment.created', this.postCommentCreated],
      ['mail.send', this.mailSend],
    ]);

    const brokers = this.config.get<string[]>('kafka.brokers');
    const groupId = this.config.get<string>('kafka.groupId');
    if (!brokers?.length) {
      this.logger.warn('No Kafka brokers configured — consumer disabled');
      return;
    }

    const kafkaConfig: KafkaConfig = {
      clientId: 'notification-service',
      brokers,
      retry: { retries: 8, initialRetryTime: 300, maxRetryTime: 30_000 },
    };
    const kafka = new Kafka(kafkaConfig);
    this.consumer = kafka.consumer({
      groupId: groupId || 'notification-service',
      sessionTimeout: 30_000,
      heartbeatInterval: 3_000,
    });
    await this.consumer.connect();

    for (const topic of this.handlers.keys()) {
      await this.consumer.subscribe({ topic, fromBeginning: false });
    }

    await this.consumer.run({
      eachMessage: async (payload) => this.dispatch(payload),
    });
  }

  async onModuleDestroy() {
    await this.consumer?.disconnect().catch(() => undefined);
  }

  /**
   * Dispatch a single Kafka message.
   *
   * - Hard size cap on the JSON value to bound memory.
   * - Malformed JSON: poison message → log + SKIP (retrying blocks the partition).
   * - Handler errors: log AND RETHROW so kafkajs does not commit the offset.
   *   The previous `try/catch {}` silently committed on every failure,
   *   permanently dropping events.
   * - In-memory LRU keyed on (topic, partition, offset) suppresses immediate
   *   redelivery within a single replica. For cross-replica dedup, downstream
   *   idempotency keys (Bull job id from event_id) are still required.
   */
  private async dispatch({ topic, partition, message }: EachMessagePayload): Promise<void> {
    if (!message.value) return;
    if (message.value.length > MAX_PAYLOAD_BYTES) {
      this.logger.warn(`Skipping oversize message on ${topic} (${message.value.length}B)`);
      return;
    }

    const dedupKey = `${topic}:${partition}:${message.offset}`;
    if (this.seen.has(dedupKey)) return;

    const handler = this.handlers.get(topic);
    if (!handler) return;

    let payload: any;
    try {
      payload = JSON.parse(message.value.toString());
    } catch (err) {
      this.logger.warn(
        `Malformed JSON on ${topic} offset ${message.offset}: ${(err as Error).message}`,
      );
      return;
    }
    this.seen.add(dedupKey);

    try {
      await handler.handle(payload);
    } catch (err) {
      this.logger.error(
        `Handler ${topic} failed at offset ${message.offset}: ${(err as Error).message}`,
        (err as Error).stack,
      );
      throw err;
    }
  }
}

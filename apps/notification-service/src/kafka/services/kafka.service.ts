import { Injectable, Logger, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaJS } from '@confluentinc/kafka-javascript';
import { IdempotencyService } from '@package/common';

type Consumer = KafkaJS.Consumer;
type EachMessagePayload = KafkaJS.EachMessagePayload;
type Producer = KafkaJS.Producer;
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

// Max times a single message is retried before being shipped to the DLQ.
// kafkajs default `retry.retries` (8) controls broker-side retries; this
// counter governs handler-side retries within a single replica.
const MAX_HANDLER_ATTEMPTS = 5;
const DLQ_TOPIC_SUFFIX = '.dlq';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(KafkaService.name);
  private consumer: Consumer | null = null;
  private dlqProducer: Producer | null = null;
  private handlers!: Map<string, KafkaHandler>;
  private readonly seen = new LruSet(DEDUP_LRU_SIZE);
  private readonly attempts = new Map<string, number>();
  private inFlight = 0;
  private shuttingDown = false;

  constructor(
    private readonly config: ConfigService,
    private readonly idempotency: IdempotencyService,
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

    const kafka = new KafkaJS.Kafka({
      kafkaJS: {
        clientId: 'notification-service',
        brokers,
        retry: { retries: 8, initialRetryTime: 300, maxRetryTime: 30_000 },
      },
    });
    this.consumer = kafka.consumer({
      kafkaJS: {
        groupId: groupId || 'notification-service',
        sessionTimeout: 30_000,
        heartbeatInterval: 3_000,
        fromBeginning: false,
        allowAutoTopicCreation: true,
      },
    });
    await this.consumer!.connect();

    // Dedicated producer for DLQ messages.
    this.dlqProducer = kafka.producer();
    await this.dlqProducer!.connect();

    // Ensure topics exist before subscribing (librdkafka doesn't auto-create on subscribe)
    const admin = kafka.admin();
    await admin.connect();
    const topics = Array.from(this.handlers.keys());
    try {
      await admin.createTopics({ topics: topics.map((t) => ({ topic: t, numPartitions: 1, replicationFactor: 1 })) });
    } catch (err) {
      // Ignore "topic already exists" errors
      this.logger.debug(`Topic creation result: ${(err as Error)?.message || 'ok'}`);
    }
    await admin.disconnect();

    for (const topic of topics) {
      await this.consumer!.subscribe({ topic });
    }

    await this.consumer!.run({
      eachMessage: async (payload) => this.dispatch(payload),
    });
  }

  async onApplicationShutdown(signal?: string) {
    this.shuttingDown = true;
    this.logger.log(`Kafka consumer shutting down (signal=${signal ?? 'unknown'}, in-flight=${this.inFlight})`);
    if (!this.consumer) return;
    try {
      await this.consumer.stop();
    } catch (err) {
      this.logger.warn(`consumer.stop() failed: ${(err as Error).message}`);
    }
    const drainStart = Date.now();
    while (this.inFlight > 0 && Date.now() - drainStart < 25_000) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (this.inFlight > 0) {
      this.logger.warn(`shutdown timeout: ${this.inFlight} in-flight messages will not commit`);
    }
    try {
      await this.consumer.disconnect();
    } catch (err) {
      this.logger.warn(`consumer.disconnect() failed: ${(err as Error).message}`);
    }
    this.consumer = null;

    if (this.dlqProducer) {
      try { await this.dlqProducer.disconnect(); } catch { /* swallow */ }
      this.dlqProducer = null;
    }
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
    if (this.shuttingDown) return;
    if (!message.value) return;
    if (message.value.length > MAX_PAYLOAD_BYTES) {
      this.logger.warn(`Skipping oversize message on ${topic} (${message.value.length}B)`);
      return;
    }

    // In-process LRU first (cheap fast-path for the same replica re-receiving
    // a message during a brief redelivery).
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

    // Cross-replica dedup: claim ownership of the event by id (or fall back
    // to the topic+offset fingerprint when payload has no business id). The
    // first replica to call SET NX EX wins; siblings short-circuit. Falls
    // open when Redis is down so we don't stall message processing.
    const eventId =
      payload?.id?.toString() ||
      payload?.event_id?.toString() ||
      `${partition}:${message.offset}`;
    const claimed = await this.idempotency.claim(topic, eventId);
    if (!claimed) {
      this.logger.debug(`Skip ${topic}:${eventId} — already claimed by peer`);
      return;
    }

    this.inFlight++;
    try {
      await handler.handle(payload);
      this.attempts.delete(dedupKey);
    } catch (err) {
      const attempt = (this.attempts.get(dedupKey) ?? 0) + 1;
      this.attempts.set(dedupKey, attempt);
      this.logger.error(
        `Handler ${topic} failed at offset ${message.offset} (attempt ${attempt}/${MAX_HANDLER_ATTEMPTS}): ${(err as Error).message}`,
        (err as Error).stack,
      );

      if (attempt >= MAX_HANDLER_ATTEMPTS) {
        await this.shipToDlq(topic, partition, message, payload, err as Error);
        this.attempts.delete(dedupKey);
        // Returning normally lets kafkajs commit the offset so we don't
        // re-process this poison pill on next rebalance.
        return;
      }

      // Re-throw so kafkajs withholds the commit and re-delivers the message.
      throw err;
    } finally {
      this.inFlight--;
    }
  }

  /**
   * Send a permanently-failed message to <topic>.dlq with diagnostic envelope.
   * Logged-and-swallowed: if the DLQ publish itself fails we'd rather drop the
   * poison pill than block the partition forever.
   */
  private async shipToDlq(
    topic: string,
    partition: number,
    message: EachMessagePayload['message'],
    payload: any,
    err: Error,
  ): Promise<void> {
    const dlqTopic = `${topic}${DLQ_TOPIC_SUFFIX}`;
    if (!this.dlqProducer) {
      this.logger.error(`DLQ producer not initialised — DROPPING poison message ${topic}@${message.offset}`);
      return;
    }
    const envelope = {
      original_topic: topic,
      partition,
      offset: message.offset,
      original_key: message.key?.toString(),
      original_payload: payload,
      error: { name: err.name, message: err.message, stack: err.stack },
      failed_at: new Date().toISOString(),
    };
    try {
      await this.dlqProducer.send({
        topic: dlqTopic,
        messages: [{ key: message.key ?? undefined, value: JSON.stringify(envelope) }],
      });
      this.logger.warn(`Poison message ${topic}@${message.offset} → ${dlqTopic}`);
    } catch (dlqErr) {
      this.logger.error(
        `DLQ publish to ${dlqTopic} failed — dropping ${topic}@${message.offset}: ${(dlqErr as Error).message}`,
      );
    }
  }
}

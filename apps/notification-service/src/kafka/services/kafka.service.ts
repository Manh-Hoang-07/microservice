import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
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

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer | null = null;
  private handlers!: Map<string, KafkaHandler>;

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
    if (!brokers?.length) return;

    const kafka = new Kafka({ clientId: 'notification-service', brokers });
    this.consumer = kafka.consumer({ groupId: groupId || 'notification-service' });
    await this.consumer.connect();

    for (const topic of this.handlers.keys()) {
      await this.consumer.subscribe({ topic, fromBeginning: false });
    }

    await this.consumer.run({
      eachMessage: async (payload) => this.dispatch(payload),
    });
  }

  async onModuleDestroy() {
    await this.consumer?.disconnect();
  }

  private async dispatch({ topic, message }: EachMessagePayload) {
    if (!message.value) return;
    const handler = this.handlers.get(topic);
    if (!handler) return;
    try {
      await handler.handle(JSON.parse(message.value.toString()));
    } catch {
      // silently skip malformed messages
    }
  }
}

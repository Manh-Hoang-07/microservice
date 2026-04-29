import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { AdminNotificationService } from '../../notification/admin/services/notification.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FollowersProjectionRepository } from '../repositories/followers-projection.repository';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private consumer: Consumer | null = null;

  constructor(
    private readonly config: ConfigService,
    private readonly followersProjectionRepo: FollowersProjectionRepository,
    private readonly notifService: AdminNotificationService,
    @InjectQueue('notification') private readonly notifQueue: Queue,
  ) {}

  async onModuleInit() {
    const brokers = this.config.get<string[]>('kafka.brokers');
    const groupId = this.config.get<string>('kafka.groupId');

    if (!brokers?.length) {
      this.logger.warn('KAFKA_BROKERS not set — Kafka consumer disabled');
      return;
    }

    try {
      const kafka = new Kafka({
        clientId: 'notification-service',
        brokers,
      });

      this.consumer = kafka.consumer({ groupId: groupId || 'notification-service' });
      await this.consumer.connect();

      const topics = [
        'comic.chapter.published',
        'comic.comment.created',
        'user.followed.comic',
        'user.unfollowed.comic',
        'user.registered',
        'user.password.reset',
        'contact.submitted',
        'post.comment.created',
      ];

      for (const topic of topics) {
        await this.consumer.subscribe({ topic, fromBeginning: false });
      }

      await this.consumer.run({
        eachMessage: async (payload) => {
          await this.handleMessage(payload);
        },
      });

      this.logger.log(`Kafka consumer started, subscribed to: ${topics.join(', ')}`);
    } catch (err) {
      this.logger.error('Failed to start Kafka consumer', err);
    }
  }

  async onModuleDestroy() {
    if (this.consumer) {
      await this.consumer.disconnect();
      this.logger.log('Kafka consumer disconnected');
    }
  }

  private async handleMessage({ topic, message }: EachMessagePayload) {
    if (!message.value) return;

    try {
      const payload = JSON.parse(message.value.toString());
      this.logger.log(`Received event: ${topic}`);

      switch (topic) {
        case 'comic.chapter.published':
          await this.handleChapterPublished(payload);
          break;
        case 'comic.comment.created':
          await this.handleCommentCreated(payload);
          break;
        case 'user.followed.comic':
          await this.handleUserFollowed(payload);
          break;
        case 'user.unfollowed.comic':
          await this.handleUserUnfollowed(payload);
          break;
        case 'user.registered':
          await this.handleUserRegistered(payload);
          break;
        case 'user.password.reset':
          await this.handlePasswordReset(payload);
          break;
        case 'contact.submitted':
          await this.handleContactSubmitted(payload);
          break;
        case 'post.comment.created':
          await this.handlePostCommentCreated(payload);
          break;
        default:
          this.logger.warn(`Unhandled topic: ${topic}`);
      }
    } catch (err) {
      this.logger.error(`Error processing message from ${topic}`, err);
    }
  }

  private async handleChapterPublished(payload: any) {
    const { comic_id, comic_title, comic_slug, chapter_label } = payload;

    const followers = await this.followersProjectionRepo.findByComicId(BigInt(comic_id));
    if (!followers.length) return;

    const batchSize = 500;
    for (let i = 0; i < followers.length; i += batchSize) {
      const batch = followers.slice(i, i + batchSize);
      await this.notifService.createMany(
        batch.map((f) => ({
          user_id: f.user_id,
          title: `${comic_title} - ${chapter_label}`,
          message: `Chương mới đã được cập nhật: ${chapter_label}`,
          type: 'info',
          data: { comic_id, comic_slug, chapter_label },
        })),
      );
    }

    this.logger.log(`Notified ${followers.length} followers for comic ${comic_id}`);
  }

  private async handleCommentCreated(payload: any) {
    const { parent_comment_user_id, user_id, comic_id } = payload;
    if (!parent_comment_user_id || parent_comment_user_id === user_id) return;

    await this.notifService.create({
      user_id: parent_comment_user_id,
      title: 'Có người trả lời bình luận của bạn',
      message: 'Ai đó đã trả lời bình luận của bạn',
      type: 'info',
      data: { comic_id, comment_id: payload.comment_id },
    });
  }

  private async handleUserFollowed(payload: any) {
    const { user_id, comic_id, followed_at } = payload;
    await this.followersProjectionRepo.upsert(
      BigInt(user_id),
      BigInt(comic_id),
      followed_at ? new Date(followed_at) : new Date(),
    );
  }

  private async handleUserUnfollowed(payload: any) {
    const { user_id, comic_id } = payload;
    await this.followersProjectionRepo.deleteMany(BigInt(user_id), BigInt(comic_id));
  }

  private async handleUserRegistered(payload: any) {
    const { email, username } = payload;
    if (!email) return;

    await this.notifQueue.add('send_email_template', {
      templateCode: 'registration_success',
      options: {
        to: email,
        variables: { name: username || email, username, email },
      },
    }, { attempts: 3, backoff: 5000, removeOnComplete: true });
  }

  private async handlePasswordReset(payload: any) {
    const { email, username } = payload;
    if (!email) return;

    await this.notifQueue.add('send_email_template', {
      templateCode: 'reset_password_success',
      options: {
        to: email,
        variables: {
          name: username || email,
          time: new Date().toLocaleString('vi-VN'),
        },
      },
    }, { attempts: 3, backoff: 5000, removeOnComplete: true });
  }

  private async handleContactSubmitted(payload: any) {
    await this.notifQueue.add('send_email_template', {
      templateCode: 'contact_submitted',
      options: {
        to: payload.admin_email || 'admin@comic-platform.com',
        variables: payload,
      },
    }, { attempts: 3, backoff: 5000, removeOnComplete: true });
  }

  private async handlePostCommentCreated(payload: any) {
    const { parent_comment_user_id, user_id, post_id } = payload;
    if (!parent_comment_user_id || parent_comment_user_id === user_id) return;

    await this.notifService.create({
      user_id: parent_comment_user_id,
      title: 'Có người trả lời bình luận bài viết của bạn',
      message: 'Ai đó đã trả lời bình luận của bạn trên bài viết',
      type: 'info',
      data: { post_id, comment_id: payload.comment_id },
    });
  }
}

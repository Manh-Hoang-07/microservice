"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var KafkaConsumerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const kafkajs_1 = require("kafkajs");
const prisma_service_1 = require("../../database/prisma.service");
const notification_service_1 = require("../../notification/admin/services/notification.service");
const bull_1 = require("@nestjs/bull");
let KafkaConsumerService = KafkaConsumerService_1 = class KafkaConsumerService {
    constructor(config, prisma, notifService, notifQueue) {
        this.config = config;
        this.prisma = prisma;
        this.notifService = notifService;
        this.notifQueue = notifQueue;
        this.logger = new common_1.Logger(KafkaConsumerService_1.name);
        this.consumer = null;
    }
    async onModuleInit() {
        const brokers = this.config.get('kafka.brokers');
        const groupId = this.config.get('kafka.groupId');
        if (!brokers?.length) {
            this.logger.warn('KAFKA_BROKERS not set — Kafka consumer disabled');
            return;
        }
        try {
            const kafka = new kafkajs_1.Kafka({
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
        }
        catch (err) {
            this.logger.error('Failed to start Kafka consumer', err);
        }
    }
    async onModuleDestroy() {
        if (this.consumer) {
            await this.consumer.disconnect();
            this.logger.log('Kafka consumer disconnected');
        }
    }
    async handleMessage({ topic, message }) {
        if (!message.value)
            return;
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
        }
        catch (err) {
            this.logger.error(`Error processing message from ${topic}`, err);
        }
    }
    async handleChapterPublished(payload) {
        const { comic_id, comic_title, comic_slug, chapter_label } = payload;
        const followers = await this.prisma.comicFollowersProjection.findMany({
            where: { comic_id: BigInt(comic_id) },
            select: { user_id: true },
        });
        if (!followers.length)
            return;
        const batchSize = 500;
        for (let i = 0; i < followers.length; i += batchSize) {
            const batch = followers.slice(i, i + batchSize);
            await this.notifService.createMany(batch.map((f) => ({
                user_id: f.user_id,
                title: `${comic_title} - ${chapter_label}`,
                message: `Chương mới đã được cập nhật: ${chapter_label}`,
                type: 'info',
                data: { comic_id, comic_slug, chapter_label },
            })));
        }
        this.logger.log(`Notified ${followers.length} followers for comic ${comic_id}`);
    }
    async handleCommentCreated(payload) {
        const { parent_comment_user_id, user_id, comic_id } = payload;
        if (!parent_comment_user_id || parent_comment_user_id === user_id)
            return;
        await this.notifService.create({
            user_id: parent_comment_user_id,
            title: 'Có người trả lời bình luận của bạn',
            message: 'Ai đó đã trả lời bình luận của bạn',
            type: 'info',
            data: { comic_id, comment_id: payload.comment_id },
        });
    }
    async handleUserFollowed(payload) {
        const { user_id, comic_id, followed_at } = payload;
        await this.prisma.comicFollowersProjection.upsert({
            where: {
                user_id_comic_id: { user_id: BigInt(user_id), comic_id: BigInt(comic_id) },
            },
            create: {
                user_id: BigInt(user_id),
                comic_id: BigInt(comic_id),
                followed_at: followed_at ? new Date(followed_at) : new Date(),
            },
            update: {},
        });
    }
    async handleUserUnfollowed(payload) {
        const { user_id, comic_id } = payload;
        await this.prisma.comicFollowersProjection.deleteMany({
            where: { user_id: BigInt(user_id), comic_id: BigInt(comic_id) },
        });
    }
    async handleUserRegistered(payload) {
        const { email, username } = payload;
        if (!email)
            return;
        await this.notifQueue.add('send_email_template', {
            templateCode: 'registration_success',
            options: {
                to: email,
                variables: { name: username || email, username, email },
            },
        }, {
            attempts: 3,
            backoff: 5000,
            removeOnComplete: true,
        });
    }
    async handlePasswordReset(payload) {
        const { email, username } = payload;
        if (!email)
            return;
        await this.notifQueue.add('send_email_template', {
            templateCode: 'reset_password_success',
            options: {
                to: email,
                variables: {
                    name: username || email,
                    time: new Date().toLocaleString('vi-VN'),
                },
            },
        }, {
            attempts: 3,
            backoff: 5000,
            removeOnComplete: true,
        });
    }
    async handleContactSubmitted(payload) {
        await this.notifQueue.add('send_email_template', {
            templateCode: 'contact_submitted',
            options: {
                to: payload.admin_email || 'admin@comic-platform.com',
                variables: payload,
            },
        }, {
            attempts: 3,
            backoff: 5000,
            removeOnComplete: true,
        });
    }
    async handlePostCommentCreated(payload) {
        const { parent_comment_user_id, user_id, post_id } = payload;
        if (!parent_comment_user_id || parent_comment_user_id === user_id)
            return;
        await this.notifService.create({
            user_id: parent_comment_user_id,
            title: 'Có người trả lời bình luận bài viết của bạn',
            message: 'Ai đó đã trả lời bình luận của bạn trên bài viết',
            type: 'info',
            data: { post_id, comment_id: payload.comment_id },
        });
    }
};
exports.KafkaConsumerService = KafkaConsumerService;
exports.KafkaConsumerService = KafkaConsumerService = KafkaConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, bull_1.InjectQueue)('notification')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        notification_service_1.AdminNotificationService, Object])
], KafkaConsumerService);
//# sourceMappingURL=kafka-consumer.service.js.map
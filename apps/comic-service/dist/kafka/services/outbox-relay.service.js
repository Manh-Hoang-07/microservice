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
var OutboxRelayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxRelayService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const kafkajs_1 = require("kafkajs");
let OutboxRelayService = OutboxRelayService_1 = class OutboxRelayService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.logger = new common_1.Logger(OutboxRelayService_1.name);
        this.producer = null;
        if (config.get('kafka.enabled')) {
            const kafka = new kafkajs_1.Kafka({
                clientId: 'comic-service-outbox',
                brokers: config.get('kafka.brokers') || ['localhost:9093'],
            });
            this.producer = kafka.producer();
            this.producer.connect().catch((err) => {
                this.logger.error('Kafka producer connect failed', err);
                this.producer = null;
            });
        }
    }
    async relayOutbox() {
        if (!this.producer)
            return;
        try {
            const events = await this.prisma.comicOutbox.findMany({
                where: { published: false },
                take: 100,
                orderBy: { created_at: 'asc' },
            });
            if (!events.length)
                return;
            for (const event of events) {
                const topic = this.getTopicForEvent(event.event_type);
                if (!topic)
                    continue;
                try {
                    const payload = event.payload;
                    const key = payload?.comic_id?.toString()
                        || payload?.user_id?.toString()
                        || String(event.id);
                    await this.producer.send({
                        topic,
                        messages: [
                            {
                                key,
                                value: JSON.stringify(event.payload),
                            },
                        ],
                    });
                    await this.prisma.comicOutbox.update({
                        where: { id: event.id },
                        data: { published: true },
                    });
                }
                catch (err) {
                    this.logger.error(`Failed to publish event ${event.id}`, err);
                }
            }
        }
        catch (err) {
            this.logger.error('Outbox relay error', err);
        }
    }
    getTopicForEvent(eventType) {
        const topicMap = {
            'comic.chapter.published': 'comic.chapter.published',
            'comic.comment.created': 'comic.comment.created',
            'user.followed.comic': 'user.followed.comic',
            'user.unfollowed.comic': 'user.unfollowed.comic',
        };
        return topicMap[eventType] ?? null;
    }
};
exports.OutboxRelayService = OutboxRelayService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutboxRelayService.prototype, "relayOutbox", null);
exports.OutboxRelayService = OutboxRelayService = OutboxRelayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], OutboxRelayService);
//# sourceMappingURL=outbox-relay.service.js.map
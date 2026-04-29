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
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const kafkajs_1 = require("kafkajs");
let OutboxRelayService = OutboxRelayService_1 = class OutboxRelayService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.logger = new common_1.Logger(OutboxRelayService_1.name);
        this.producer = null;
        this.intervalRef = null;
        if (config.get('kafka.enabled')) {
            const kafka = new kafkajs_1.Kafka({
                clientId: 'marketing-service-outbox',
                brokers: config.get('kafka.brokers') || ['localhost:9093'],
            });
            this.producer = kafka.producer();
            this.producer.connect().then(() => {
                this.logger.log('Kafka producer connected');
                this.startPolling();
            }).catch((err) => {
                this.logger.error('Kafka producer connect failed', err);
                this.producer = null;
            });
        }
    }
    startPolling() {
        this.intervalRef = setInterval(() => {
            this.relayOutbox().catch((err) => this.logger.error('Outbox relay error', err));
        }, 5000);
    }
    async relayOutbox() {
        if (!this.producer)
            return;
        try {
            const events = await this.prisma.marketingOutbox.findMany({
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
                    const key = payload?.contact_id?.toString()
                        || payload?.email?.toString()
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
                    await this.prisma.marketingOutbox.update({
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
            'contact.submitted': 'contact.submitted',
        };
        return topicMap[eventType] ?? null;
    }
};
exports.OutboxRelayService = OutboxRelayService;
exports.OutboxRelayService = OutboxRelayService = OutboxRelayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], OutboxRelayService);
//# sourceMappingURL=outbox-relay.service.js.map
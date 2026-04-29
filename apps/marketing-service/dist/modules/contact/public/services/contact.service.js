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
var PublicContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicContactService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../../database/prisma.service");
let PublicContactService = PublicContactService_1 = class PublicContactService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.logger = new common_1.Logger(PublicContactService_1.name);
    }
    async create(dto) {
        const contact = await this.prisma.contact.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
            },
        });
        const kafkaEnabled = this.config.get('kafka.enabled');
        if (kafkaEnabled) {
            try {
                await this.prisma.marketingOutbox.create({
                    data: {
                        event_type: 'contact.submitted',
                        payload: {
                            contact_id: Number(contact.id),
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            message: contact.message,
                            created_at: contact.created_at.toISOString(),
                        },
                    },
                });
            }
            catch (err) {
                this.logger.error('Failed to write contact.submitted to outbox', err);
            }
        }
        return {
            success: true,
            message: 'Contact submitted successfully',
            data: {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                created_at: contact.created_at,
            },
        };
    }
};
exports.PublicContactService = PublicContactService;
exports.PublicContactService = PublicContactService = PublicContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PublicContactService);
//# sourceMappingURL=contact.service.js.map
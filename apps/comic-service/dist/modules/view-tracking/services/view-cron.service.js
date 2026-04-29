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
var ViewCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../database/prisma.service");
const redis_1 = require("@package/redis");
let ViewCronService = ViewCronService_1 = class ViewCronService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
        this.logger = new common_1.Logger(ViewCronService_1.name);
    }
    async flushViewBuffer() {
        if (!this.redis.isEnabled())
            return;
        const locked = await this.redis.setnx('comic:views:buffer:lock', '1', 60);
        if (!locked)
            return;
        try {
            const buffer = await this.redis.hgetall('comic:views:buffer');
            const entries = Object.entries(buffer);
            if (!entries.length)
                return;
            this.logger.log(`Flushing ${entries.length} comic view counts`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            for (const [comicIdStr, countStr] of entries) {
                const comicId = BigInt(comicIdStr);
                const count = parseInt(countStr, 10);
                if (isNaN(count) || count <= 0)
                    continue;
                try {
                    await this.prisma.comicStats.upsert({
                        where: { comic_id: comicId },
                        create: { comic_id: comicId, view_count: BigInt(count) },
                        update: { view_count: { increment: BigInt(count) } },
                    });
                    await this.prisma.comicDailyStats.upsert({
                        where: { comic_id_stat_date: { comic_id: comicId, stat_date: today } },
                        create: { comic_id: comicId, stat_date: today, view_count: BigInt(count) },
                        update: { view_count: { increment: BigInt(count) } },
                    });
                    await this.redis.hdel('comic:views:buffer', comicIdStr);
                }
                catch (err) {
                    this.logger.error(`Failed to flush views for comic ${comicIdStr}`, err);
                }
            }
        }
        catch (err) {
            this.logger.error('View buffer flush error', err);
        }
        finally {
            await this.redis.del('comic:views:buffer:lock');
        }
    }
};
exports.ViewCronService = ViewCronService;
__decorate([
    (0, schedule_1.Cron)('0 */5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ViewCronService.prototype, "flushViewBuffer", null);
exports.ViewCronService = ViewCronService = ViewCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_1.RedisService])
], ViewCronService);
//# sourceMappingURL=view-cron.service.js.map
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '@package/redis';
export declare class ViewCronService {
    private readonly prisma;
    private readonly redis;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService);
    flushViewBuffer(): Promise<void>;
}

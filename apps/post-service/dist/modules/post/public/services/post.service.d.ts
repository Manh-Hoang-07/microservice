import { PrismaService } from '../../../../database/prisma.service';
import { RedisService } from '@package/redis';
export declare class PublicPostService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<any>;
    private transform;
}

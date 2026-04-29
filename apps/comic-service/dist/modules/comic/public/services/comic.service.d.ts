import { PrismaService } from '../../../../database/prisma.service';
import { RedisService } from '@package/redis';
export declare class PublicComicService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<any>;
    getChaptersBySlug(slug: string, options?: any): Promise<{
        data: {
            id: bigint;
            title: string;
            status: string;
            created_at: Date;
            updated_at: Date;
            comic_id: bigint;
            chapter_index: number;
            chapter_label: string | null;
            view_count: bigint;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    private transform;
}

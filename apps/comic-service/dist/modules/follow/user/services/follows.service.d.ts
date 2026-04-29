import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
export declare class UserFollowService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    getList(userId: bigint, query: any): Promise<{
        data: ({
            comic: {
                id: bigint;
                slug: string;
                title: string;
                cover_image: string | null;
                stats: {
                    updated_at: Date;
                    comic_id: bigint;
                    view_count: bigint;
                    follow_count: bigint;
                    rating_count: bigint;
                    rating_sum: bigint;
                } | null;
            };
        } & {
            id: bigint;
            created_at: Date;
            comic_id: bigint;
            user_id: bigint;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    follow(userId: bigint, comicId: bigint): Promise<{
        id: bigint;
        created_at: Date;
        comic_id: bigint;
        user_id: bigint;
    }>;
    unfollow(userId: bigint, comicId: bigint): Promise<{
        success: boolean;
    }>;
    private syncFollowCount;
}

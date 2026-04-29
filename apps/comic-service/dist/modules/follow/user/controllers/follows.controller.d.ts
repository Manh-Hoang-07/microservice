import { UserFollowService } from '../services/follows.service';
export declare class UserFollowController {
    private readonly followService;
    constructor(followService: UserFollowService);
    getList(req: any, query: any): Promise<{
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
    follow(req: any, id: string): Promise<{
        id: bigint;
        created_at: Date;
        comic_id: bigint;
        user_id: bigint;
    }>;
    unfollow(req: any, id: string): Promise<{
        success: boolean;
    }>;
}

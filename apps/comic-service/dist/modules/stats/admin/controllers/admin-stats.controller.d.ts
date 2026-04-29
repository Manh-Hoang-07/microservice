import { AdminStatsService } from '../services/admin-stats.service';
export declare class AdminStatsController {
    private readonly statsService;
    constructor(statsService: AdminStatsService);
    getDashboard(): Promise<{
        total_comics: number;
        total_views: number | bigint;
        total_follows: number | bigint;
        top_comics: ({
            stats: {
                updated_at: Date;
                comic_id: bigint;
                view_count: bigint;
                follow_count: bigint;
                rating_count: bigint;
                rating_sum: bigint;
            } | null;
        } & {
            id: bigint;
            slug: string;
            title: string;
            description: string | null;
            cover_image: string | null;
            author: string | null;
            status: string;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            created_at: Date;
            updated_at: Date;
            last_chapter_id: bigint | null;
            last_chapter_updated_at: Date | null;
            is_featured: boolean;
            group_id: bigint | null;
        })[];
    }>;
    getTopComics(query: any): Promise<{
        data: ({
            stats: {
                updated_at: Date;
                comic_id: bigint;
                view_count: bigint;
                follow_count: bigint;
                rating_count: bigint;
                rating_sum: bigint;
            } | null;
        } & {
            id: bigint;
            slug: string;
            title: string;
            description: string | null;
            cover_image: string | null;
            author: string | null;
            status: string;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            created_at: Date;
            updated_at: Date;
            last_chapter_id: bigint | null;
            last_chapter_updated_at: Date | null;
            is_featured: boolean;
            group_id: bigint | null;
        })[];
    }>;
}

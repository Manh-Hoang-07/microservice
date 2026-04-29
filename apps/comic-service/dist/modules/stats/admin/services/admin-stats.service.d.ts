import { PrismaService } from '../../../../database/prisma.service';
export declare class AdminStatsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            description: string | null;
            id: bigint;
            created_at: Date;
            title: string;
            slug: string;
            cover_image: string | null;
            author: string | null;
            status: string;
            is_featured: boolean;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            updated_at: Date;
            last_chapter_id: bigint | null;
            last_chapter_updated_at: Date | null;
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
            description: string | null;
            id: bigint;
            created_at: Date;
            title: string;
            slug: string;
            cover_image: string | null;
            author: string | null;
            status: string;
            is_featured: boolean;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            updated_at: Date;
            last_chapter_id: bigint | null;
            last_chapter_updated_at: Date | null;
            group_id: bigint | null;
        })[];
    }>;
}

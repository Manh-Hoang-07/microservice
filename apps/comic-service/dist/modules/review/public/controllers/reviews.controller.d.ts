import { PublicReviewService } from '../services/reviews.service';
export declare class PublicReviewController {
    private readonly reviewService;
    constructor(reviewService: PublicReviewService);
    getList(query: any): Promise<{
        data: {
            id: bigint;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            created_at: Date;
            updated_at: Date;
            comic_id: bigint;
            user_id: bigint;
            rating: number;
            content: string | null;
        }[];
        meta: import("@package/common").PaginationMeta;
        stats: {
            average_rating: number;
            total_reviews: number;
        };
    }>;
}

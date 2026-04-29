import { UserReviewService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
export declare class UserReviewController {
    private readonly reviewService;
    constructor(reviewService: UserReviewService);
    createOrUpdate(req: any, dto: CreateReviewDto): Promise<{
        id: bigint;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        rating: number;
        content: string | null;
    }>;
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
}

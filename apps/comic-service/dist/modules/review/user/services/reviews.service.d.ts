import { PrismaService } from '../../../../database/prisma.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
export declare class UserReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(userId: bigint, dto: CreateReviewDto): Promise<{
        id: bigint;
        created_at: Date;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        content: string | null;
        rating: number;
    }>;
    delete(userId: bigint, id: bigint): Promise<{
        success: boolean;
    }>;
    private syncRatingStats;
}

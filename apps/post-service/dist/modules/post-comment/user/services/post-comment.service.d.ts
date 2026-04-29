import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostCommentDto } from '../dtos/create-post-comment.dto';
export declare class UserPostCommentService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(userId: bigint, dto: CreatePostCommentDto): Promise<{
        id: bigint;
        created_at: Date;
        content: string;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        post_id: bigint;
        parent_id: bigint | null;
        user_id: bigint | null;
        guest_name: string | null;
        guest_email: string | null;
    }>;
    update(userId: bigint, id: bigint, content: string): Promise<{
        id: bigint;
        created_at: Date;
        content: string;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        post_id: bigint;
        parent_id: bigint | null;
        user_id: bigint | null;
        guest_name: string | null;
        guest_email: string | null;
    }>;
    delete(userId: bigint, id: bigint): Promise<{
        success: boolean;
    }>;
}

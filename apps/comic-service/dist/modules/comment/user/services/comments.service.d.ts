import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
export declare class UserCommentService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(userId: bigint, dto: CreateCommentDto): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        comic_id: bigint;
        chapter_id: bigint | null;
        user_id: bigint;
        parent_id: bigint | null;
        content: string;
    }>;
    update(userId: bigint, id: bigint, content: string): Promise<{
        id: bigint;
        created_at: Date;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        comic_id: bigint;
        chapter_id: bigint | null;
        user_id: bigint;
        parent_id: bigint | null;
        content: string;
    }>;
    delete(userId: bigint, id: bigint): Promise<{
        success: boolean;
    }>;
}

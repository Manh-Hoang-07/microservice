import { UserCommentService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
export declare class UserCommentController {
    private readonly commentService;
    constructor(commentService: UserCommentService);
    create(req: any, dto: CreateCommentDto): Promise<{
        id: bigint;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        chapter_id: bigint | null;
        content: string;
        parent_id: bigint | null;
    }>;
    update(req: any, id: string, body: {
        content: string;
    }): Promise<{
        id: bigint;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        chapter_id: bigint | null;
        content: string;
        parent_id: bigint | null;
    }>;
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
}

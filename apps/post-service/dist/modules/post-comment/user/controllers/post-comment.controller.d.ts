import { UserPostCommentService } from '../services/post-comment.service';
import { CreatePostCommentDto } from '../dtos/create-post-comment.dto';
export declare class UserPostCommentController {
    private readonly commentService;
    constructor(commentService: UserPostCommentService);
    create(req: any, dto: CreatePostCommentDto): Promise<{
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
    update(req: any, id: string, body: {
        content: string;
    }): Promise<{
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
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
}

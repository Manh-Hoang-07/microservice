import { AdminPostCommentService } from '../services/post-comment.service';
export declare class AdminPostCommentController {
    private readonly commentService;
    constructor(commentService: AdminPostCommentService);
    getList(query: any): Promise<{
        data: {
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
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    updateStatus(id: string, body: {
        status: string;
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
}

import { PublicPostCommentService } from '../services/post-comment.service';
export declare class PublicPostCommentController {
    private readonly commentService;
    constructor(commentService: PublicPostCommentService);
    getList(query: any): Promise<{
        data: ({
            replies: {
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
        } & {
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
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
}

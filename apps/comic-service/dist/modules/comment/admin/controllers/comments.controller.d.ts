import { AdminCommentService } from '../services/comments.service';
export declare class AdminCommentController {
    private readonly commentService;
    constructor(commentService: AdminCommentService);
    getList(query: any): Promise<{
        data: {
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
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    updateStatus(id: string, body: {
        status: string;
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
}

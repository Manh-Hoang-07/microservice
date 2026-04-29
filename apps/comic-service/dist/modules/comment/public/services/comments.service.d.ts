import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicCommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: ({
            replies: {
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
        } & {
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
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
}

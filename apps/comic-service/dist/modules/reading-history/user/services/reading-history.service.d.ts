import { PrismaService } from '../../../../database/prisma.service';
export declare class UserReadingHistoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(userId: bigint, query: any): Promise<{
        data: ({
            comic: {
                id: bigint;
                slug: string;
                title: string;
                cover_image: string | null;
            };
            chapter: {
                id: bigint;
                title: string;
                chapter_index: number;
                chapter_label: string | null;
            };
        } & {
            id: bigint;
            created_at: Date;
            updated_at: Date;
            comic_id: bigint;
            user_id: bigint;
            chapter_id: bigint;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    upsert(userId: bigint, comicId: bigint, chapterId: bigint): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        chapter_id: bigint;
    }>;
    clear(userId: bigint, comicId: bigint): Promise<{
        success: boolean;
    }>;
}

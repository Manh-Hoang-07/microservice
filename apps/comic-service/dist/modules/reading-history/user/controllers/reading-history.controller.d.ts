import { UserReadingHistoryService } from '../services/reading-history.service';
export declare class UserReadingHistoryController {
    private readonly historyService;
    constructor(historyService: UserReadingHistoryService);
    getList(req: any, query: any): Promise<{
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
    upsert(req: any, body: {
        comic_id: number;
        chapter_id: number;
    }): Promise<{
        id: bigint;
        created_at: Date;
        updated_at: Date;
        comic_id: bigint;
        user_id: bigint;
        chapter_id: bigint;
    }>;
    clear(req: any, comicId: string): Promise<{
        success: boolean;
    }>;
}

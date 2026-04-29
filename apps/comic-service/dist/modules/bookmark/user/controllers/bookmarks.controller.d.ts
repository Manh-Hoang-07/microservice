import { UserBookmarkService } from '../services/bookmarks.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
export declare class UserBookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: UserBookmarkService);
    getList(req: any, query: any): Promise<{
        data: ({
            chapter: {
                comic: {
                    id: bigint;
                    slug: string;
                    title: string;
                };
                id: bigint;
                title: string;
                chapter_index: number;
            };
        } & {
            id: bigint;
            created_at: Date;
            user_id: bigint;
            chapter_id: bigint;
            page_number: number;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    create(req: any, dto: CreateBookmarkDto): Promise<{
        id: bigint;
        created_at: Date;
        user_id: bigint;
        chapter_id: bigint;
        page_number: number;
    }>;
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
}

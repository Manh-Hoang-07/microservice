import { PublicComicService } from '../services/comic.service';
export declare class PublicComicController {
    private readonly comicsService;
    constructor(comicsService: PublicComicService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<any>;
    getChaptersBySlug(slug: string, query: any): Promise<{
        data: {
            id: bigint;
            title: string;
            status: string;
            created_at: Date;
            updated_at: Date;
            comic_id: bigint;
            chapter_index: number;
            chapter_label: string | null;
            view_count: bigint;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
}

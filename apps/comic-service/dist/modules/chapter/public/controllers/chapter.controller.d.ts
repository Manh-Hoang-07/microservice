import { PublicChapterService } from '../services/chapter.service';
export declare class PublicChapterController {
    private readonly chapterService;
    constructor(chapterService: PublicChapterService);
    getOne(id: string): Promise<{
        comic: {
            id: bigint;
            slug: string;
            title: string;
        };
        pages: {
            id: bigint;
            created_at: Date;
            chapter_id: bigint;
            page_number: number;
            image_url: string;
            width: number | null;
            height: number | null;
            file_size: bigint | null;
        }[];
    } & {
        id: bigint;
        title: string;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        group_id: bigint | null;
        comic_id: bigint;
        chapter_index: number;
        team_id: bigint | null;
        chapter_label: string | null;
        view_count: bigint;
    }>;
    getPages(id: string): Promise<{
        data: {
            id: bigint;
            created_at: Date;
            chapter_id: bigint;
            page_number: number;
            image_url: string;
            width: number | null;
            height: number | null;
            file_size: bigint | null;
        }[];
    }>;
    getNext(id: string): Promise<{
        id: bigint;
        title: string;
        chapter_index: number;
        chapter_label: string | null;
    } | null>;
    getPrev(id: string): Promise<{
        id: bigint;
        title: string;
        chapter_index: number;
        chapter_label: string | null;
    } | null>;
}

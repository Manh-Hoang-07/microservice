import { AdminChapterService } from '../services/chapter.service';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
export declare class AdminChapterController {
    private readonly chapterService;
    constructor(chapterService: AdminChapterService);
    getList(query: any): Promise<{
        data: ({
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
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getSimpleList(query: any): Promise<{
        data: {
            id: bigint;
            title: string;
            status: string;
            chapter_index: number;
            chapter_label: string | null;
        }[];
    }>;
    getOne(id: string): Promise<{
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
    create(dto: CreateChapterDto): Promise<{
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
    update(id: string, dto: UpdateChapterDto): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

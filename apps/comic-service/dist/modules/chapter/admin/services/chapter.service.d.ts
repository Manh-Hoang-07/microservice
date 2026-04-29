import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateChapterDto } from '../dtos/create-chapter.dto';
import { UpdateChapterDto } from '../dtos/update-chapter.dto';
export declare class AdminChapterService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
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
    getOne(id: bigint): Promise<{
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
    update(id: bigint, dto: UpdateChapterDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
    private handlePublish;
}

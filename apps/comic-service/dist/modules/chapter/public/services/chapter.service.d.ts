import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicChapterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOne(id: bigint): Promise<{
        comic: {
            id: bigint;
            title: string;
            slug: string;
        };
        pages: {
            id: bigint;
            created_at: Date;
            image_url: string;
            width: number | null;
            height: number | null;
            file_size: bigint | null;
            page_number: number;
            chapter_id: bigint;
        }[];
    } & {
        id: bigint;
        created_at: Date;
        title: string;
        status: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        comic_id: bigint;
        view_count: bigint;
        team_id: bigint | null;
        chapter_index: number;
        chapter_label: string | null;
    }>;
    getPages(id: bigint): Promise<{
        data: {
            id: bigint;
            created_at: Date;
            image_url: string;
            width: number | null;
            height: number | null;
            file_size: bigint | null;
            page_number: number;
            chapter_id: bigint;
        }[];
    }>;
    getNext(id: bigint): Promise<{
        id: bigint;
        title: string;
        chapter_index: number;
        chapter_label: string | null;
    } | null>;
    getPrev(id: bigint): Promise<{
        id: bigint;
        title: string;
        chapter_index: number;
        chapter_label: string | null;
    } | null>;
}

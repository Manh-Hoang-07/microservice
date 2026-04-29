import { PrismaService } from '../../../../database/prisma.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
export declare class UserBookmarkService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(userId: bigint, query: any): Promise<{
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
    create(userId: bigint, dto: CreateBookmarkDto): Promise<{
        id: bigint;
        created_at: Date;
        user_id: bigint;
        chapter_id: bigint;
        page_number: number;
    }>;
    delete(userId: bigint, id: bigint): Promise<{
        success: boolean;
    }>;
}

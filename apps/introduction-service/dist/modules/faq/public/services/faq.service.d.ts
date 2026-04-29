import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicFaqService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            view_count: number;
            question: string;
            answer: string;
            helpful_count: number;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        sort_order: number;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        view_count: number;
        question: string;
        answer: string;
        helpful_count: number;
    }>;
    incrementViewCount(id: bigint): Promise<{
        success: boolean;
        view_count: number;
    }>;
    incrementHelpfulCount(id: bigint): Promise<{
        success: boolean;
        helpful_count: number;
    }>;
}

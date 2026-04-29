import { PrismaService } from '../../../../database/prisma.service';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
export declare class AdminFaqService {
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
    create(dto: CreateFaqDto): Promise<{
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
    update(id: bigint, dto: UpdateFaqDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

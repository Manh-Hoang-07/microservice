import { AdminFaqService } from '../services/faq.service';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
export declare class AdminFaqController {
    private readonly faqService;
    constructor(faqService: AdminFaqService);
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
    getOne(id: string): Promise<{
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
    update(id: string, dto: UpdateFaqDto): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

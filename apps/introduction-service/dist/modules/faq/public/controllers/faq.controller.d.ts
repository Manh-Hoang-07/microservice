import { PublicFaqService } from '../services/faq.service';
export declare class PublicFaqController {
    private readonly faqService;
    constructor(faqService: PublicFaqService);
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
    incrementViewCount(id: string): Promise<{
        success: boolean;
        view_count: number;
    }>;
    incrementHelpfulCount(id: string): Promise<{
        success: boolean;
        helpful_count: number;
    }>;
}

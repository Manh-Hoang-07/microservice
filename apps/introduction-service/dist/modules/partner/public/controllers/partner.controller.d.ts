import { PublicPartnerService } from '../services/partner.service';
export declare class PublicPartnerController {
    private readonly partnerService;
    constructor(partnerService: PublicPartnerService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            description: string | null;
            name: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            logo: string | null;
            website: string | null;
            type: string | null;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: string): Promise<{
        sort_order: number;
        description: string | null;
        name: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        logo: string | null;
        website: string | null;
        type: string | null;
    }>;
}

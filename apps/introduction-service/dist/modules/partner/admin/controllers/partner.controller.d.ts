import { AdminPartnerService } from '../services/partner.service';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
export declare class AdminPartnerController {
    private readonly partnerService;
    constructor(partnerService: AdminPartnerService);
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
    create(dto: CreatePartnerDto): Promise<{
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
    update(id: string, dto: UpdatePartnerDto): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

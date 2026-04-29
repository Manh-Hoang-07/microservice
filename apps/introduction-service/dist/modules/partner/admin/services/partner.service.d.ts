import { PrismaService } from '../../../../database/prisma.service';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
export declare class AdminPartnerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getOne(id: bigint): Promise<{
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
    update(id: bigint, dto: UpdatePartnerDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

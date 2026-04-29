import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicPartnerService {
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
}

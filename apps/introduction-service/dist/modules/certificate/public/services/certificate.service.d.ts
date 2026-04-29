import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicCertificateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            description: string | null;
            name: string;
            image: string | null;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            type: string | null;
            issued_by: string | null;
            issued_date: Date | null;
            expiry_date: Date | null;
            certificate_number: string | null;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        sort_order: number;
        description: string | null;
        name: string;
        image: string | null;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        type: string | null;
        issued_by: string | null;
        issued_date: Date | null;
        expiry_date: Date | null;
        certificate_number: string | null;
    }>;
}

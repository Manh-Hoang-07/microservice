import { PrismaService } from '../../../../database/prisma.service';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
export declare class AdminCertificateService {
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
    create(dto: CreateCertificateDto): Promise<{
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
    update(id: bigint, dto: UpdateCertificateDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

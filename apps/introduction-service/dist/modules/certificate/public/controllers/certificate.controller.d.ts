import { PublicCertificateService } from '../services/certificate.service';
export declare class PublicCertificateController {
    private readonly certificateService;
    constructor(certificateService: PublicCertificateService);
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
    getOne(id: string): Promise<{
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

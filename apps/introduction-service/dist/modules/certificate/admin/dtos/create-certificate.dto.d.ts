import { CertificateType } from '../../../../common/enums';
export declare class CreateCertificateDto {
    name: string;
    image?: string;
    issued_by?: string;
    issued_date?: string;
    expiry_date?: string;
    certificate_number?: string;
    description?: string;
    type?: CertificateType;
    status?: string;
    sort_order?: number;
}

import { PrismaService } from '../../../../database/prisma.service';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
export declare class AdminBannerLocationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            status: string;
            updated_at: Date;
            code: string;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        banners: {
            link: string | null;
            sort_order: number;
            description: string | null;
            id: bigint;
            created_at: Date;
            title: string;
            subtitle: string | null;
            image: string | null;
            mobile_image: string | null;
            link_target: import(".prisma/client").$Enums.BannerLinkTarget;
            button_text: string | null;
            button_color: string | null;
            text_color: string | null;
            location_id: bigint;
            status: string;
            start_date: Date | null;
            end_date: Date | null;
            updated_at: Date;
        }[];
    } & {
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
    create(dto: CreateBannerLocationDto): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
    update(id: bigint, dto: UpdateBannerLocationDto): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
    changeStatus(id: bigint, status: string): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
}

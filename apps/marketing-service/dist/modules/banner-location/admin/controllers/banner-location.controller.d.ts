import { AdminBannerLocationService } from '../services/banner-location.service';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
export declare class AdminBannerLocationController {
    private readonly bannerLocationService;
    constructor(bannerLocationService: AdminBannerLocationService);
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
    getOne(id: string): Promise<{
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
    update(id: string, dto: UpdateBannerLocationDto): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    changeStatus(id: string, status: string): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        status: string;
        updated_at: Date;
        code: string;
    }>;
}

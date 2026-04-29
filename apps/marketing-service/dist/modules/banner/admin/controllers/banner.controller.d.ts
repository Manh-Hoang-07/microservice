import { AdminBannerService } from '../services/banner.service';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
export declare class AdminBannerController {
    private readonly bannerService;
    constructor(bannerService: AdminBannerService);
    getList(query: any): Promise<{
        data: ({
            location: {
                description: string | null;
                name: string;
                id: bigint;
                created_at: Date;
                status: string;
                updated_at: Date;
                code: string;
            };
        } & {
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
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: string): Promise<{
        location: {
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            status: string;
            updated_at: Date;
            code: string;
        };
    } & {
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
    }>;
    create(dto: CreateBannerDto): Promise<{
        location: {
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            status: string;
            updated_at: Date;
            code: string;
        };
    } & {
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
    }>;
    update(id: string, dto: UpdateBannerDto): Promise<{
        location: {
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            status: string;
            updated_at: Date;
            code: string;
        };
    } & {
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
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

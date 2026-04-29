import { PublicBannerService } from '../services/banner.service';
export declare class PublicBannerController {
    private readonly bannerService;
    constructor(bannerService: PublicBannerService);
    getList(query: any): Promise<{
        data: ({
            location: {
                name: string;
                id: bigint;
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
}

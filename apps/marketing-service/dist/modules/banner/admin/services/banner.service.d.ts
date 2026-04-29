import { PrismaService } from '../../../../database/prisma.service';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
export declare class AdminBannerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getOne(id: bigint): Promise<{
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
    update(id: bigint, dto: UpdateBannerDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

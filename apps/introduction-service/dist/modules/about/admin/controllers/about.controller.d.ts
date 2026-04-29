import { AdminAboutService } from '../services/about.service';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';
export declare class AdminAboutController {
    private readonly aboutService;
    constructor(aboutService: AdminAboutService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            title: string;
            slug: string;
            content: string | null;
            image: string | null;
            video_url: string | null;
            section_type: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: string): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    create(dto: CreateAboutDto): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, dto: UpdateAboutDto): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

import { PublicAboutService } from '../services/about.service';
export declare class PublicAboutController {
    private readonly aboutService;
    constructor(aboutService: PublicAboutService);
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
    getBySlug(slug: string): Promise<{
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
}

import { PublicProjectService } from '../services/project.service';
export declare class PublicProjectController {
    private readonly projectService;
    constructor(projectService: PublicProjectService);
    getList(query: any): Promise<{
        data: ({
            testimonials: {
                sort_order: number;
                content: string;
                status: string;
                id: bigint;
                created_at: Date;
                updated_at: Date;
                client_name: string;
                featured: boolean;
                client_position: string | null;
                client_company: string | null;
                client_avatar: string | null;
                rating: number | null;
                project_id: bigint | null;
            }[];
        } & {
            sort_order: number;
            description: string | null;
            name: string;
            slug: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            short_description: string | null;
            cover_image: string | null;
            location: string | null;
            area: string | null;
            start_date: Date | null;
            end_date: Date | null;
            client_name: string | null;
            budget: string | null;
            images: import("@prisma/client/runtime/client").JsonValue | null;
            featured: boolean;
            seo_title: string | null;
            seo_description: string | null;
            seo_keywords: string | null;
            view_count: number;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<{
        view_count: number;
        testimonials: {
            sort_order: number;
            content: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            client_name: string;
            featured: boolean;
            client_position: string | null;
            client_company: string | null;
            client_avatar: string | null;
            rating: number | null;
            project_id: bigint | null;
        }[];
        sort_order: number;
        description: string | null;
        name: string;
        slug: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        short_description: string | null;
        cover_image: string | null;
        location: string | null;
        area: string | null;
        start_date: Date | null;
        end_date: Date | null;
        client_name: string | null;
        budget: string | null;
        images: import("@prisma/client/runtime/client").JsonValue | null;
        featured: boolean;
        seo_title: string | null;
        seo_description: string | null;
        seo_keywords: string | null;
    }>;
}

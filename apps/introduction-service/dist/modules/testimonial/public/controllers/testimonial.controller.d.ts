import { PublicTestimonialService } from '../services/testimonial.service';
export declare class PublicTestimonialController {
    private readonly testimonialService;
    constructor(testimonialService: PublicTestimonialService);
    getList(query: any): Promise<{
        data: ({
            project: {
                name: string;
                slug: string;
                id: bigint;
            } | null;
        } & {
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
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: string): Promise<{
        project: {
            name: string;
            slug: string;
            id: bigint;
        } | null;
    } & {
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
    }>;
}

import { PublicGalleryService } from '../services/gallery.service';
export declare class PublicGalleryController {
    private readonly galleryService;
    constructor(galleryService: PublicGalleryService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            description: string | null;
            title: string;
            slug: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            cover_image: string | null;
            images: import("@prisma/client/runtime/client").JsonValue | null;
            featured: boolean;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<{
        sort_order: number;
        description: string | null;
        title: string;
        slug: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        cover_image: string | null;
        images: import("@prisma/client/runtime/client").JsonValue | null;
        featured: boolean;
    }>;
}

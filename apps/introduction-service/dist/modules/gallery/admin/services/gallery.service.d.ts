import { PrismaService } from '../../../../database/prisma.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
export declare class AdminGalleryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getOne(id: bigint): Promise<{
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
    create(dto: CreateGalleryDto): Promise<{
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
    update(id: bigint, dto: UpdateGalleryDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

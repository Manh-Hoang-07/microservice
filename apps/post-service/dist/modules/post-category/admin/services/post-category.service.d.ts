import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';
export declare class AdminPostCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: ({
            children: {
                sort_order: number;
                description: string | null;
                name: string;
                id: bigint;
                created_at: Date;
                slug: string;
                seo_title: string | null;
                seo_description: string | null;
                seo_keywords: string | null;
                created_user_id: bigint | null;
                updated_user_id: bigint | null;
                updated_at: Date;
                group_id: bigint | null;
                parent_id: bigint | null;
                is_active: boolean;
            }[];
        } & {
            sort_order: number;
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            slug: string;
            seo_title: string | null;
            seo_description: string | null;
            seo_keywords: string | null;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            updated_at: Date;
            group_id: bigint | null;
            parent_id: bigint | null;
            is_active: boolean;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        children: {
            sort_order: number;
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            slug: string;
            seo_title: string | null;
            seo_description: string | null;
            seo_keywords: string | null;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            updated_at: Date;
            group_id: bigint | null;
            parent_id: bigint | null;
            is_active: boolean;
        }[];
    } & {
        sort_order: number;
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        seo_title: string | null;
        seo_description: string | null;
        seo_keywords: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        parent_id: bigint | null;
        is_active: boolean;
    }>;
    create(dto: CreatePostCategoryDto): Promise<{
        sort_order: number;
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        seo_title: string | null;
        seo_description: string | null;
        seo_keywords: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        parent_id: bigint | null;
        is_active: boolean;
    }>;
    update(id: bigint, dto: UpdatePostCategoryDto): Promise<{
        sort_order: number;
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        seo_title: string | null;
        seo_description: string | null;
        seo_keywords: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        parent_id: bigint | null;
        is_active: boolean;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

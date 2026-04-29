import { AdminPostCategoryService } from '../services/post-category.service';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';
export declare class AdminPostCategoryController {
    private readonly categoryService;
    constructor(categoryService: AdminPostCategoryService);
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
    getOne(id: string): Promise<{
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
    update(id: string, dto: UpdatePostCategoryDto): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

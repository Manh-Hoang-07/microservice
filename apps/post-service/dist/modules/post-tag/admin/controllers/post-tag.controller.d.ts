import { AdminPostTagService } from '../services/post-tag.service';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';
export declare class AdminPostTagController {
    private readonly tagService;
    constructor(tagService: AdminPostTagService);
    getList(query: any): Promise<{
        data: {
            description: string | null;
            name: string;
            id: bigint;
            created_at: Date;
            slug: string;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            updated_at: Date;
            group_id: bigint | null;
            is_active: boolean;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        is_active: boolean;
    }>;
    create(dto: CreatePostTagDto): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        is_active: boolean;
    }>;
    update(id: string, dto: UpdatePostTagDto): Promise<{
        description: string | null;
        name: string;
        id: bigint;
        created_at: Date;
        slug: string;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        updated_at: Date;
        group_id: bigint | null;
        is_active: boolean;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

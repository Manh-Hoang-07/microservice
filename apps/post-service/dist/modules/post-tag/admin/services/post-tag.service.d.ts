import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostTagDto } from '../dtos/create-post-tag.dto';
import { UpdatePostTagDto } from '../dtos/update-post-tag.dto';
export declare class AdminPostTagService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getOne(id: bigint): Promise<{
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
    update(id: bigint, dto: UpdatePostTagDto): Promise<{
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
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

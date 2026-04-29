import { PrismaService } from '../../../../database/prisma.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
export declare class AdminCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            id: bigint;
            slug: string;
            description: string | null;
            created_user_id: bigint | null;
            updated_user_id: bigint | null;
            created_at: Date;
            updated_at: Date;
            group_id: bigint | null;
            name: string;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        id: bigint;
        slug: string;
        description: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        group_id: bigint | null;
        name: string;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: bigint;
        slug: string;
        description: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        group_id: bigint | null;
        name: string;
    }>;
    update(id: bigint, dto: UpdateCategoryDto): Promise<{
        id: bigint;
        slug: string;
        description: string | null;
        created_user_id: bigint | null;
        updated_user_id: bigint | null;
        created_at: Date;
        updated_at: Date;
        group_id: bigint | null;
        name: string;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

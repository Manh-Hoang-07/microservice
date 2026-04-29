import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
export declare class AdminPostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getSimpleList(query: any): Promise<{
        data: {
            name: string;
            id: bigint;
            slug: string;
            status: string;
        }[];
    }>;
    getOne(id: bigint): Promise<any>;
    create(dto: CreatePostDto): Promise<any>;
    update(id: bigint, dto: UpdatePostDto): Promise<any>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
    private syncCategories;
    private syncTags;
    private transform;
}

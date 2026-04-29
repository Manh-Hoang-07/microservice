import { PrismaService } from '../../../../database/prisma.service';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
export declare class AdminComicService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getSimpleList(query: any): Promise<{
        data: {
            id: bigint;
            slug: string;
            title: string;
            status: string;
        }[];
    }>;
    getOne(id: bigint): Promise<any>;
    create(dto: CreateComicDto): Promise<any>;
    update(id: bigint, dto: UpdateComicDto): Promise<any>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
    private syncCategories;
    private transform;
}

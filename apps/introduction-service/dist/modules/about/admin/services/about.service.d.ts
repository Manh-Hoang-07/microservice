import { PrismaService } from '../../../../database/prisma.service';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';
export declare class AdminAboutService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            title: string;
            slug: string;
            content: string | null;
            image: string | null;
            video_url: string | null;
            section_type: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    create(dto: CreateAboutDto): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: bigint, dto: UpdateAboutDto): Promise<{
        sort_order: number;
        title: string;
        slug: string;
        content: string | null;
        image: string | null;
        video_url: string | null;
        section_type: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

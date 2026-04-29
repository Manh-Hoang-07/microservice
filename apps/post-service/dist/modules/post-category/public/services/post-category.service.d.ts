import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicPostCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        data: {
            sort_order: number;
            description: string | null;
            name: string;
            id: bigint;
            slug: string;
            seo_title: string | null;
            seo_description: string | null;
            seo_keywords: string | null;
            parent_id: bigint | null;
            children: {
                sort_order: number;
                description: string | null;
                name: string;
                id: bigint;
                slug: string;
                seo_title: string | null;
                seo_description: string | null;
                seo_keywords: string | null;
            }[];
        }[];
    }>;
}

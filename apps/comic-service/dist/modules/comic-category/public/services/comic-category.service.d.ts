import { PrismaService } from '../../../../database/prisma.service';
export declare class PublicCategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        data: {
            description: string | null;
            name: string;
            id: bigint;
            slug: string;
        }[];
    }>;
}

import { PublicCategoryService } from '../services/comic-category.service';
export declare class PublicCategoryController {
    private readonly categoryService;
    constructor(categoryService: PublicCategoryService);
    getAll(): Promise<{
        data: {
            id: bigint;
            slug: string;
            description: string | null;
            name: string;
        }[];
    }>;
}

import { PublicPostTagService } from '../services/post-tag.service';
export declare class PublicPostTagController {
    private readonly tagService;
    constructor(tagService: PublicPostTagService);
    getAll(): Promise<{
        data: {
            description: string | null;
            name: string;
            id: bigint;
            slug: string;
        }[];
    }>;
}

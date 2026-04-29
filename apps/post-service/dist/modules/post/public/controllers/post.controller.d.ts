import { PublicPostService } from '../services/post.service';
export declare class PublicPostController {
    private readonly postService;
    constructor(postService: PublicPostService);
    getList(query: any): Promise<{
        data: any[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getBySlug(slug: string): Promise<any>;
}

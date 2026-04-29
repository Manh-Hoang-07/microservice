import { AdminPostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
export declare class AdminPostController {
    private readonly postService;
    constructor(postService: AdminPostService);
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
    getOne(id: string): Promise<any>;
    create(dto: CreatePostDto): Promise<any>;
    update(id: string, dto: UpdatePostDto): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

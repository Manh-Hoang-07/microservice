import { AdminComicService } from '../services/comic.service';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
export declare class AdminComicController {
    private readonly comicService;
    constructor(comicService: AdminComicService);
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
    getOne(id: string): Promise<any>;
    create(dto: CreateComicDto): Promise<any>;
    update(id: string, dto: UpdateComicDto): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

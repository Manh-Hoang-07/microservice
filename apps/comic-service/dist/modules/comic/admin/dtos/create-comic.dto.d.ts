import { ComicStatus } from '../../../../common/enums';
export declare class CreateComicDto {
    title: string;
    slug?: string;
    description?: string;
    cover_image?: string;
    author?: string;
    status?: ComicStatus;
    category_ids?: number[];
    is_featured?: boolean;
}

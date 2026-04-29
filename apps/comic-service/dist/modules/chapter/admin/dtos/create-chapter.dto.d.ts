import { ChapterStatus } from '../../../../common/enums';
export declare class CreateChapterPageDto {
    image_url: string;
    width?: number;
    height?: number;
    file_size?: number;
}
export declare class CreateChapterDto {
    comic_id: number;
    team_id?: number;
    title: string;
    chapter_index: number;
    chapter_label?: string;
    status?: ChapterStatus;
    pages?: CreateChapterPageDto[];
}

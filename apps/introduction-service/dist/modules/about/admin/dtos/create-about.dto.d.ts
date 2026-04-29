import { AboutSectionType } from '../../../../common/enums';
export declare class CreateAboutDto {
    title: string;
    slug?: string;
    content?: string;
    image?: string;
    video_url?: string;
    section_type?: AboutSectionType;
    status?: string;
    sort_order?: number;
}

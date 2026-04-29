import { ProjectStatus } from '../../../../common/enums';
export declare class CreateProjectDto {
    name: string;
    slug?: string;
    description?: string;
    short_description?: string;
    cover_image?: string;
    location?: string;
    area?: string;
    start_date?: string;
    end_date?: string;
    status?: ProjectStatus;
    client_name?: string;
    budget?: string;
    images?: any[];
    featured?: boolean;
    sort_order?: number;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
}

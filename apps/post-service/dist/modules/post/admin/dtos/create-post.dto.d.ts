import { PostStatus, PostType } from '../../../../common/enums';
export declare class CreatePostDto {
    name: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    image?: string;
    cover_image?: string;
    status?: PostStatus;
    post_type?: PostType;
    video_url?: string;
    audio_url?: string;
    is_featured?: boolean;
    is_pinned?: boolean;
    published_at?: string;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    category_ids?: number[];
    tag_ids?: number[];
}

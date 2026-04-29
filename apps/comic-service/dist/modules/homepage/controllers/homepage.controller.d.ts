import { HomepageService } from '../services/homepage.service';
export declare class HomepageController {
    private readonly homepageService;
    constructor(homepageService: HomepageService);
    getTopViewed(limit?: string): Promise<{
        id: bigint;
        slug: string;
        title: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        last_chapter_updated_at: Date | null;
        is_featured: boolean;
        stats: {
            updated_at: Date;
            comic_id: bigint;
            view_count: bigint;
            follow_count: bigint;
            rating_count: bigint;
            rating_sum: bigint;
        } | null;
        chapters: {
            id: bigint;
            title: string;
            created_at: Date;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                id: bigint;
                slug: string;
                name: string;
            };
        }[];
    }[]>;
    getPopular(limit?: string): Promise<{
        id: bigint;
        slug: string;
        title: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        last_chapter_updated_at: Date | null;
        is_featured: boolean;
        stats: {
            updated_at: Date;
            comic_id: bigint;
            view_count: bigint;
            follow_count: bigint;
            rating_count: bigint;
            rating_sum: bigint;
        } | null;
        chapters: {
            id: bigint;
            title: string;
            created_at: Date;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                id: bigint;
                slug: string;
                name: string;
            };
        }[];
    }[]>;
    getNewest(limit?: string): Promise<{
        id: bigint;
        slug: string;
        title: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        last_chapter_updated_at: Date | null;
        is_featured: boolean;
        stats: {
            updated_at: Date;
            comic_id: bigint;
            view_count: bigint;
            follow_count: bigint;
            rating_count: bigint;
            rating_sum: bigint;
        } | null;
        chapters: {
            id: bigint;
            title: string;
            created_at: Date;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                id: bigint;
                slug: string;
                name: string;
            };
        }[];
    }[]>;
    getRecentlyUpdated(limit?: string): Promise<{
        id: bigint;
        slug: string;
        title: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        last_chapter_updated_at: Date | null;
        is_featured: boolean;
        stats: {
            updated_at: Date;
            comic_id: bigint;
            view_count: bigint;
            follow_count: bigint;
            rating_count: bigint;
            rating_sum: bigint;
        } | null;
        chapters: {
            id: bigint;
            title: string;
            created_at: Date;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                id: bigint;
                slug: string;
                name: string;
            };
        }[];
    }[]>;
    getCategories(): Promise<{
        id: bigint;
        slug: string;
        name: string;
    }[]>;
}

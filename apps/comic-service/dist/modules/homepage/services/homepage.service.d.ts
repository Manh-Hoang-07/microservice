import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '@package/redis';
export declare class HomepageService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getTopViewed(limit: number): Promise<{
        id: bigint;
        title: string;
        slug: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        is_featured: boolean;
        last_chapter_updated_at: Date | null;
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
            created_at: Date;
            title: string;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                name: string;
                id: bigint;
                slug: string;
            };
        }[];
    }[]>;
    getPopular(limit: number): Promise<{
        id: bigint;
        title: string;
        slug: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        is_featured: boolean;
        last_chapter_updated_at: Date | null;
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
            created_at: Date;
            title: string;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                name: string;
                id: bigint;
                slug: string;
            };
        }[];
    }[]>;
    getNewest(limit: number): Promise<{
        id: bigint;
        title: string;
        slug: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        is_featured: boolean;
        last_chapter_updated_at: Date | null;
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
            created_at: Date;
            title: string;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                name: string;
                id: bigint;
                slug: string;
            };
        }[];
    }[]>;
    getRecentlyUpdated(limit: number): Promise<{
        id: bigint;
        title: string;
        slug: string;
        cover_image: string | null;
        author: string | null;
        status: string;
        is_featured: boolean;
        last_chapter_updated_at: Date | null;
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
            created_at: Date;
            title: string;
            chapter_index: number;
            chapter_label: string | null;
        }[];
        categoryLinks: {
            category: {
                name: string;
                id: bigint;
                slug: string;
            };
        }[];
    }[]>;
    getCategories(): Promise<{
        name: string;
        id: bigint;
        slug: string;
    }[]>;
    private getComics;
    private cached;
}

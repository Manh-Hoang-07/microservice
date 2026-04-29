import { PrismaService } from '../../../../database/prisma.service';
import { CreateTestimonialDto } from '../dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dtos/update-testimonial.dto';
export declare class AdminTestimonialService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: ({
            project: {
                name: string;
                slug: string;
                id: bigint;
            } | null;
        } & {
            sort_order: number;
            content: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            client_name: string;
            featured: boolean;
            client_position: string | null;
            client_company: string | null;
            client_avatar: string | null;
            rating: number | null;
            project_id: bigint | null;
        })[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        project: {
            name: string;
            slug: string;
            id: bigint;
        } | null;
    } & {
        sort_order: number;
        content: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        client_name: string;
        featured: boolean;
        client_position: string | null;
        client_company: string | null;
        client_avatar: string | null;
        rating: number | null;
        project_id: bigint | null;
    }>;
    create(dto: CreateTestimonialDto): Promise<{
        project: {
            name: string;
            slug: string;
            id: bigint;
        } | null;
    } & {
        sort_order: number;
        content: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        client_name: string;
        featured: boolean;
        client_position: string | null;
        client_company: string | null;
        client_avatar: string | null;
        rating: number | null;
        project_id: bigint | null;
    }>;
    update(id: bigint, dto: UpdateTestimonialDto): Promise<{
        project: {
            name: string;
            slug: string;
            id: bigint;
        } | null;
    } & {
        sort_order: number;
        content: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        client_name: string;
        featured: boolean;
        client_position: string | null;
        client_company: string | null;
        client_avatar: string | null;
        rating: number | null;
        project_id: bigint | null;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

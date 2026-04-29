import { PrismaService } from '../../../../database/prisma.service';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
export declare class AdminStaffService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            sort_order: number;
            name: string;
            status: string;
            id: bigint;
            created_at: Date;
            updated_at: Date;
            position: string | null;
            department: string | null;
            bio: string | null;
            avatar: string | null;
            email: string | null;
            phone: string | null;
            social_links: import("@prisma/client/runtime/client").JsonValue | null;
            experience: string | null;
            expertise: string | null;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        sort_order: number;
        name: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        position: string | null;
        department: string | null;
        bio: string | null;
        avatar: string | null;
        email: string | null;
        phone: string | null;
        social_links: import("@prisma/client/runtime/client").JsonValue | null;
        experience: string | null;
        expertise: string | null;
    }>;
    create(dto: CreateStaffDto): Promise<{
        sort_order: number;
        name: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        position: string | null;
        department: string | null;
        bio: string | null;
        avatar: string | null;
        email: string | null;
        phone: string | null;
        social_links: import("@prisma/client/runtime/client").JsonValue | null;
        experience: string | null;
        expertise: string | null;
    }>;
    update(id: bigint, dto: UpdateStaffDto): Promise<{
        sort_order: number;
        name: string;
        status: string;
        id: bigint;
        created_at: Date;
        updated_at: Date;
        position: string | null;
        department: string | null;
        bio: string | null;
        avatar: string | null;
        email: string | null;
        phone: string | null;
        social_links: import("@prisma/client/runtime/client").JsonValue | null;
        experience: string | null;
        expertise: string | null;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

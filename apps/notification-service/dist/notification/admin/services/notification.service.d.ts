import { PrismaService } from '../../../database/prisma.service';
export declare class AdminNotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            data: import("@prisma/client/runtime/client").JsonValue | null;
            id: bigint;
            user_id: bigint;
            title: string;
            message: string;
            type: string;
            is_read: boolean;
            read_at: Date | null;
            status: string;
            created_at: Date;
            updated_at: Date;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: bigint;
        user_id: bigint;
        title: string;
        message: string;
        type: string;
        is_read: boolean;
        read_at: Date | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    create(data: any): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: bigint;
        user_id: bigint;
        title: string;
        message: string;
        type: string;
        is_read: boolean;
        read_at: Date | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    createMany(notifications: Array<{
        user_id: bigint;
        title: string;
        message: string;
        type?: string;
        data?: any;
    }>): Promise<import(".prisma/client").Prisma.BatchPayload>;
    update(id: bigint, data: any): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: bigint;
        user_id: bigint;
        title: string;
        message: string;
        type: string;
        is_read: boolean;
        read_at: Date | null;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

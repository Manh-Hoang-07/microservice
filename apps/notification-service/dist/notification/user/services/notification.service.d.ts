import { PrismaService } from '../../../database/prisma.service';
export declare class UserNotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(userId: bigint, query: any): Promise<{
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
    getUnreadCount(userId: bigint): Promise<{
        count: number;
    }>;
    getOne(userId: bigint, id: bigint): Promise<{
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
    markAsRead(userId: bigint, id: bigint): Promise<{
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
    markAllAsRead(userId: bigint): Promise<{
        updated: number;
    }>;
}

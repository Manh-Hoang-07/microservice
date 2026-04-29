import { UserNotificationService } from '../services/notification.service';
export declare class UserNotificationController {
    private readonly notifService;
    constructor(notifService: UserNotificationService);
    getList(req: any, query: any): Promise<{
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
    getUnreadCount(req: any): Promise<{
        count: number;
    }>;
    getOne(req: any, id: string): Promise<{
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
    markAsRead(req: any, id: string): Promise<{
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
    markAllAsRead(req: any): Promise<{
        updated: number;
    }>;
}

import { AdminNotificationService } from '../services/notification.service';
export declare class AdminNotificationController {
    private readonly notifService;
    constructor(notifService: AdminNotificationService);
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
    getOne(id: string): Promise<{
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

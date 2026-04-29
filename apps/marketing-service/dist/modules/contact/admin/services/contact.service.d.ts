import { PrismaService } from '../../../../database/prisma.service';
export declare class AdminContactService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            name: string;
            id: bigint;
            created_at: Date;
            status: import(".prisma/client").$Enums.ContactStatus;
            updated_at: Date;
            phone: string | null;
            email: string;
            message: string;
            reply: string | null;
            replied_at: Date | null;
            replied_by: bigint | null;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        name: string;
        id: bigint;
        created_at: Date;
        status: import(".prisma/client").$Enums.ContactStatus;
        updated_at: Date;
        phone: string | null;
        email: string;
        message: string;
        reply: string | null;
        replied_at: Date | null;
        replied_by: bigint | null;
    }>;
    reply(id: bigint, replyText: string, userId: bigint): Promise<{
        name: string;
        id: bigint;
        created_at: Date;
        status: import(".prisma/client").$Enums.ContactStatus;
        updated_at: Date;
        phone: string | null;
        email: string;
        message: string;
        reply: string | null;
        replied_at: Date | null;
        replied_by: bigint | null;
    }>;
    markAsRead(id: bigint): Promise<{
        name: string;
        id: bigint;
        created_at: Date;
        status: import(".prisma/client").$Enums.ContactStatus;
        updated_at: Date;
        phone: string | null;
        email: string;
        message: string;
        reply: string | null;
        replied_at: Date | null;
        replied_by: bigint | null;
    }>;
    closeContact(id: bigint): Promise<{
        name: string;
        id: bigint;
        created_at: Date;
        status: import(".prisma/client").$Enums.ContactStatus;
        updated_at: Date;
        phone: string | null;
        email: string;
        message: string;
        reply: string | null;
        replied_at: Date | null;
        replied_by: bigint | null;
    }>;
}

import { AdminContactService } from '../services/contact.service';
export declare class AdminContactController {
    private readonly contactService;
    constructor(contactService: AdminContactService);
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
    getOne(id: string): Promise<{
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
    reply(id: string, reply: string, req: any): Promise<{
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
    markAsRead(id: string): Promise<{
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
    closeContact(id: string): Promise<{
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

import { PrismaService } from '../../../database/prisma.service';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';
export declare class AdminContentTemplateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getList(query: any): Promise<{
        data: {
            name: string;
            id: bigint;
            type: string;
            status: string;
            created_at: Date;
            updated_at: Date;
            code: string;
            category: string;
            content: string | null;
            file_path: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
            variables: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        meta: import("@package/common").PaginationMeta;
    }>;
    getOne(id: bigint): Promise<{
        name: string;
        id: bigint;
        type: string;
        status: string;
        created_at: Date;
        updated_at: Date;
        code: string;
        category: string;
        content: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        variables: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    create(dto: CreateContentTemplateDto): Promise<{
        name: string;
        id: bigint;
        type: string;
        status: string;
        created_at: Date;
        updated_at: Date;
        code: string;
        category: string;
        content: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        variables: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    update(id: bigint, dto: UpdateContentTemplateDto): Promise<{
        name: string;
        id: bigint;
        type: string;
        status: string;
        created_at: Date;
        updated_at: Date;
        code: string;
        category: string;
        content: string | null;
        file_path: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        variables: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    delete(id: bigint): Promise<{
        success: boolean;
    }>;
}

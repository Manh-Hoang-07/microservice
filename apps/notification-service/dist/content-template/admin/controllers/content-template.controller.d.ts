import { AdminContentTemplateService } from '../services/content-template.service';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';
export declare class AdminContentTemplateController {
    private readonly service;
    constructor(service: AdminContentTemplateService);
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
    getOne(id: string): Promise<{
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
    update(id: string, dto: UpdateContentTemplateDto): Promise<{
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
    delete(id: string): Promise<{
        success: boolean;
    }>;
}

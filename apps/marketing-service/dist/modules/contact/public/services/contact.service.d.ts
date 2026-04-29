import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';
export declare class PublicContactService {
    private readonly prisma;
    private readonly config;
    private readonly logger;
    constructor(prisma: PrismaService, config: ConfigService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: bigint;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
}

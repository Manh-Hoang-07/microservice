import { PublicContactService } from '../services/contact.service';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';
export declare class PublicContactController {
    private readonly contactService;
    constructor(contactService: PublicContactService);
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

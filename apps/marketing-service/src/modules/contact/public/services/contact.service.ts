import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';
import { ContactRepository } from '../../repositories/contact.repository';

@Injectable()
export class PublicContactService {
  private readonly logger = new Logger(PublicContactService.name);

  constructor(
    private readonly contactRepo: ContactRepository,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateContactDto) {
    const contact = await this.contactRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      message: dto.message,
    });

    const kafkaEnabled = this.config.get<boolean>('kafka.enabled');
    if (kafkaEnabled) {
      try {
        await this.contactRepo.createOutbox({
          event_type: 'contact.submitted',
          payload: {
            contact_id: Number(contact.id),
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            message: contact.message,
            created_at: contact.created_at.toISOString(),
          },
        });
      } catch (err) {
        this.logger.error('Failed to write contact.submitted to outbox', err);
      }
    }

    return {
      success: true,
      message: 'Contact submitted successfully',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        created_at: contact.created_at,
      },
    };
  }
}

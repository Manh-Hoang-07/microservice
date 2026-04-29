import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateContactDto } from '../../admin/dtos/create-contact.dto';

@Injectable()
export class PublicContactService {
  private readonly logger = new Logger(PublicContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        message: dto.message,
      },
    });

    // Write to outbox if Kafka is enabled
    const kafkaEnabled = this.config.get<boolean>('kafka.enabled');
    if (kafkaEnabled) {
      try {
        await this.prisma.marketingOutbox.create({
          data: {
            event_type: 'contact.submitted',
            payload: {
              contact_id: Number(contact.id),
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              message: contact.message,
              created_at: contact.created_at.toISOString(),
            },
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

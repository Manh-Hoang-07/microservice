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
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    // Wrap contact insert + outbox in a single transaction. Previously the
    // outbox write ran AFTER the contact insert and was wrapped in
    // try/catch — a crash mid-way committed the contact row but lost the
    // event, defeating the outbox pattern.
    const contact = await this.prisma.$transaction(async (tx) => {
      const created = await tx.contact.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          message: dto.message,
        },
      });

      if (kafkaEnabled) {
        await tx.outbox.create({
          data: {
            event_type: 'contact.submitted',
            payload: {
              // Stringify BigInt — payloads > 2^53 silently corrupt as Number.
              contact_id: String(created.id),
              name: created.name,
              email: created.email,
              phone: created.phone,
              message: created.message,
              created_at: created.created_at.toISOString(),
            },
          },
        });
      }
      return created;
    });

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

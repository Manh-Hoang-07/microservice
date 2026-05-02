import { Injectable } from '@nestjs/common';
import { EmailConfig, Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

@Injectable()
export class EmailConfigRepository {
  // Singleton row id. Avoids the race in which two concurrent first-time
  // saves both pass `findFirst() == null` and create duplicate rows.
  private static readonly SINGLETON_ID = BigInt(1);

  constructor(private readonly prisma: PrismaService) {}

  getConfig(): Promise<EmailConfig | null> {
    return this.prisma.emailConfig.findUnique({
      where: { id: EmailConfigRepository.SINGLETON_ID },
    });
  }

  /**
   * Atomic create-or-update on the singleton row.
   * `data` must include all CreateInput fields when no row exists yet.
   */
  upsert(
    data: Prisma.EmailConfigCreateInput,
    update: Prisma.EmailConfigUpdateInput,
  ): Promise<EmailConfig> {
    return this.prisma.emailConfig.upsert({
      where: { id: EmailConfigRepository.SINGLETON_ID },
      create: { ...data, id: EmailConfigRepository.SINGLETON_ID } as any,
      update,
    });
  }

  // Kept for compatibility callers; new callers should use upsert.
  create(data: Prisma.EmailConfigCreateInput): Promise<EmailConfig> {
    return this.prisma.emailConfig.create({
      data: { ...data, id: EmailConfigRepository.SINGLETON_ID } as any,
    });
  }

  update(id: any, data: Prisma.EmailConfigUpdateInput): Promise<EmailConfig> {
    return this.prisma.emailConfig.update({ where: { id: toPrimaryKey(id) }, data });
  }
}

import { Injectable } from '@nestjs/common';
import { EmailConfig, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

@Injectable()
export class EmailConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  getConfig(): Promise<EmailConfig | null> {
    return this.prisma.emailConfig.findFirst();
  }

  create(data: Prisma.EmailConfigCreateInput): Promise<EmailConfig> {
    return this.prisma.emailConfig.create({ data });
  }

  update(id: any, data: Prisma.EmailConfigUpdateInput): Promise<EmailConfig> {
    return this.prisma.emailConfig.update({ where: { id: toPrimaryKey(id) }, data });
  }
}

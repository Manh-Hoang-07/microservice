import { Injectable } from '@nestjs/common';
import { EmailConfig, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { PrismaRepository } from '../../../../common/core/prisma.repository';
import { IEmailConfigRepository } from './email-config.repository';

@Injectable()
export class EmailConfigRepositoryImpl
  extends PrismaRepository<
    EmailConfig,
    Prisma.EmailConfigWhereInput,
    Prisma.EmailConfigCreateInput,
    Prisma.EmailConfigUpdateInput,
    Prisma.EmailConfigOrderByWithRelationInput
  >
  implements IEmailConfigRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma.emailConfig as unknown as any);
  }

  protected buildWhere(
    _filter: Record<string, any>,
  ): Prisma.EmailConfigWhereInput {
    return {};
  }

  async getConfig(): Promise<EmailConfig | null> {
    return this.prisma.emailConfig.findFirst();
  }
}

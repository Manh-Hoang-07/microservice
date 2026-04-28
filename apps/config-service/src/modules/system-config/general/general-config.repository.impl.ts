import { Injectable } from '@nestjs/common';
import { GeneralConfig, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { PrismaRepository } from '../../../common/core/prisma.repository';
import { IGeneralConfigRepository } from './general-config.repository';

@Injectable()
export class GeneralConfigRepositoryImpl
  extends PrismaRepository<
    GeneralConfig,
    Prisma.GeneralConfigWhereInput,
    Prisma.GeneralConfigCreateInput,
    Prisma.GeneralConfigUpdateInput,
    Prisma.GeneralConfigOrderByWithRelationInput
  >
  implements IGeneralConfigRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma.generalConfig as unknown as any);
  }

  protected buildWhere(
    _filter: Record<string, any>,
  ): Prisma.GeneralConfigWhereInput {
    return {};
  }

  async getConfig(): Promise<GeneralConfig | null> {
    return this.prisma.generalConfig.findFirst();
  }
}

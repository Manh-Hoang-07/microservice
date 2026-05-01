import { Injectable } from '@nestjs/common';
import { GeneralConfig, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

@Injectable()
export class GeneralConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  getConfig(): Promise<GeneralConfig | null> {
    return this.prisma.generalConfig.findFirst();
  }

  create(data: Prisma.GeneralConfigCreateInput): Promise<GeneralConfig> {
    return this.prisma.generalConfig.create({ data });
  }

  update(id: any, data: Prisma.GeneralConfigUpdateInput): Promise<GeneralConfig> {
    return this.prisma.generalConfig.update({ where: { id: toPrimaryKey(id) }, data });
  }
}

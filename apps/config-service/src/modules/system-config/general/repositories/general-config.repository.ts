import { Injectable } from '@nestjs/common';
import { GeneralConfig, Prisma } from 'src/generated/prisma';
import { PrismaService } from '../../../../database/prisma.service';
import { toPrimaryKey } from '../../../../types';

@Injectable()
export class GeneralConfigRepository {
  private static readonly SINGLETON_ID = BigInt(1);

  constructor(private readonly prisma: PrismaService) {}

  getConfig(): Promise<GeneralConfig | null> {
    return this.prisma.generalConfig.findUnique({
      where: { id: GeneralConfigRepository.SINGLETON_ID },
    });
  }

  /** Atomic create-or-update on the singleton row to avoid concurrent-first-write races. */
  upsert(
    data: Prisma.GeneralConfigCreateInput,
    update: Prisma.GeneralConfigUpdateInput,
  ): Promise<GeneralConfig> {
    return this.prisma.generalConfig.upsert({
      where: { id: GeneralConfigRepository.SINGLETON_ID },
      create: { ...data, id: GeneralConfigRepository.SINGLETON_ID } as any,
      update,
    });
  }

  create(data: Prisma.GeneralConfigCreateInput): Promise<GeneralConfig> {
    return this.prisma.generalConfig.create({
      data: { ...data, id: GeneralConfigRepository.SINGLETON_ID } as any,
    });
  }

  update(id: any, data: Prisma.GeneralConfigUpdateInput): Promise<GeneralConfig> {
    return this.prisma.generalConfig.update({ where: { id: toPrimaryKey(id) }, data });
  }
}

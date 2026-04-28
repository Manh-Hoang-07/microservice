import { GeneralConfig } from '@prisma/client';

export interface IGeneralConfigRepository {
  getConfig(): Promise<GeneralConfig | null>;
  create(data: any): Promise<GeneralConfig>;
  update(id: any, data: any): Promise<GeneralConfig>;
}

export const GENERAL_CONFIG_REPOSITORY = 'GENERAL_CONFIG_REPOSITORY';

import { EmailConfig } from '@prisma/client';

export interface IEmailConfigRepository {
  getConfig(): Promise<EmailConfig | null>;
  create(data: any): Promise<EmailConfig>;
  update(id: any, data: any): Promise<EmailConfig>;
}

export const EMAIL_CONFIG_REPOSITORY = 'EMAIL_CONFIG_REPOSITORY';

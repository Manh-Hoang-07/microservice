import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { EmailConfigRepository } from '../../repositories/email-config.repository';
import { UpdateEmailConfigDto } from '../dtos/update-email-config.dto';
import { buildConfigPayload } from '../../../helpers/config-payload.helper';

@Injectable()
export class EmailConfigService {
  constructor(
    private readonly emailConfigRepo: EmailConfigRepository,
    private readonly i18n: I18nService,
  ) {}

  async getConfig(): Promise<any> {
    const config = await this.emailConfigRepo.getConfig();
    return this.maskPassword(config);
  }

  async getRawConfig(): Promise<any> {
    return this.emailConfigRepo.getConfig();
  }

  async updateConfig(dto: UpdateEmailConfigDto, userId?: any): Promise<any> {
    const existing = await this.emailConfigRepo.getConfig();

    if (existing && !dto.smtp_password) {
      delete (dto as any).smtp_password;
    }

    const payload = buildConfigPayload(dto, [], userId, existing);

    let result: any;
    if (!existing) {
      result = await this.emailConfigRepo.create({
        smtp_host: 'smtp.gmail.com',
        smtp_port: 587,
        smtp_secure: true,
        smtp_username: '',
        smtp_password: '',
        from_email: '',
        from_name: '',
        ...payload,
      });
    } else {
      result = await this.emailConfigRepo.update(existing.id, payload);
    }

    if (!result) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new InternalServerErrorException(
        this.i18n.t('system-config.EMAIL_UPDATE_FAILED', { lang }),
      );
    }

    return this.maskPassword(result);
  }

  private maskPassword(config: any): any {
    if (!config) return config;
    const item = { ...config };
    if (item.smtp_password) {
      item.smtp_password = '******';
    }
    return item;
  }
}

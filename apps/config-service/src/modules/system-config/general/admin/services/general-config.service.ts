import { Injectable, InternalServerErrorException, Logger, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { GeneralConfigRepository } from '../../repositories/general-config.repository';
import { UpdateGeneralConfigDto } from '../dtos/update-general-config.dto';
import { buildConfigPayload } from '../../../helpers/config-payload.helper';

@Injectable()
export class GeneralConfigService {
  private readonly logger = new Logger(GeneralConfigService.name);

  constructor(
    private readonly generalConfigRepo: GeneralConfigRepository,
    private readonly i18n: I18nService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getConfig(): Promise<any> {
    const config = await this.generalConfigRepo.getConfig();
    return config;
  }

  async updateConfig(dto: UpdateGeneralConfigDto, userId?: any): Promise<any> {
    const existing = await this.generalConfigRepo.getConfig();

    const bigIntFields = ['site_country_id', 'site_province_id', 'site_ward_id'];
    const payload = buildConfigPayload(dto, bigIntFields, userId, existing);

    // Atomic upsert avoids the race in which two concurrent first-writes
    // both pass `existing == null` and create duplicate config rows.
    const result = await this.generalConfigRepo.upsert(
      {
        ...payload,
        site_name: payload.site_name || 'My Website',
        timezone: payload.timezone || 'Asia/Ho_Chi_Minh',
        locale: payload.locale || 'vi',
        currency: payload.currency || 'VND',
      },
      payload,
    );

    if (!result) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new InternalServerErrorException(
        this.i18n.t('system-config.GENERAL_UPDATE_FAILED', { lang }),
      );
    }

    await this.clearGeneralConfigCaches();
    return result;
  }

  private async clearGeneralConfigCaches(): Promise<void> {
    try {
      await this.redis?.del('config:public:general');
    } catch (err) {
      this.logger.warn('Failed to clear general config caches', (err as Error).message);
    }
  }
}

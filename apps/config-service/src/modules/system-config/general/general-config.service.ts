import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IGeneralConfigRepository,
  GENERAL_CONFIG_REPOSITORY,
} from './general-config.repository';
import { UpdateGeneralConfigDto } from './dtos/update-general-config.dto';
import { buildConfigPayload } from '../utils/config-payload.helper';

@Injectable()
export class GeneralConfigService {
  constructor(
    @Inject(GENERAL_CONFIG_REPOSITORY)
    private readonly generalConfigRepo: IGeneralConfigRepository,
  ) {}

  async getConfig(): Promise<any> {
    const config = await this.generalConfigRepo.getConfig();
    return config;
  }

  async updateConfig(dto: UpdateGeneralConfigDto, userId?: any): Promise<any> {
    const existing = await this.generalConfigRepo.getConfig();

    const bigIntFields = ['site_country_id', 'site_province_id', 'site_ward_id'];

    const payload = buildConfigPayload(dto, bigIntFields, userId, existing);

    let result: any;
    if (!existing) {
      result = await this.generalConfigRepo.create({
        ...payload,
        site_name: payload.site_name || 'My Website',
        timezone: payload.timezone || 'Asia/Ho_Chi_Minh',
        locale: payload.locale || 'vi',
        currency: payload.currency || 'VND',
      });
    } else {
      result = await this.generalConfigRepo.update(existing.id, payload);
    }

    if (!result) {
      throw new InternalServerErrorException(
        'Failed to create or update general config',
      );
    }

    return result;
  }
}

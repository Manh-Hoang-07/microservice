import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CachedService } from '../../../../../cache/cached.service';
import { GeneralConfigService } from '../../admin/services/general-config.service';

@Injectable()
export class PublicGeneralConfigService extends CachedService {
  constructor(
    private readonly generalConfigService: GeneralConfigService,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getConfig() {
    return this.getOrSet('config:public:general', 600, async () => {
      const config = (await this.generalConfigService.getConfig()) ?? {};
      return this.transform(config);
    });
  }

  private transform(config: any): any {
    if (!config) return config;
    const item = { ...config };

    if (item.contact_channels) {
      if (typeof item.contact_channels === 'string') {
        try {
          item.contact_channels = JSON.parse(item.contact_channels);
        } catch {
          item.contact_channels = [];
        }
      }
      if (!Array.isArray(item.contact_channels)) {
        item.contact_channels = [];
      }
    } else {
      item.contact_channels = [];
    }

    return item;
  }
}

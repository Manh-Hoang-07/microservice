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
      return (await this.generalConfigService.getConfig()) ?? {};
    });
  }
}

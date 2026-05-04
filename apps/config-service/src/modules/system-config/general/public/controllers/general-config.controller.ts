import { Controller, Get } from '@nestjs/common';
import { GeneralConfigService } from '../../admin/services/general-config.service';
import { RedisService } from '@package/redis';
import { Public } from '@package/common';

@Controller('config/general')
export class PublicGeneralConfigController {
  constructor(
    private readonly generalConfigService: GeneralConfigService,
    private readonly redis: RedisService,
  ) {}

  @Public()
  @Get()
  async getConfig() {
    const cacheKey = 'config:public:general';
    try {
      if (this.redis.isEnabled()) {
        const raw = await this.redis.get(cacheKey);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // silent
    }

    const result = (await this.generalConfigService.getConfig()) ?? {};

    try {
      if (this.redis.isEnabled()) {
        await this.redis.set(
          cacheKey,
          JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
          600,
        );
      }
    } catch {
      // silent
    }

    return result;
  }
}

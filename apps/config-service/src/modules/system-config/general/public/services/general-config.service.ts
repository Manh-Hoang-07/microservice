import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { GeneralConfigService } from '../../admin/services/general-config.service';

@Injectable()
export class PublicGeneralConfigService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly generalConfigService: GeneralConfigService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getConfig() {
    return this.getOrSet('config:public:general', 600, async () => {
      return (await this.generalConfigService.getConfig()) ?? {};
    });
  }

  private async getOrSet<T>(key: string, ttl: number, factory: () => Promise<T>): Promise<T> {
    try {
      if (this.redis?.isEnabled()) {
        const raw = await this.redis.get(key);
        if (raw) return JSON.parse(raw);
      }
    } catch {}

    const existing = this.inflight.get(key);
    if (existing) return existing as Promise<T>;

    const promise = factory().then(async (result) => {
      try {
        if (this.redis?.isEnabled()) {
          await this.redis.set(
            key,
            JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
            ttl,
          );
        }
      } catch {}
      return result;
    }).finally(() => {
      this.inflight.delete(key);
    });

    this.inflight.set(key, promise);
    return promise;
  }
}

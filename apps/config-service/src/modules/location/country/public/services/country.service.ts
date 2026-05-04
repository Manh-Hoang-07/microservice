import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CountryService } from '../../admin/services/country.service';
import { ProvinceService } from '../../../province/admin/services/province.service';

@Injectable()
export class PublicCountryService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly countryService: CountryService,
    private readonly provinceService: ProvinceService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    return this.getOrSet('config:public:countries', 86400, async () => {
      return this.countryService.getList({ ...query, status: 'active' });
    });
  }

  async getProvinces(countryId: string, query: any = {}) {
    return this.getOrSet(`config:public:provinces:${countryId}`, 86400, async () => {
      return this.provinceService.getList({
        ...query,
        country_id: countryId,
        status: 'active',
      });
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

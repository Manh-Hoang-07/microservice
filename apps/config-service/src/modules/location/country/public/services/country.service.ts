import { Injectable, Optional } from '@nestjs/common';
import { CachedService, RedisService } from '@package/redis';
import { CountryService } from '../../admin/services/country.service';
import { ProvinceService } from '../../../province/admin/services/province.service';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

/** Province-scoped cache helper so provinces read here share the `provinces` version key. */
class ProvinceCache extends CachedService {
  protected readonly cacheEntity = 'provinces';
  protected readonly cacheNamespace = 'config:public';
  constructor(redis?: RedisService) {
    super(redis);
  }
  read<T>(filter: object, loader: () => Promise<T>) {
    return this.cachedList(filter, {}, 86400, loader);
  }
}

@Injectable()
export class PublicCountryService extends CachedService {
  protected readonly cacheEntity = 'countries';
  protected readonly cacheNamespace = 'config:public';

  private readonly provinceCache: ProvinceCache;

  constructor(
    private readonly countryService: CountryService,
    private readonly provinceService: ProvinceService,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
    this.provinceCache = new ProvinceCache(redis);
  }

  async getList(query: any = {}) {
    const filter = { ...query, status: BasicStatus.active };
    return this.cachedList(filter, {}, 86400, async () =>
      this.countryService.getList(filter),
    );
  }

  async getProvinces(countryId: string, query: any = {}) {
    const filter = { ...query, countryId, status: BasicStatus.active };
    return this.provinceCache.read(filter, async () =>
      this.provinceService.getList(filter),
    );
  }
}

import { Injectable, Optional } from '@nestjs/common';
import { CachedService, RedisService } from '@package/redis';
import { ProvinceService } from '../../admin/services/province.service';
import { WardService } from '../../../ward/admin/services/ward.service';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

/** Ward-scoped cache helper so wards read here share the `wards` version key. */
class WardCache extends CachedService {
  protected readonly cacheEntity = 'wards';
  protected readonly cacheNamespace = 'config:public';
  constructor(redis?: RedisService) {
    super(redis);
  }
  read<T>(filter: object, loader: () => Promise<T>) {
    return this.cachedList(filter, {}, 86400, loader);
  }
}

@Injectable()
export class PublicProvinceService extends CachedService {
  protected readonly cacheEntity = 'provinces';
  protected readonly cacheNamespace = 'config:public';

  private readonly wardCache: WardCache;

  constructor(
    private readonly provinceService: ProvinceService,
    private readonly wardService: WardService,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
    this.wardCache = new WardCache(redis);
  }

  async getList(query: any = {}) {
    const filter = { ...query, status: BasicStatus.active };
    // Version-aware, query-specific key: page/limit/search/sort/countryId all
    // participate so different queries never collide or serve stale data.
    return this.cachedList(filter, {}, 86400, async () =>
      this.provinceService.getList(filter),
    );
  }

  async getByCountry(countryId: string, query: any = {}) {
    const filter = { ...query, countryId, status: BasicStatus.active };
    return this.cachedList(filter, {}, 86400, async () =>
      this.provinceService.getList(filter),
    );
  }

  async getWards(provinceId: string, query: any = {}) {
    const filter = { ...query, provinceId, status: BasicStatus.active };
    // Wards belong to the ward entity — key/invalidate under `wards`.
    return this.wardCache.read(filter, async () => this.wardService.getList(filter));
  }
}

import { Injectable, Optional } from '@nestjs/common';
import { CachedService, RedisService } from '@package/redis';
import { WardService } from '../../admin/services/ward.service';
import { BasicStatus } from '../../../../../common/enums/basic-status.enum';

@Injectable()
export class PublicWardService extends CachedService {
  protected readonly cacheEntity = 'wards';
  protected readonly cacheNamespace = 'config:public';

  constructor(
    private readonly wardService: WardService,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const filter = { ...query, status: BasicStatus.active };
    return this.cachedList(filter, {}, 86400, async () =>
      this.wardService.getList(filter),
    );
  }

  async getByProvince(provinceId: string, query: any = {}) {
    const filter = { ...query, provinceId, status: BasicStatus.active };
    return this.cachedList(filter, {}, 86400, async () =>
      this.wardService.getList(filter),
    );
  }
}

import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { PartnerFilter, PartnerRepository } from '../../repositories/partner.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicPartnerService extends CachedService {
  protected readonly cacheEntity = 'partner';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly partnerRepo: PartnerRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: PartnerFilter = { status: BasicStatus.active };
    if (query.type) filter.type = query.type;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.partnerRepo.findMany(filter, options),
        this.partnerRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.cachedDetail(id.toString(), 600, async () => {
      const item = await this.partnerRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Partner not found');
      return item;
    });
  }
}

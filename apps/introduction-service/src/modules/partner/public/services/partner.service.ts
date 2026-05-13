import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { PartnerFilter, PartnerRepository } from '../../repositories/partner.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicPartnerService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly partnerRepo: PartnerRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async getOrSet<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
    const cached = await this.redis?.get(key).catch(() => null);
    if (cached) return JSON.parse(cached);
    const existing = this.inflight.get(key);
    if (existing) return existing;
    const promise = loader().then(async (result) => {
      this.inflight.delete(key);
      await this.redis?.set(key, JSON.stringify(result), ttl).catch(() => {});
      return result;
    }).catch((err) => {
      this.inflight.delete(key);
      throw err;
    });
    this.inflight.set(key, promise);
    return promise;
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: PartnerFilter = { status: BasicStatus.active };
    if (query.type) filter.type = query.type;

    return this.getOrSet('introduction:public:partner:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.partnerRepo.findMany(filter, options),
        this.partnerRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.getOrSet(`introduction:public:partner:detail:${id}`, 600, async () => {
      const item = await this.partnerRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Partner not found');
      return item;
    });
  }
}

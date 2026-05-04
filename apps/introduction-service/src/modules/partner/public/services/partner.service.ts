import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { PartnerFilter, PartnerRepository } from '../../repositories/partner.repository';

@Injectable()
export class PublicPartnerService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly partnerRepo: PartnerRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async getOrSet<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
    if (this.redis?.isEnabled()) {
      const cached = await this.redis.get(key);
      if (cached) return JSON.parse(cached);
    }
    const existing = this.inflight.get(key);
    if (existing) return existing;
    const promise = loader().then(async (result) => {
      this.inflight.delete(key);
      if (this.redis?.isEnabled()) {
        await this.redis.set(key, JSON.stringify(result), ttl).catch(() => {});
      }
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

    const filter: PartnerFilter = { status: 'active' };
    if (query.type) filter.type = query.type;

    return this.getOrSet('intro:public:partner:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.partnerRepo.findMany(filter, options),
        this.partnerRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: any) {
    return this.getOrSet(`intro:public:partner:detail:${id}`, 600, async () => {
      const item = await this.partnerRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Partner not found');
      return item;
    });
  }
}

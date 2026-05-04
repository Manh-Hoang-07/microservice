import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { CertificateFilter, CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class PublicCertificateService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly certificateRepo: CertificateRepository,
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

    const filter: CertificateFilter = { status: 'active' };
    if (query.type) filter.type = query.type;

    return this.getOrSet('intro:public:certificate:list', 300, async () => {
      const [data, total] = await Promise.all([
        this.certificateRepo.findMany(filter, options),
        this.certificateRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: any) {
    return this.getOrSet(`intro:public:certificate:detail:${id}`, 600, async () => {
      const item = await this.certificateRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Certificate not found');
      return item;
    });
  }
}

import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { PrimaryKey } from 'src/types';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { CertificateFilter, CertificateRepository } from '../../repositories/certificate.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicCertificateService extends CachedService {
  protected readonly cacheEntity = 'certificate';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly certificateRepo: CertificateRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CertificateFilter = { status: BasicStatus.active };
    if (query.type) filter.type = query.type;

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.certificateRepo.findMany(filter, options),
        this.certificateRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getOne(id: PrimaryKey) {
    return this.cachedDetail(id.toString(), 600, async () => {
      const item = await this.certificateRepo.findActiveById(id);
      if (!item) throw new NotFoundException('Certificate not found');
      return item;
    });
  }
}

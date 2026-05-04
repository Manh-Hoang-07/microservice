import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { CertificateFilter, CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class AdminCertificateService {
  constructor(
    private readonly certificateRepo: CertificateRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async clearCache(id?: any) {
    if (!this.redis?.isEnabled()) return;
    await this.redis.del('intro:public:certificate:list').catch(() => {});
    if (id !== undefined) {
      await this.redis.del(`intro:public:certificate:detail:${id}`).catch(() => {});
    }
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CertificateFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.type) filter.type = query.type;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.certificateRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.certificateRepo.findById(id);
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }

  async create(dto: CreateCertificateDto) {
    const result = await this.certificateRepo.create({ ...dto, status: dto.status || 'active', sort_order: dto.sort_order ?? 0 });
    await this.clearCache();
    return result;
  }

  async update(id: any, dto: UpdateCertificateDto) {
    await this.getOne(id);
    const result = await this.certificateRepo.update(id, dto);
    await this.clearCache(id);
    return result;
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.certificateRepo.delete(id);
    await this.clearCache(id);
    return { success: true };
  }
}

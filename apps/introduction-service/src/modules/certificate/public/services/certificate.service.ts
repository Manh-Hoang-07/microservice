import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CertificateFilter, CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class PublicCertificateService {
  constructor(private readonly certificateRepo: CertificateRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: CertificateFilter = { status: 'active' };
    if (query.type) filter.type = query.type;

    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(filter, options),
      this.certificateRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.certificateRepo.findActiveById(id);
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }
}

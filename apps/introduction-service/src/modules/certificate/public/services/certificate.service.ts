import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class PublicCertificateService {
  constructor(private readonly certificateRepo: CertificateRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
    if (query.type) where.type = query.type;

    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(where, options),
      this.certificateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.certificateRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }
}

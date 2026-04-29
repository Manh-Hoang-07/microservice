import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class PublicCertificateService {
  constructor(private readonly certificateRepo: CertificateRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.type) where.type = query.type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { issued_by: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(where, { skip, take: limit }),
      this.certificateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.certificateRepo.findFirst({ id, status: 'active' });
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }
}

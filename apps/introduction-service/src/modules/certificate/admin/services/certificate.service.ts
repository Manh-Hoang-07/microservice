import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { createPaginationMeta } from '@package/common';
import { CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class AdminCertificateService {
  constructor(private readonly certificateRepo: CertificateRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { issued_by: { contains: query.search } },
        { certificate_number: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(where, { skip, take: limit }),
      this.certificateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.certificateRepo.findById(id);
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }

  async create(dto: CreateCertificateDto) {
    return this.certificateRepo.create({
      name: dto.name,
      image: dto.image,
      issued_by: dto.issued_by,
      issued_date: dto.issued_date ? new Date(dto.issued_date) : undefined,
      expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
      certificate_number: dto.certificate_number,
      description: dto.description,
      type: dto.type,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: bigint, dto: UpdateCertificateDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    if (dto.issued_date) data.issued_date = new Date(dto.issued_date);
    if (dto.expiry_date) data.expiry_date = new Date(dto.expiry_date);

    return this.certificateRepo.update(id, data);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.certificateRepo.delete(id);
    return { success: true };
  }
}

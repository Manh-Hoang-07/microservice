import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { CertificateRepository } from '../../repositories/certificate.repository';

@Injectable()
export class AdminCertificateService {
  constructor(private readonly certificateRepo: CertificateRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;

    const [data, total] = await Promise.all([
      this.certificateRepo.findMany(where, options),
      this.certificateRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
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

  async update(id: PrimaryKey, dto: UpdateCertificateDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    if (dto.issued_date) data.issued_date = new Date(dto.issued_date);
    if (dto.expiry_date) data.expiry_date = new Date(dto.expiry_date);

    return this.certificateRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.certificateRepo.delete(id);
    return { success: true };
  }
}

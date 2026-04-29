import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class CertificateRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(where: Prisma.CertificateWhereInput, options: { skip: number; take: number }) {
    return this.prisma.certificate.findMany({
      where,
      orderBy: { sort_order: 'asc' },
      skip: options.skip,
      take: options.take,
    });
  }

  count(where: Prisma.CertificateWhereInput) {
    return this.prisma.certificate.count({ where });
  }

  findById(id: bigint) {
    return this.prisma.certificate.findUnique({ where: { id } });
  }

  findFirst(where: Prisma.CertificateWhereInput) {
    return this.prisma.certificate.findFirst({ where });
  }

  create(data: Prisma.CertificateCreateInput) {
    return this.prisma.certificate.create({ data });
  }

  update(id: bigint, data: Prisma.CertificateUpdateInput) {
    return this.prisma.certificate.update({ where: { id }, data });
  }

  delete(id: bigint) {
    return this.prisma.certificate.delete({ where: { id } });
  }
}

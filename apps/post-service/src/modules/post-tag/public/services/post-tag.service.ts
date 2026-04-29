import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class PublicPostTagService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.postTag.findMany({
      where: { is_active: true },
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: 'asc' },
    });
    return { data };
  }
}

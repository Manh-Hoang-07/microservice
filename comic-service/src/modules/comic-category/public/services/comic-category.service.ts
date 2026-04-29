import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class PublicCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const data = await this.prisma.comicCategory.findMany({
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { name: 'asc' },
    });
    return { data };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { AboutSectionRepository } from '../../repositories/about-section.repository';

@Injectable()
export class PublicAboutService {
  constructor(private readonly aboutRepo: AboutSectionRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.section_type) where.section_type = query.section_type;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.aboutRepo.findMany(where, { skip, take: limit }),
      this.aboutRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.aboutRepo.findFirst({ slug, status: 'active' });
    if (!item) throw new NotFoundException('About section not found');
    return item;
  }
}

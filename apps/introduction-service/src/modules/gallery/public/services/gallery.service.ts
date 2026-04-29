import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta } from '@package/common';
import { GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class PublicGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = { status: 'active' };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.galleryRepo.findMany(where, { skip, take: limit }),
      this.galleryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.galleryRepo.findFirst({ slug, status: 'active' });
    if (!item) throw new NotFoundException('Gallery not found');
    return item;
  }
}

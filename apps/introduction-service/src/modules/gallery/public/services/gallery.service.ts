import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class PublicGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: 'active' };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.galleryRepo.findMany(where, options),
      this.galleryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.galleryRepo.findFirst({ slug, status: 'active' });
    if (!item) throw new NotFoundException('Gallery not found');
    return item;
  }
}

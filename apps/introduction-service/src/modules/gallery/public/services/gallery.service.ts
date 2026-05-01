import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { GalleryFilter, GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class PublicGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: GalleryFilter = { status: 'active' };
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.galleryRepo.findMany(filter, options),
      this.galleryRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.galleryRepo.findActiveBySlug(slug);
    if (!item) throw new NotFoundException('Gallery not found');
    return item;
  }
}

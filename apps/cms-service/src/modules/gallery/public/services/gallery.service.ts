import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { GalleryFilter, GalleryRepository } from '../../repositories/gallery.repository';
import { BasicStatus } from '../../../../common/enums/status.enum';

@Injectable()
export class PublicGalleryService extends CachedService {
  protected readonly cacheEntity = 'gallery';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly galleryRepo: GalleryRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: GalleryFilter = { status: BasicStatus.active };
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.galleryRepo.findMany(filter, options),
        this.galleryRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  async getBySlug(slug: string) {
    return this.cachedDetail(slug, 600, async () => {
      const item = await this.galleryRepo.findActiveBySlug(slug);
      if (!item) throw new NotFoundException('Gallery not found');
      return item;
    });
  }
}

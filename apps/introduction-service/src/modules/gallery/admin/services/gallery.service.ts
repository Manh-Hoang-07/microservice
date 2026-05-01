import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { GalleryFilter, GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class AdminGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: GalleryFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.galleryRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.galleryRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.galleryRepo.findById(id);
    if (!item) throw new NotFoundException('Gallery not found');
    return item;
  }

  async create(dto: CreateGalleryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.title, {
      findOne: (filter: any) => this.galleryRepo.findBySlug(filter.slug),
    });

    return this.galleryRepo.create({ ...dto, slug, images: dto.images ?? [] });
  }

  async update(id: any, dto: UpdateGalleryDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.galleryRepo.findBySlug(filter.slug) },
        id,
      );
    }

    return this.galleryRepo.update(id, data);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.galleryRepo.delete(id);
    return { success: true };
  }
}

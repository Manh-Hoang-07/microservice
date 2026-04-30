import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class AdminGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.galleryRepo.findMany(where, options),
      this.galleryRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.galleryRepo.findById(id);
    if (!item) throw new NotFoundException('Gallery not found');
    return item;
  }

  async create(dto: CreateGalleryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.title, {
      findOne: (filter: any) => this.galleryRepo.findFirst(filter),
    });

    return this.galleryRepo.create({
      title: dto.title,
      slug,
      description: dto.description,
      cover_image: dto.cover_image,
      images: dto.images ?? [],
      featured: dto.featured ?? false,
      status: dto.status || 'active',
      sort_order: dto.sort_order ?? 0,
    });
  }

  async update(id: PrimaryKey, dto: UpdateGalleryDto) {
    await this.getOne(id);

    const data: any = { ...dto };

    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
        findOne: (filter: any) => this.galleryRepo.findFirst(filter),
      }, id);
    }

    return this.galleryRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.galleryRepo.delete(id);
    return { success: true };
  }
}

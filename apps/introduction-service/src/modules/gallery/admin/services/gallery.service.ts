import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { SlugHelper, createPaginationMeta } from '@package/common';
import { GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class AdminGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
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

  async getOne(id: bigint) {
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

  async update(id: bigint, dto: UpdateGalleryDto) {
    await this.getOne(id);

    const data: any = { ...dto };

    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
        findOne: (filter: any) => this.galleryRepo.findFirst(filter),
      }, id);
    }

    return this.galleryRepo.update(id, data);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.galleryRepo.delete(id);
    return { success: true };
  }
}

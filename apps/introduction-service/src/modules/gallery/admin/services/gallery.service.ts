import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { GalleryFilter, GalleryRepository } from '../../repositories/gallery.repository';

@Injectable()
export class AdminGalleryService {
  constructor(private readonly galleryRepo: GalleryRepository) {}

  private mapP2002(err: unknown): never {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new BadRequestException('Slug already in use');
    }
    throw err;
  }

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
    try {
      return await this.galleryRepo.create({ ...dto, slug, images: dto.images ?? [] });
    } catch (err) {
      this.mapP2002(err);
    }
  }

  async update(id: any, dto: UpdateGalleryDto) {
    const current = await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    const titleChanged = dto.title !== undefined && dto.title !== (current as any).title;
    if (dto.slug || titleChanged) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.galleryRepo.findBySlug(filter.slug) },
        id,
      );
    }

    try {
      return await this.galleryRepo.update(id, data);
    } catch (err) {
      this.mapP2002(err);
    }
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.galleryRepo.delete(id);
    return { success: true };
  }
}

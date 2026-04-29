import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
import { SlugHelper, createPaginationMeta } from '@package/common';
import { ComicRepository } from '../../repositories/comic.repository';

@Injectable()
export class AdminComicService {
  constructor(private readonly comicRepo: ComicRepository) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
        { author: { contains: query.search } },
      ];
    }
    if (query.is_featured !== undefined) {
      where.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }

    const [data, total] = await Promise.all([
      this.comicRepo.findMany(where, { skip, take: limit }),
      this.comicRepo.count(where),
    ]);

    return {
      data: data.map((c) => this.transform(c)),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async getSimpleList(query: any) {
    const limit = Math.max(Number(query.limit) || 50, 1);
    const where: any = {};
    if (query.search) {
      where.OR = [
        { title: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }

    const data = await this.comicRepo.findSimpleMany(where, limit);
    return { data };
  }

  async getOne(id: bigint) {
    const comic = await this.comicRepo.findById(id);
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  async create(dto: CreateComicDto) {
    const slug = await SlugHelper.uniqueSlug(dto.title, {
      findOne: (filter: any) => this.comicRepo.findFirst(filter),
    });

    const comic = await this.comicRepo.create({
      title: dto.title,
      slug,
      description: dto.description,
      cover_image: dto.cover_image,
      author: dto.author,
      status: dto.status || 'draft',
      is_featured: dto.is_featured || false,
    });

    await this.comicRepo.createStats(comic.id);

    if (dto.category_ids?.length) {
      await this.comicRepo.syncCategories(comic.id, dto.category_ids);
    }

    return this.getOne(comic.id);
  }

  async update(id: bigint, dto: UpdateComicDto) {
    await this.getOne(id);

    const data: any = { ...dto };
    delete data.category_ids;

    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.comicRepo.findFirst(filter) },
        id,
      );
    }

    await this.comicRepo.update(id, data);

    if (dto.category_ids !== undefined) {
      await this.comicRepo.syncCategories(id, dto.category_ids);
    }

    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.comicRepo.delete(id);
    return { success: true };
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };
    if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      item.category_ids = item.categories.map((c: any) => c.id);
      delete item.categoryLinks;
    }
    return item;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { ComicFilter, ComicRepository } from '../../repositories/comic.repository';

@Injectable()
export class AdminComicService {
  constructor(private readonly comicRepo: ComicRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter = this.buildFilter(query);

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.comicRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.comicRepo.count(filter),
    ]);

    return {
      data: data.map((c) => this.transform(c)),
      meta: createPaginationMeta(options, total),
    };
  }

  async getSimpleList(query: any = {}) {
    const limit = Math.max(Number(query.limit) || 50, 1);
    const filter = this.buildFilter(query);
    const data = await this.comicRepo.findSimpleMany(filter, limit);
    return { data };
  }

  async getOne(id: any) {
    const comic = await this.comicRepo.findById(id);
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  async create(dto: CreateComicDto) {
    const slug = await SlugHelper.uniqueSlug(dto.title, {
      findOne: (filter: any) => this.comicRepo.findBySlugSimple(filter.slug),
    });

    const comic = await this.comicRepo.create({ ...dto, slug });
    await this.comicRepo.createStats(comic.id);

    if (dto.category_ids?.length) {
      await this.comicRepo.syncCategories(comic.id, dto.category_ids);
    }

    return this.getOne(comic.id);
  }

  async update(id: any, dto: UpdateComicDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.comicRepo.findBySlugSimple(filter.slug) },
        id,
      );
    }

    await this.comicRepo.update(id, data);

    if (dto.category_ids !== undefined) {
      await this.comicRepo.syncCategories(id, dto.category_ids);
    }

    return this.getOne(id);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.comicRepo.delete(id);
    return { success: true };
  }

  private buildFilter(query: any): ComicFilter {
    const filter: ComicFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.author) filter.author = query.author;
    if (query.is_featured !== undefined) {
      filter.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.category_id) filter.category_id = query.category_id;
    return filter;
  }

  private transform(entity: any) {
    if (!entity) return null;
    const item = { ...entity };
    if (Array.isArray(item.categoryLinks)) {
      item.categories = item.categoryLinks.map((l: any) => l?.category).filter(Boolean);
      item.category_ids = item.categories.map((c: any) => c.id);
      delete item.categoryLinks;
    }
    return item;
  }
}

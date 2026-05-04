import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
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
    const limit = Math.min(Math.max(Number(query.limit) || 50, 1), 200);
    const filter = this.buildFilter(query);
    const data = await this.comicRepo.findSimpleMany(filter, limit);
    return { data };
  }

  async getOne(id: any) {
    const comic = await this.comicRepo.findById(id);
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  /**
   * Transactional create: comic + Stats + categoryLinks land atomically.
   * Previously these were 3 separate Prisma calls; a crash between them
   * left orphans. The slug pre-check also raced with concurrent creates
   * and surfaced raw `P2002` to the client — now caught and translated to
   * 400 with one retry on the unique-slug collision.
   */
  async create(dto: CreateComicDto) {
    let attempt = 0;
    while (true) {
      const slug = await SlugHelper.uniqueSlug(dto.title, {
        findOne: (filter: any) => this.comicRepo.findBySlugSimple(filter.slug),
      });

      try {
        const created = await this.comicRepo.createWithRelations(
          { ...dto, slug },
          dto.category_ids,
        );
        return this.getOne(created.id);
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002' &&
          attempt < 2
        ) {
          attempt++;
          continue;
        }
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          throw new BadRequestException('Slug already in use');
        }
        throw err;
      }
    }
  }

  async update(id: any, dto: UpdateComicDto) {
    const current = await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    // Only regenerate slug when title actually changed AND no explicit
    // slug was supplied — previously every update with `title` silently
    // rewrote the slug even on rename-to-self.
    const titleChanged = dto.title !== undefined && dto.title !== (current as any).title;
    if (dto.slug || titleChanged) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.title || '',
        { findOne: (filter: any) => this.comicRepo.findBySlugSimple(filter.slug) },
        id,
      );
    }

    try {
      await this.comicRepo.updateWithRelations(id, data, dto.category_ids);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new BadRequestException('Slug already in use');
      }
      throw err;
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

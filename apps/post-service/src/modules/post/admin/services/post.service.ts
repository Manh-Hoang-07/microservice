import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PostFilter, PostRepository } from '../../repositories/post.repository';

@Injectable()
export class AdminPostService {
  constructor(private readonly postRepo: PostRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter = this.buildFilter(query);

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.postRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.postRepo.count(filter),
    ]);

    return {
      data: data.map((p) => this.transform(p)),
      meta: createPaginationMeta(options, total),
    };
  }

  async getSimpleList(query: any = {}) {
    const limit = Math.min(Math.max(Number(query.limit) || 50, 1), 200);
    const filter = this.buildFilter(query);
    const data = await this.postRepo.findSimpleMany(filter, limit);
    return { data };
  }

  async getOne(id: any) {
    const post = await this.postRepo.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return this.transform(post);
  }

  /**
   * Creates the post + Stats row + category/tag links atomically.
   *
   * Previously these were 4 separate Prisma calls. A crash between them
   * left orphans (post without stats, post without categories) in DB. The
   * slug pre-check also raced with concurrent creates and surfaced raw
   * `P2002` to the client — now caught and translated to 400 with retry.
   */
  async create(dto: CreatePostDto) {
    let attempt = 0;
    while (true) {
      const slug = await SlugHelper.uniqueSlug(dto.name, {
        findOne: (filter: any) => this.postRepo.findBySlugSimple(filter.slug),
      });

      try {
        return await this.postRepo.client.$transaction(async (tx) => {
          const post = await this.postRepo.create({ ...dto, slug }, tx);
          await this.postRepo.createStats(post.id, tx);
          if (dto.category_ids?.length) {
            await this.postRepo.syncCategories(post.id, dto.category_ids, tx);
          }
          if (dto.tag_ids?.length) {
            await this.postRepo.syncTags(post.id, dto.tag_ids, tx);
          }
          // Re-read inside the same tx so the response includes relations.
          return tx.post.findUnique({
            where: { id: post.id },
            include: {
              stats: true,
              categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
              tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
            },
          });
        }).then((post) => this.transform(post));
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002' &&
          attempt < 2
        ) {
          // Concurrent create stole our slug — retry once with a fresh slug.
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

  async update(id: any, dto: UpdatePostDto) {
    const current = await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    // Only regenerate slug when the name actually changed AND no explicit
    // slug was provided. Previously every update with `name` set rewrote
    // the slug even when the name was identical.
    const nameChanged = dto.name !== undefined && dto.name !== (current as any).name;
    if (dto.slug || nameChanged) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.name || '',
        { findOne: (filter: any) => this.postRepo.findBySlugSimple(filter.slug) },
        id,
      );
    }

    try {
      await this.postRepo.client.$transaction(async (tx) => {
        await this.postRepo.update(id, data, tx);
        if (dto.category_ids !== undefined) {
          await this.postRepo.syncCategories(id, dto.category_ids, tx);
        }
        if (dto.tag_ids !== undefined) {
          await this.postRepo.syncTags(id, dto.tag_ids, tx);
        }
      });
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
    await this.postRepo.delete(id);
    return { success: true };
  }

  private buildFilter(query: any): PostFilter {
    const filter: PostFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.post_type) filter.post_type = query.post_type;
    if (query.is_featured !== undefined) {
      filter.is_featured = query.is_featured === 'true' || query.is_featured === true;
    }
    if (query.is_pinned !== undefined) {
      filter.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
    }
    if (query.category_id) filter.category_id = query.category_id;
    if (query.tag_id) filter.tag_id = query.tag_id;
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
    if (Array.isArray(item.tagLinks)) {
      item.tags = item.tagLinks.map((l: any) => l?.tag).filter(Boolean);
      item.tag_ids = item.tags.map((t: any) => t.id);
      delete item.tagLinks;
    }
    return item;
  }
}

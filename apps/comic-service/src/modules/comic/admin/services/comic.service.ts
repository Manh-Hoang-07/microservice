import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
import { SlugHelper } from '@package/common';
import { createPaginationMeta, toPrimaryKey } from '@package/common';

@Injectable()
export class AdminComicService {
  constructor(private readonly prisma: PrismaService) {}

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
      this.prisma.comic.findMany({
        where,
        include: {
          stats: true,
          categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
        },
        orderBy: { updated_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.comic.count({ where }),
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

    const data = await this.prisma.comic.findMany({
      where,
      select: { id: true, title: true, slug: true, status: true },
      orderBy: { title: 'asc' },
      take: limit,
    });

    return { data };
  }

  async getOne(id: bigint) {
    const comic = await this.prisma.comic.findUnique({
      where: { id },
      include: {
        stats: true,
        categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
      },
    });
    if (!comic) throw new NotFoundException('Comic not found');
    return this.transform(comic);
  }

  async create(dto: CreateComicDto) {
    const slug = await SlugHelper.uniqueSlug(dto.title, {
      findOne: (filter: any) => this.prisma.comic.findFirst({ where: filter }),
    });

    const comic = await this.prisma.comic.create({
      data: {
        title: dto.title,
        slug,
        description: dto.description,
        cover_image: dto.cover_image,
        author: dto.author,
        status: dto.status || 'draft',
        is_featured: dto.is_featured || false,
      },
    });

    // Initialize stats
    await this.prisma.comicStats.create({
      data: { comic_id: comic.id },
    });

    // Sync categories
    if (dto.category_ids?.length) {
      await this.syncCategories(comic.id, dto.category_ids);
    }

    return this.getOne(comic.id);
  }

  async update(id: bigint, dto: UpdateComicDto) {
    await this.getOne(id); // check exists

    const data: any = { ...dto };
    delete data.category_ids;

    if (dto.title || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
        findOne: (filter: any) => this.prisma.comic.findFirst({ where: filter }),
      }, id);
    }

    await this.prisma.comic.update({ where: { id }, data });

    if (dto.category_ids !== undefined) {
      await this.syncCategories(id, dto.category_ids);
    }

    return this.getOne(id);
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.comic.delete({ where: { id } });
    return { success: true };
  }

  private async syncCategories(comicId: bigint, categoryIds: number[]) {
    await this.prisma.comicCategoryOnComic.deleteMany({ where: { comic_id: comicId } });
    if (categoryIds.length > 0) {
      await this.prisma.comicCategoryOnComic.createMany({
        data: categoryIds.map((catId) => ({
          comic_id: comicId,
          comic_category_id: toPrimaryKey(catId),
        })),
      });
    }
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

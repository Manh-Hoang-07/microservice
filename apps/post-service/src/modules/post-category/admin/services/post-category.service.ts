import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostCategoryDto } from '../dtos/create-post-category.dto';
import { UpdatePostCategoryDto } from '../dtos/update-post-category.dto';
import { SlugHelper } from '@package/common';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminPostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
      ];
    }
    if (query.parent_id !== undefined) {
      where.parent_id = query.parent_id === 'null' ? null : BigInt(query.parent_id);
    }

    const [data, total] = await Promise.all([
      this.prisma.postCategory.findMany({
        where,
        include: { children: { orderBy: { sort_order: 'asc' } } },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.postCategory.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const category = await this.prisma.postCategory.findUnique({
      where: { id },
      include: { children: { orderBy: { sort_order: 'asc' } } },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreatePostCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.prisma.postCategory.findFirst({ where: filter }),
    });

    return this.prisma.postCategory.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        parent_id: dto.parent_id ? BigInt(dto.parent_id) : null,
        is_active: dto.is_active ?? true,
        sort_order: dto.sort_order ?? 0,
        seo_title: dto.seo_title,
        seo_description: dto.seo_description,
        seo_keywords: dto.seo_keywords,
      },
    });
  }

  async update(id: bigint, dto: UpdatePostCategoryDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.parent_id !== undefined) {
      data.parent_id = dto.parent_id ? BigInt(dto.parent_id) : null;
    }

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(dto.name, {
        findOne: (filter: any) => this.prisma.postCategory.findFirst({ where: filter }),
      }, id);
    }

    return this.prisma.postCategory.update({ where: { id }, data });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.postCategory.delete({ where: { id } });
    return { success: true };
  }
}

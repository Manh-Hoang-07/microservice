import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { SlugHelper } from '../../../../common/slug.helper';
import { createPaginationMeta } from '../../../../common/pagination.helper';

@Injectable()
export class AdminCategoryService {
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

    const [data, total] = await Promise.all([
      this.prisma.comicCategory.findMany({ where, orderBy: { name: 'asc' }, skip, take: limit }),
      this.prisma.comicCategory.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const category = await this.prisma.comicCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const slug = await SlugHelper.uniqueSlug(dto.name, {
      findOne: (filter: any) => this.prisma.comicCategory.findFirst({ where: filter }),
    });

    return this.prisma.comicCategory.create({
      data: { name: dto.name, slug, description: dto.description },
    });
  }

  async update(id: bigint, dto: UpdateCategoryDto) {
    await this.getOne(id);
    const data: any = { ...dto };

    if (dto.name) {
      data.slug = await SlugHelper.uniqueSlug(dto.name, {
        findOne: (filter: any) => this.prisma.comicCategory.findFirst({ where: filter }),
      }, id);
    }

    return this.prisma.comicCategory.update({ where: { id }, data });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.comicCategory.delete({ where: { id } });
    return { success: true };
  }
}

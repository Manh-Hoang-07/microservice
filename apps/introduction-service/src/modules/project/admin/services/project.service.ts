import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SlugHelper } from '@package/common';
import { createPaginationMeta } from '@package/common';

@Injectable()
export class AdminProjectService {
  constructor(private readonly prisma: PrismaService) {}

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
        { name: { contains: query.search } },
        { slug: { contains: query.search } },
        { client_name: { contains: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        include: { testimonials: true },
        orderBy: { sort_order: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.project.count({ where }),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getOne(id: bigint) {
    const item = await this.prisma.project.findUnique({
      where: { id },
      include: { testimonials: true },
    });
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  async create(dto: CreateProjectDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.name, {
      findOne: (filter: any) => this.prisma.project.findFirst({ where: filter }),
    });

    return this.prisma.project.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        short_description: dto.short_description,
        cover_image: dto.cover_image,
        location: dto.location,
        area: dto.area,
        start_date: dto.start_date ? new Date(dto.start_date) : undefined,
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
        status: dto.status || 'planning',
        client_name: dto.client_name,
        budget: dto.budget,
        images: dto.images ?? [],
        featured: dto.featured ?? false,
        sort_order: dto.sort_order ?? 0,
        seo_title: dto.seo_title,
        seo_description: dto.seo_description,
        seo_keywords: dto.seo_keywords,
      },
      include: { testimonials: true },
    });
  }

  async update(id: bigint, dto: UpdateProjectDto) {
    await this.getOne(id);

    const data: any = { ...dto };

    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.name || '', {
        findOne: (filter: any) => this.prisma.project.findFirst({ where: filter }),
      }, id);
    }

    if (dto.start_date) data.start_date = new Date(dto.start_date);
    if (dto.end_date) data.end_date = new Date(dto.end_date);

    return this.prisma.project.update({
      where: { id },
      data,
      include: { testimonials: true },
    });
  }

  async delete(id: bigint) {
    await this.getOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { success: true };
  }
}

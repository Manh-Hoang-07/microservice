import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ProjectRepository } from '../../repositories/project.repository';

@Injectable()
export class AdminProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.projectRepo.findMany(where, options),
      this.projectRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.projectRepo.findById(id);
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  async create(dto: CreateProjectDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.name, {
      findOne: (filter: any) => this.projectRepo.findFirst(filter),
    });

    return this.projectRepo.create({
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
    });
  }

  async update(id: PrimaryKey, dto: UpdateProjectDto) {
    await this.getOne(id);

    const data: any = { ...dto };

    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(dto.slug || dto.name || '', {
        findOne: (filter: any) => this.projectRepo.findFirst(filter),
      }, id);
    }

    if (dto.start_date) data.start_date = new Date(dto.start_date);
    if (dto.end_date) data.end_date = new Date(dto.end_date);

    return this.projectRepo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.projectRepo.delete(id);
    return { success: true };
  }
}

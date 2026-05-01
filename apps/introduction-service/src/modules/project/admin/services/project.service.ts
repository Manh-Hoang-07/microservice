import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { ProjectFilter, ProjectRepository } from '../../repositories/project.repository';

@Injectable()
export class AdminProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ProjectFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.projectRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.projectRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: any) {
    const item = await this.projectRepo.findById(id);
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  async create(dto: CreateProjectDto) {
    const slug = await SlugHelper.uniqueSlug(dto.slug || dto.name, {
      findOne: (filter: any) => this.projectRepo.findBySlug(filter.slug),
    });

    return this.projectRepo.create({ ...dto, slug, images: dto.images ?? [] });
  }

  async update(id: any, dto: UpdateProjectDto) {
    await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    if (dto.name || dto.slug) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.name || '',
        { findOne: (filter: any) => this.projectRepo.findBySlug(filter.slug) },
        id,
      );
    }

    return this.projectRepo.update(id, data);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.projectRepo.delete(id);
    return { success: true };
  }
}

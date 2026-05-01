import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ProjectFilter, ProjectRepository } from '../../repositories/project.repository';

const PUBLIC_PROJECT_STATUSES = ['planning', 'in_progress', 'completed'];

@Injectable()
export class PublicProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ProjectFilter = { status: PUBLIC_PROJECT_STATUSES };
    if (query.search) filter.search = query.search;
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.projectRepo.findManyPublic(filter, options),
      this.projectRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.projectRepo.findPublicBySlug(slug, PUBLIC_PROJECT_STATUSES);
    if (!item) throw new NotFoundException('Project not found');

    await this.projectRepo.incrementViewCount(item.id);

    return { ...item, view_count: item.view_count + 1 };
  }
}

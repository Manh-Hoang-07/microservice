import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { ProjectRepository } from '../../repositories/project.repository';

const PUBLIC_PROJECT_STATUSES = ['planning', 'in_progress', 'completed'];

@Injectable()
export class PublicProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);

    const where: any = { status: { in: PUBLIC_PROJECT_STATUSES } };
    if (query.featured !== undefined) {
      where.featured = query.featured === 'true' || query.featured === true;
    }

    const [data, total] = await Promise.all([
      this.projectRepo.findManyPublic(where, options),
      this.projectRepo.count(where),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getBySlug(slug: string) {
    const item = await this.projectRepo.findFirstPublic({
      slug,
      status: { in: PUBLIC_PROJECT_STATUSES },
    });
    if (!item) throw new NotFoundException('Project not found');

    await this.projectRepo.increment(item.id, 'view_count');

    return { ...item, view_count: item.view_count + 1 };
  }
}

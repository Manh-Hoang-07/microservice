import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CachedService, RedisService } from '@package/redis';
import { ProjectFilter, ProjectRepository } from '../../repositories/project.repository';
import { ProjectStatus } from '../../enums/project-status.enum';

const PUBLIC_PROJECT_STATUSES = [ProjectStatus.planning, ProjectStatus.in_progress, ProjectStatus.completed];

@Injectable()
export class PublicProjectService extends CachedService {
  protected readonly cacheEntity = 'project';
  protected readonly cacheNamespace = 'cms:public';

  constructor(
    private readonly projectRepo: ProjectRepository,
    @Optional() redis?: RedisService,
  ) {
    super(redis);
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ProjectFilter = { status: PUBLIC_PROJECT_STATUSES };
    if (query.search) filter.search = query.search;
    if (query.featured !== undefined) {
      filter.featured = query.featured === 'true' || query.featured === true;
    }

    return this.cachedList(filter, options, 300, async () => {
      const [data, total] = await Promise.all([
        this.projectRepo.findManyPublic(filter, options),
        this.projectRepo.count(filter),
      ]);
      return { data, meta: createPaginationMeta(options, total) };
    });
  }

  getOptions() {
    return this.projectRepo.findOptions();
  }

  async getBySlug(slug: string) {
    return this.cachedDetail(slug, 600, async () => {
      const item = await this.projectRepo.findPublicBySlug(slug, PUBLIC_PROJECT_STATUSES);
      if (!item) throw new NotFoundException('Project not found');

      await this.projectRepo.incrementViewCount(item.id);

      return { ...item, viewCount: item.viewCount + 1 };
    });
  }
}

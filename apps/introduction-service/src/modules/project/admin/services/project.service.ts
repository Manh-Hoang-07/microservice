import { BadRequestException, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SlugHelper, createPaginationMeta, parseQueryOptions } from '@package/common';
import { RedisService } from '@package/redis';
import { ProjectFilter, ProjectRepository } from '../../repositories/project.repository';

@Injectable()
export class AdminProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    @Optional() private readonly redis?: RedisService,
  ) {}

  private async clearCache(slug?: string) {
    if (!this.redis?.isEnabled()) return;
    await this.redis.del('intro:public:project:list').catch(() => {});
    if (slug) {
      await this.redis.del(`intro:public:project:detail:${slug}`).catch(() => {});
    }
  }

  private mapP2002(err: unknown): never {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new BadRequestException('Slug already in use');
    }
    throw err;
  }

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
    try {
      const result = await this.projectRepo.create({ ...dto, slug, images: dto.images ?? [] });
      await this.clearCache();
      return result;
    } catch (err) {
      // Concurrent create raced our slug check -> friendly 400 instead of 500.
      this.mapP2002(err);
    }
  }

  async update(id: any, dto: UpdateProjectDto) {
    const current = await this.getOne(id);

    const data: Record<string, any> = { ...dto };
    // Only regenerate slug when the source actually changed.
    const nameChanged = dto.name !== undefined && dto.name !== (current as any).name;
    if (dto.slug || nameChanged) {
      data.slug = await SlugHelper.uniqueSlug(
        dto.slug || dto.name || '',
        { findOne: (filter: any) => this.projectRepo.findBySlug(filter.slug) },
        id,
      );
    }

    try {
      const result = await this.projectRepo.update(id, data);
      await this.clearCache((current as any).slug);
      if (data.slug && data.slug !== (current as any).slug) {
        await this.clearCache(data.slug);
      }
      return result;
    } catch (err) {
      this.mapP2002(err);
    }
  }

  async delete(id: any) {
    const item = await this.getOne(id);
    await this.projectRepo.delete(id);
    await this.clearCache((item as any).slug);
    return { success: true };
  }
}

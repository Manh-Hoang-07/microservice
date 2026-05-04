import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey, toPrimaryKey } from 'src/types';
import { ContextRepository } from '../../repositories/context.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { CreateContextDto } from '../dtos/create-context.dto';
import { UpdateContextDto } from '../dtos/update-context.dto';
import { SyncRolesDto } from '../dtos/sync-roles.dto';

@Injectable()
export class ContextService {
  constructor(
    private readonly repo: ContextRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async getList(query: any) {
    const options = parseQueryOptions(query);
    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    const [data, total] = await Promise.all([
      this.repo.findMany(where, options.skip, options.take),
      this.repo.count(where),
    ]);
    return { data, meta: { page: options.page, limit: options.take, total, total_pages: Math.ceil(total / options.take) } };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.repo.findById(id);
    if (!item) {
      throw new NotFoundException(this.t('context.NOT_FOUND'));
    }
    return item;
  }

  async create(dto: CreateContextDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(this.t('context.CODE_EXISTS'));
    }
    const data: any = {
      type: dto.type,
      code: dto.code,
      name: dto.name,
      created_user_id: actorId,
    };
    if (dto.ref_id) data.ref_id = toPrimaryKey(dto.ref_id);
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateContextDto, actorId: PrimaryKey) {
    await this.getOne(id);
    const data: any = { updated_user_id: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;
    const result = await this.repo.update(id, data);
    if (dto.status !== undefined) {
      // disabling/enabling a context changes which assignments resolve.
      await this.rbacCache.bumpVersion();
    }
    return result;
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    const groupCount = await this.repo.countGroups(id);
    if (groupCount > 0) {
      throw new ConflictException(this.t('context.IN_USE_BY_GROUPS'));
    }
    await this.repo.delete(id);
    await this.rbacCache.bumpVersion();
    return { deleted: true };
  }

  async syncRoles(id: PrimaryKey, dto: SyncRolesDto) {
    await this.getOne(id);
    await this.repo.syncRoles(id, dto.roleIds.map(toPrimaryKey));
    await this.rbacCache.bumpVersion();
    return { updated: true };
  }
}

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { PermissionRepository } from '../../repositories/permission.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacPermissionIndexService } from '../../../../rbac/services/rbac-permission-index.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    private readonly repo: PermissionRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly permIndex: RbacPermissionIndexService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async getList(query: any) {
    const options = parseQueryOptions(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.scope) where.scope = query.scope;
    const [data, total] = await Promise.all([
      this.repo.findMany(where, options.skip, options.take),
      this.repo.count(where),
    ]);
    return { data, meta: { page: options.page, limit: options.take, total, total_pages: Math.ceil(total / options.take) } };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.repo.findById(id);
    if (!item) {
      throw new NotFoundException(this.t('permission.NOT_FOUND'));
    }
    return item;
  }

  async create(dto: CreatePermissionDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(this.t('permission.CODE_EXISTS'));
    }
    const data: any = {
      code: dto.code,
      name: dto.name,
      scope: dto.scope || 'context',
      created_user_id: actorId,
    };
    if (dto.parent_id) data.parent = { connect: { id: BigInt(dto.parent_id) } };
    const result = await this.repo.create(data);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return result;
  }

  async update(id: PrimaryKey, dto: UpdatePermissionDto, actorId: PrimaryKey) {
    await this.getOne(id);
    if (dto.parent_id) {
      await this.assertNoCycle(id, BigInt(dto.parent_id));
    }
    const data: any = { updated_user_id: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;
    if ('parent_id' in dto) {
      data.parent = dto.parent_id
        ? { connect: { id: BigInt(dto.parent_id) } }
        : { disconnect: true };
    }
    const result = await this.repo.update(id, data);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return result;
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.repo.delete(id);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return { deleted: true };
  }

  private async assertNoCycle(id: PrimaryKey, candidateParentId: bigint): Promise<void> {
    if (BigInt(String(id)) === candidateParentId) {
      throw new BadRequestException(this.t('permission.CYCLE_DETECTED'));
    }
    const visited = new Set<string>();
    let cur: bigint | null = candidateParentId;
    while (cur != null) {
      const key = String(cur);
      if (visited.has(key)) break;
      visited.add(key);
      if (cur === BigInt(String(id))) {
        throw new BadRequestException(this.t('permission.CYCLE_DETECTED'));
      }
      cur = await this.repo.getParentId(cur);
    }
  }
}

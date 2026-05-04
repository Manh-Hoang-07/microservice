import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey, toPrimaryKey } from 'src/types';
import { RoleRepository } from '../../repositories/role.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacPermissionIndexService } from '../../../../rbac/services/rbac-permission-index.service';
import { RbacService } from '../../../../rbac/services/rbac.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { SyncPermissionsDto } from '../dtos/sync-permissions.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly repo: RoleRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly permIndex: RbacPermissionIndexService,
    private readonly rbacService: RbacService,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string, args?: Record<string, unknown>): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang, args }) as string;
  }

  async getList(query: any) {
    const options = parseQueryOptions(query);
    const where: any = {};
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
      throw new NotFoundException(this.t('role.NOT_FOUND'));
    }
    return item;
  }

  async create(dto: CreateRoleDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(this.t('role.CODE_EXISTS'));
    }
    const data: any = { code: dto.code, name: dto.name, created_user_id: actorId };
    if (dto.parent_id) {
      // Check the parent exists; cycle check is N/A on create (no children yet).
      data.parent = { connect: { id: toPrimaryKey(dto.parent_id) } };
    }
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateRoleDto, actorId: PrimaryKey) {
    await this.getOne(id);
    if (dto.parent_id) {
      await this.assertNoCycle(id, toPrimaryKey(dto.parent_id));
    }
    const data: any = { updated_user_id: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;
    if ('parent_id' in dto) {
      data.parent = dto.parent_id
        ? { connect: { id: toPrimaryKey(dto.parent_id) } }
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
    return { deleted: true };
  }

  async syncPermissions(
    id: PrimaryKey,
    dto: SyncPermissionsDto,
    actor: { id: string; groupId?: string | null },
  ) {
    await this.getOne(id);
    const targetIds = dto.permissionIds.map(toPrimaryKey);
    // Caller must already hold every permission they want to wire onto this role.
    if (targetIds.length) {
      // We approximate "callers can grant these permissions" by treating the
      // role as a synthetic role containing exactly those permission codes.
      // assertCallerCanGrantRole expects role IDs, so instead inline a check
      // here: compare against actor's effective permissions.
      const targetCodes = await this.repo.getPermissionCodesByIds(targetIds);
      if (targetCodes.length) {
        await this.rbacService.assertCallerCanGrantPermissionCodes(
          actor.id,
          actor.groupId ?? null,
          targetCodes,
        );
      }
    }
    await this.repo.syncPermissions(id, targetIds);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return { updated: true };
  }

  private async assertNoCycle(roleId: PrimaryKey, candidateParentId: bigint): Promise<void> {
    if (toPrimaryKey(roleId) === candidateParentId) {
      throw new BadRequestException(this.t('role.CYCLE_DETECTED'));
    }
    const visited = new Set<string>();
    let cur: bigint | null = candidateParentId;
    while (cur != null) {
      const key = String(cur);
      if (visited.has(key)) break;
      visited.add(key);
      if (cur === toPrimaryKey(roleId)) {
        throw new BadRequestException(this.t('role.CYCLE_DETECTED'));
      }
      cur = await this.repo.getParentId(cur);
    }
  }
}

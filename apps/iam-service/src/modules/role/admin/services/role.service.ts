import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { parseQueryOptions, createPaginationMeta, t } from '@package/common';
import { PrimaryKey } from 'src/types';
import { assertNoCycle } from '../../../../helpers/hierarchy.helper';
import { RoleFilter, RoleRepository } from '../../repositories/role.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacPermissionIndexService } from '../../../../rbac/services/rbac-permission-index.service';
import { RbacRepository } from '../../../../rbac/repositories/rbac.repository';
import { RbacService } from '../../../../rbac/services/rbac.service';
import { PERM } from '../../../../rbac/constants/rbac.constants';
import { ListRolesAdminQueryDto } from '../dtos/list-role.query.dto';
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
    private readonly rbacRepo: RbacRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: ListRolesAdminQueryDto) {
    const options = parseQueryOptions(query);
    const filter: RoleFilter = {};
    if (query.status) filter.status = query.status;
    if (query.search) filter.search = query.search;
    if (query.roleType) filter.roleType = query.roleType;

    const skipCount = query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.repo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.repo.count(filter),
    ]);
    return { data, meta: createPaginationMeta(options, total) };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.repo.findById(id);
    if (!item) {
      throw new NotFoundException(t(this.i18n, 'role.NOT_FOUND'));
    }
    return item;
  }

  async create(dto: CreateRoleDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(t(this.i18n, 'role.CODE_EXISTS'));
    }
    const data: any = {
      code: dto.code,
      name: dto.name,
      createdUserId: actorId,
      roleType: dto.roleType ?? 'system',
    };
    if (dto.parentId) {
      data.parent = { connect: { id: dto.parentId } };
    }
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateRoleDto, actorId: PrimaryKey) {
    await this.getOne(id);
    if (dto.parentId) {
      await assertNoCycle(
        id,
        dto.parentId,
        (cur) => this.repo.getParentId(cur),
        t(this.i18n, 'role.CYCLE_DETECTED'),
      );
    }
    const data: any = { updatedUserId: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;
    if ('parentId' in dto) {
      data.parent = dto.parentId
        ? { connect: { id: dto.parentId } }
        : { disconnect: true };
    }
    const result = await this.repo.update(id, data);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return result;
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);

    // Last-admin protection: refuse to delete a role if doing so would leave
    // the system with zero users holding `system.manage`.
    const codes = await this.rbacRepo.getPermissionCodesForRoles([id as any]);
    if (codes.has(PERM.SYSTEM.MANAGE)) {
      const remaining = await this.rbacRepo.countUsersWithPermissionExcludingRole(
        PERM.SYSTEM.MANAGE,
        id as any,
      );
      if (remaining < 1) {
        throw new ForbiddenException(t(this.i18n, 'rbac.LAST_SYSTEM_ADMIN_PROTECTED'));
      }
    }

    await this.repo.delete(id);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return { message: t(this.i18n, 'role.DELETED') };
  }

  async syncPermissions(
    id: PrimaryKey,
    dto: SyncPermissionsDto,
    actor: { id: string },
  ) {
    await this.getOne(id);
    const targetIds = dto.permissionIds;
    // Caller must already hold every permission they want to wire onto this role.
    if (targetIds.length) {
      const targetCodes = await this.repo.getPermissionCodesByIds(targetIds);
      if (targetCodes.length) {
        await this.rbacService.assertCallerCanGrantPermissionCodes(actor.id, targetCodes);
      }
    }
    await this.repo.syncPermissions(id, targetIds);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return { message: t(this.i18n, 'role.PERMISSIONS_SYNCED') };
  }

}

import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { parseQueryOptions, createPaginationMeta, t } from '@package/common';
import { PrimaryKey } from 'src/types';
import { assertNoCycle } from '../../../../helpers/hierarchy.helper';
import { PermissionFilter, PermissionRepository } from '../../repositories/permission.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacPermissionIndexService } from '../../../../rbac/services/rbac-permission-index.service';
import { RbacService } from '../../../../rbac/services/rbac.service';
import { PERM } from '../../../../rbac/constants/rbac.constants';
import { ListPermissionsAdminQueryDto } from '../dtos/list-permission.query.dto';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    private readonly repo: PermissionRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly permIndex: RbacPermissionIndexService,
    private readonly rbacService: RbacService,
    private readonly i18n: I18nService,
  ) {}

  /**
   * Changing a permission's parent redistributes implicit grants — every
   * holder of the new parent code transitively gains access to this
   * permission's routes. To prevent a `permission.manage` admin from
   * laundering low-privilege perms into high-privilege ones (or vice
   * versa), restrict hierarchy edits to callers who hold `system.manage`.
   */
  private async assertCanEditHierarchy(actorId: PrimaryKey): Promise<void> {
    const perms = await this.rbacService.getPermissions(actorId);
    if (!this.rbacService.hasCode(perms, PERM.SYSTEM.MANAGE)) {
      throw new ForbiddenException(t(this.i18n, 'permission.HIERARCHY_RESTRICTED'));
    }
  }

  async getList(query: ListPermissionsAdminQueryDto) {
    const options = parseQueryOptions(query);
    const filter: PermissionFilter = {};
    if (query.status) filter.status = query.status;
    if (query.search) filter.search = query.search;

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
      throw new NotFoundException(t(this.i18n, 'permission.NOT_FOUND'));
    }
    return item;
  }

  async create(dto: CreatePermissionDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(t(this.i18n, 'permission.CODE_EXISTS'));
    }
    if (dto.parentId) {
      await this.assertCanEditHierarchy(actorId);
    }
    const data: any = {
      code: dto.code,
      name: dto.name,
      createdUserId: actorId,
    };
    if (dto.parentId) data.parent = { connect: { id: dto.parentId } };
    const result = await this.repo.create(data);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return result;
  }

  async update(id: PrimaryKey, dto: UpdatePermissionDto, actorId: PrimaryKey) {
    const entity = await this.getOne(id);
    if ('parentId' in dto && String(dto.parentId ?? '') !== String(entity.parentId ?? '')) {
      await this.assertCanEditHierarchy(actorId);
    }
    if (dto.parentId) {
      await assertNoCycle(
        id,
        dto.parentId,
        (cur) => this.repo.getParentId(cur),
        t(this.i18n, 'permission.CYCLE_DETECTED'),
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

  async getSimple(search?: string) {
    return this.repo.findSimple(search);
  }

  async delete(id: PrimaryKey) {
    const entity = await this.getOne(id);

    // `system.manage` underpins every admin route. Removing it would lock
    // every administrator out of the system.
    if (entity.code === PERM.SYSTEM.MANAGE) {
      throw new ForbiddenException(t(this.i18n, 'permission.SYSTEM_MANAGE_PROTECTED'));
    }

    await this.repo.delete(id);
    await this.rbacCache.bumpVersion();
    await this.permIndex.publishRefresh();
    return { message: t(this.i18n, 'permission.DELETED') };
  }

}

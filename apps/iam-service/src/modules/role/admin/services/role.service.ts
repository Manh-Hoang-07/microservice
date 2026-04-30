import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { RoleRepository } from '../../repositories/role.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { SyncPermissionsDto } from '../dtos/sync-permissions.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly repo: RoleRepository,
    private readonly rbacCache: RbacCacheService,
  ) {}

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
    if (!item) throw new NotFoundException('Role not found');
    return item;
  }

  async create(dto: CreateRoleDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new ConflictException('Role code already exists');
    const data: any = { code: dto.code, name: dto.name, created_user_id: actorId };
    if (dto.parent_id) data.parent = { connect: { id: BigInt(dto.parent_id) } };
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateRoleDto, actorId: PrimaryKey) {
    await this.getOne(id);
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
    return result;
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.repo.delete(id);
    await this.rbacCache.bumpVersion();
    return { deleted: true };
  }

  async syncPermissions(id: PrimaryKey, dto: SyncPermissionsDto) {
    await this.getOne(id);
    await this.repo.syncPermissions(id, dto.permissionIds.map(BigInt));
    await this.rbacCache.bumpVersion();
    return { updated: true };
  }
}

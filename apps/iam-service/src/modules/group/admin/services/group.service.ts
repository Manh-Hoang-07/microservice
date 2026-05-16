import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CrudService, t, getSessionUserId, parseQueryOptions, createPaginationMeta } from '@package/common';
import { PrimaryKey, toPrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacRepository } from '../../../../rbac/repositories/rbac.repository';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';
import { GROUP_OWNER_ROLE_CODE } from '../../constants/group-owner.constants';

@Injectable()
export class GroupService extends CrudService<GroupRepository> {
  private cachedOwnerRoleId: bigint | null | undefined = undefined;

  constructor(
    groupRepo: GroupRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly rbacRepo: RbacRepository,
    private readonly i18n: I18nService,
  ) {
    super(groupRepo);
  }

  private async getOwnerRoleId(): Promise<bigint | null> {
    if (this.cachedOwnerRoleId !== undefined) return this.cachedOwnerRoleId;
    const role = await this.rbacRepo.findRoleByCode(GROUP_OWNER_ROLE_CODE);
    this.cachedOwnerRoleId = role?.id ?? null;
    return this.cachedOwnerRoleId;
  }

  private async grantOwnerRole(userId: bigint, groupId: bigint): Promise<boolean> {
    const roleId = await this.getOwnerRoleId();
    if (!roleId) return false;
    await this.rbacRepo.assignRoleToUser(userId, roleId, groupId);
    return true;
  }

  private async revokeOwnerRole(userId: bigint, groupId: bigint): Promise<void> {
    const roleId = await this.getOwnerRoleId();
    if (!roleId) return;
    await this.rbacRepo.revokeOwnerRoleInGroup(userId, groupId, roleId);
  }

  async getOne(id: any) {
    const item = await this.repository.findById(id);
    if (!item) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));
    return item;
  }

  async create(dto: CreateGroupDto) {
    const existing = await this.repository.findByCode(dto.code);
    if (existing) throw new ConflictException(t(this.i18n, 'group.CODE_EXISTS'));
    const actorId = getSessionUserId();
    const data: any = {
      type: dto.type,
      code: dto.code,
      name: dto.name,
      description: dto.description,
      contextId: dto.contextId,
      createdUserId: actorId,
    };
    if (dto.ownerId) data.ownerId = dto.ownerId;
    const newGroup = await this.repository.create(data);
    if (dto.ownerId) {
      const ownerId = toPrimaryKey(dto.ownerId);
      const granted = await this.grantOwnerRole(ownerId, newGroup.id);
      if (granted) await this.rbacCache.clearAllUserCaches(ownerId);
    }
    return newGroup;
  }

  async update(id: PrimaryKey, dto: UpdateGroupDto) {
    const group = await this.getOne(id);
    const actorId = getSessionUserId();
    const data: any = { updatedUserId: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.status !== undefined) data.status = dto.status;

    if ('ownerId' in dto) {
      data.ownerId = dto.ownerId ? dto.ownerId : null;
      const oldOwnerId = group.ownerId ? toPrimaryKey(group.ownerId) : null;
      const newOwnerId = dto.ownerId ? toPrimaryKey(dto.ownerId) : null;
      const ownerChanged = String(oldOwnerId ?? '') !== String(newOwnerId ?? '');
      if (ownerChanged) {
        if (newOwnerId) {
          const granted = await this.grantOwnerRole(newOwnerId, toPrimaryKey(id));
          if (granted) await this.rbacCache.clearAllUserCaches(newOwnerId);
        }
        if (oldOwnerId) {
          await this.revokeOwnerRole(oldOwnerId, toPrimaryKey(id));
          await this.rbacCache.clearAllUserCaches(oldOwnerId);
        }
      }
    }

    const result = await this.repository.update(id, data);
    if (dto.status !== undefined) {
      await this.rbacCache.bumpVersion();
    }
    return result;
  }

  async delete(id: PrimaryKey) {
    const group = await this.getOne(id);
    await this.repository.delete(id);
    await this.rbacCache.bumpVersion();
    if (group.ownerId) {
      await this.rbacCache.clearAllUserCaches(toPrimaryKey(group.ownerId));
    }
    return { message: t(this.i18n, 'group.DELETED') };
  }

  async getMembers(id: PrimaryKey, query: any) {
    await this.getOne(id);
    const options = parseQueryOptions(query);
    const [data, total] = await Promise.all([
      this.repository.getMembers(id, options.skip, options.take),
      this.repository.countMembers(id),
    ]);
    return { data, meta: createPaginationMeta(options, total) };
  }

  async addMember(id: PrimaryKey, dto: AddMemberDto) {
    await this.getOne(id);
    await this.repository.addMember(id, dto.userId);
    await this.rbacCache.clearAllUserCaches(dto.userId);
    return { message: t(this.i18n, 'group.MEMBER_ADDED') };
  }

  async removeMember(id: PrimaryKey, userId: PrimaryKey) {
    await this.getOne(id);
    await this.repository.removeMember(id, userId);
    await this.rbacCache.clearAllUserCaches(userId);
    return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
  }
}

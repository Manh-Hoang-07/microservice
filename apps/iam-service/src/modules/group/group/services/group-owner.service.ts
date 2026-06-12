import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';
import { GroupMemberRoleRepository } from '../../repositories/group-member-role.repository';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';

@Injectable()
export class GroupOwnerService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
    private readonly i18n: I18nService,
  ) {}

  private async assertOwner(groupId: string, userId: string) {
    const group = await this.groupRepo.findById(groupId);
    if (!group) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));
    if (!group.ownerId || String(group.ownerId) !== userId) {
      throw new ForbiddenException(t(this.i18n, 'group.NOT_OWNER'));
    }
    return group;
  }

  private async assertMember(groupId: string, userId: string) {
    const members = await this.groupRepo.findMemberIds(BigInt(groupId));
    const isMember = members.some((id) => String(id) === userId);
    if (!isMember) throw new NotFoundException(t(this.i18n, 'group.MEMBER_NOT_FOUND'));
  }

  /** Danh sach vai tro nhom co the gan cho thanh vien (phang, khong loc theo loai nhom). */
  async getAssignableRoles(groupId: string, callerId: string) {
    await this.assertOwner(groupId, callerId);
    return this.memberRoleRepo.findAllGroupRoles();
  }

  async getMemberRoles(groupId: string, memberId: string, callerId: string) {
    await this.assertOwner(groupId, callerId);
    return this.memberRoleRepo.findByUserAndGroup(memberId, groupId);
  }

  async assignRole(groupId: string, memberId: string, dto: AssignMemberRoleDto, callerId: string) {
    await this.assertOwner(groupId, callerId);
    await this.assertMember(groupId, memberId);
    await this.memberRoleRepo.assign(memberId, groupId, dto.roleId);
    return { message: t(this.i18n, 'group.ROLE_ASSIGNED') };
  }

  async removeRole(groupId: string, memberId: string, roleId: string, callerId: string) {
    await this.assertOwner(groupId, callerId);
    await this.memberRoleRepo.remove(memberId, groupId, roleId);
    return { message: t(this.i18n, 'group.ROLE_REVOKED') };
  }

  async syncRoles(groupId: string, memberId: string, dto: SyncMemberRolesDto, callerId: string) {
    await this.assertOwner(groupId, callerId);
    await this.assertMember(groupId, memberId);
    await this.memberRoleRepo.syncRoles(memberId, groupId, dto.roleIds);
    return { message: t(this.i18n, 'group.ROLES_SYNCED') };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t, parseQueryOptions, createPaginationMeta } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';
import { GroupMemberRoleRepository } from '../../repositories/group-member-role.repository';
import { AddMemberDto } from '../../admin/dtos/add-member.dto';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';

@Injectable()
export class GroupOwnerService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
    private readonly i18n: I18nService,
  ) {}

  private async assertGroup(groupId: string) {
    const group = await this.groupRepo.findById(groupId);
    if (!group) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));
    return group;
  }

  private async assertMember(groupId: string, userId: string) {
    const members = await this.groupRepo.findMemberIds(BigInt(groupId));
    const isMember = members.some((id) => String(id) === userId);
    if (!isMember) throw new NotFoundException(t(this.i18n, 'group.MEMBER_NOT_FOUND'));
  }

  async getAssignableRoles(groupId: string) {
    await this.assertGroup(groupId);
    return this.memberRoleRepo.findAllGroupRoles();
  }

  async getMemberRoles(groupId: string, memberId: string) {
    await this.assertGroup(groupId);
    return this.memberRoleRepo.findByUserAndGroup(memberId, groupId);
  }

  async assignRole(groupId: string, memberId: string, dto: AssignMemberRoleDto) {
    await this.assertGroup(groupId);
    await this.assertMember(groupId, memberId);
    await this.memberRoleRepo.assign(memberId, groupId, dto.roleId);
    return { message: t(this.i18n, 'group.ROLE_ASSIGNED') };
  }

  async removeRole(groupId: string, memberId: string, roleId: string) {
    await this.assertGroup(groupId);
    await this.memberRoleRepo.remove(memberId, groupId, roleId);
    return { message: t(this.i18n, 'group.ROLE_REVOKED') };
  }

  async syncRoles(groupId: string, memberId: string, dto: SyncMemberRolesDto) {
    await this.assertGroup(groupId);
    await this.assertMember(groupId, memberId);
    await this.memberRoleRepo.syncRoles(memberId, groupId, dto.roleIds);
    return { message: t(this.i18n, 'group.ROLES_SYNCED') };
  }

  async getMembers(groupId: string, query: any) {
    await this.assertGroup(groupId);
    const options = parseQueryOptions(query);
    const [data, total] = await Promise.all([
      this.groupRepo.getMembers(groupId, options.skip, options.take),
      this.groupRepo.countMembers(groupId),
    ]);
    return { data, meta: createPaginationMeta(options, total) };
  }

  async addMember(groupId: string, dto: AddMemberDto) {
    await this.assertGroup(groupId);
    await this.groupRepo.addMember(groupId, dto.userId);
    return { message: t(this.i18n, 'group.MEMBER_ADDED') };
  }

  async removeMember(groupId: string, userId: string) {
    await this.assertGroup(groupId);
    await this.groupRepo.removeMember(groupId, userId);
    return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
  }
}

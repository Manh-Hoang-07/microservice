import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { t } from '@package/common';
import { GroupRepository } from '../../repositories/group.repository';
import { GroupMemberRoleRepository } from '../../repositories/group-member-role.repository';
import { GroupMembersService } from '../../services/group-members.service';
import { AuthClient } from '../../../../clients/auth.client';
import { AddMemberByIdentifierDto } from '../dtos/add-member-by-identifier.dto';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';
import { ListMembersQueryDto } from '../dtos/list-members.query.dto';
import { UpdateGroupInfoDto } from '../dtos/update-group-info.dto';

@Injectable()
export class GroupOwnerService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
    private readonly authClient: AuthClient,
    private readonly membersService: GroupMembersService,
    private readonly i18n: I18nService,
  ) {}

  private async assertGroup(groupId: string) {
    const group = await this.groupRepo.findById(groupId);
    if (!group) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));
    return group;
  }

  // ─── Group info ──────────────────────────────────────────────────────────────

  async getGroupInfo(groupId: string) {
    return this.assertGroup(groupId);
  }

  async updateGroupInfo(groupId: string, dto: UpdateGroupInfoDto) {
    await this.assertGroup(groupId);
    const data: Record<string, any> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    return this.groupRepo.update(groupId, data);
  }

  // ─── Assignable roles ────────────────────────────────────────────────────────

  async getAssignableRoles(groupId: string) {
    await this.assertGroup(groupId);
    return this.memberRoleRepo.findAllGroupRoles();
  }

  // ─── Member roles ────────────────────────────────────────────────────────────

  async getMemberRoles(groupId: string, memberId: string) {
    await this.assertGroup(groupId);
    return this.memberRoleRepo.findByUserAndGroup(memberId, groupId);
  }

  async assignRole(groupId: string, memberId: string, dto: AssignMemberRoleDto) {
    await this.assertGroup(groupId);
    const isMember = await this.groupRepo.isMember(groupId, memberId);
    if (!isMember) throw new NotFoundException(t(this.i18n, 'group.MEMBER_NOT_FOUND'));
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
    const isMember = await this.groupRepo.isMember(groupId, memberId);
    if (!isMember) throw new NotFoundException(t(this.i18n, 'group.MEMBER_NOT_FOUND'));
    await this.memberRoleRepo.syncRoles(memberId, groupId, dto.roleIds);
    return { message: t(this.i18n, 'group.ROLES_SYNCED') };
  }

  // ─── Members ─────────────────────────────────────────────────────────────────

  async getMembers(groupId: string, query: ListMembersQueryDto) {
    await this.assertGroup(groupId);
    return this.membersService.listMembers(groupId, query);
  }

  async addMember(groupId: string, dto: AddMemberByIdentifierDto) {
    await this.assertGroup(groupId);

    const user = dto.email
      ? await this.authClient.lookupByEmail(dto.email)
      : await this.authClient.lookupByUsername(dto.username!);

    if (!user) throw new NotFoundException(t(this.i18n, 'group.USER_NOT_FOUND'));

    const alreadyMember = await this.groupRepo.isMember(groupId, user.id);
    if (alreadyMember) throw new ConflictException(t(this.i18n, 'group.ALREADY_MEMBER'));

    await this.groupRepo.addMember(groupId, user.id);
    return { message: t(this.i18n, 'group.MEMBER_ADDED'), user };
  }

  async removeMember(groupId: string, userId: string) {
    await this.assertGroup(groupId);
    await this.groupRepo.removeMember(groupId, userId);
    return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
  }
}

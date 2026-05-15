import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ListService, t, session, parseQueryOptions, createPaginationMeta } from '@package/common';
import { PrismaService } from '../../../../core/database/prisma.service';
import { toPrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';
import { RbacCacheService } from '../../../../rbac/services/rbac-cache.service';
import { RbacRepository } from '../../../../rbac/repositories/rbac.repository';
import { ListOwnerMembersQueryDto } from '../dtos/list-owner.query.dto';

@Injectable()
export class OwnerGroupService extends ListService<GroupRepository> {
  constructor(
    groupRepo: GroupRepository,
    private readonly rbacCache: RbacCacheService,
    private readonly rbacRepo: RbacRepository,
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {
    super(groupRepo);
  }

  protected async prepareFilters(query: Record<string, any>) {
    const sess = session();
    if (!sess?.userId) return false;
    return { ...query, ownerId: String(sess.userId) };
  }

  getGroupDetail(group: any) {
    return group;
  }

  async getMembers(groupId: bigint, query: ListOwnerMembersQueryDto) {
    const options = parseQueryOptions(query);
    const skipCount = query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.repository.getMembers(groupId, options.skip, options.take),
      skipCount ? Promise.resolve(0) : this.repository.countMembers(groupId),
    ]);
    return { data, meta: createPaginationMeta(options, total) };
  }

  async addMember(groupId: bigint, userId: string) {
    const uid = toPrimaryKey(userId);
    await this.repository.addMember(groupId, uid);
    await this.rbacCache.clearAllUserCaches(uid);
    return { message: t(this.i18n, 'group.MEMBER_ADDED') };
  }

  async removeMember(groupId: bigint, userId: string) {
    const uid = toPrimaryKey(userId);
    await this.repository.removeMember(groupId, uid);
    await this.rbacCache.clearAllUserCaches(uid);
    return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
  }

  async getAvailableRoles(group: any) {
    const rows = await this.prisma.roleContext.findMany({
      where: {
        contextId: group.contextId,
        role: { status: 'active' },
      },
      include: {
        role: { select: { id: true, code: true, name: true, status: true } },
      },
    });
    return rows.map((r) => r.role);
  }

  async getMemberRoles(groupId: bigint, userId: string) {
    const uid = toPrimaryKey(userId);
    return this.prisma.userRoleAssignment.findMany({
      where: { groupId, userId: uid },
      include: { role: { select: { id: true, code: true, name: true } } },
    });
  }

  async assignRole(group: any, userId: string, roleId: string) {
    const uid = toPrimaryKey(userId);
    const rid = toPrimaryKey(roleId);

    const invalid = await this.rbacRepo.findInvalidRolesForContext([rid], group.contextId);
    if (invalid.length) {
      throw new BadRequestException(t(this.i18n, 'group.ROLE_NOT_IN_CONTEXT'));
    }

    const isMember = await this.prisma.userGroup.findUnique({
      where: { userId_groupId: { userId: uid, groupId: group.id } },
      select: { userId: true },
    });
    if (!isMember) {
      throw new BadRequestException(t(this.i18n, 'group.MEMBER_NOT_FOUND'));
    }

    await this.rbacRepo.assignRoleToUser(uid, rid, group.id);
    await this.rbacCache.clearAllUserCaches(uid);
    return { message: t(this.i18n, 'group.ROLE_ASSIGNED') };
  }

  async revokeRole(group: any, userId: string, roleId: string) {
    const uid = toPrimaryKey(userId);
    const rid = toPrimaryKey(roleId);
    await this.prisma.userRoleAssignment.deleteMany({
      where: { userId: uid, roleId: rid, groupId: group.id },
    });
    await this.rbacCache.clearAllUserCaches(uid);
    return { message: t(this.i18n, 'group.ROLE_REVOKED') };
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { PrismaService } from '../../database/prisma.service';
import { RbacId } from '../types';

function toPk(id: RbacId): bigint {
  return BigInt(String(id));
}

@Injectable()
export class RbacRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  findPermissions() {
    return this.prisma.permission.findMany({
      where: { status: 'active' },
      select: { id: true, code: true, parent_id: true },
    });
  }

  assignRoleToUser(userId: RbacId, roleId: RbacId, groupId: RbacId) {
    return this.prisma.userRoleAssignment.createMany({
      data: [{ user_id: toPk(userId), role_id: toPk(roleId), group_id: toPk(groupId) }],
      skipDuplicates: true,
    });
  }

  async syncRolesInGroup(
    userId: RbacId,
    groupId: RbacId,
    roleIds: RbacId[],
    skipValidation = false,
  ): Promise<void> {
    const group = await this.prisma.group.findFirst({
      where: { id: toPk(groupId), status: 'active' },
    });
    if (!group) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new NotFoundException(this.i18n.t('rbac.GROUP_NOT_FOUND', { lang }));
    }

    const normalizedRoleIds = this.normalizeRoleIds(roleIds);

    if (normalizedRoleIds.length && !skipValidation) {
      await this.validateRolesForContext(normalizedRoleIds, group.context_id);
    }

    await this.prisma.$transaction(async (tx) => {
      if (normalizedRoleIds.length > 0) {
        await tx.userGroup.upsert({
          where: { user_id_group_id: { user_id: toPk(userId), group_id: toPk(groupId) } },
          create: { user_id: toPk(userId), group_id: toPk(groupId), joined_at: new Date() },
          update: {},
        });
      }
      await tx.userRoleAssignment.deleteMany({
        where: { user_id: toPk(userId), group_id: toPk(groupId) },
      });
      if (normalizedRoleIds.length > 0) {
        await tx.userRoleAssignment.createMany({
          data: normalizedRoleIds.map((rid) => ({
            user_id: toPk(userId),
            group_id: toPk(groupId),
            role_id: toPk(rid),
          })),
          skipDuplicates: true,
        });
      }
    });
  }

  async getActivePermissionCodes(userId: RbacId, groupId: RbacId | null): Promise<string[]> {
    const rows = await this.prisma.roleHasPermission.findMany({
      where: {
        role: {
          status: 'active',
          user_role_assignments: {
            some: {
              user_id: toPk(userId),
              ...(groupId === null
                ? { group: { code: 'system' } }
                : { group_id: toPk(groupId) }),
            },
          },
        },
        permission: { status: 'active' },
      },
      select: { permission: { select: { code: true } } },
    });
    const out = new Set<string>();
    for (const r of rows as any[]) {
      const code = r?.permission?.code;
      if (typeof code === 'string' && code.length) out.add(code);
    }
    return Array.from(out);
  }

  private async validateRolesForContext(roleIds: RbacId[], contextId: bigint): Promise<void> {
    const normalizedRoleIds = roleIds.map((id) => toPk(id));
    const links = await this.prisma.roleContext.findMany({
      where: {
        context_id: contextId,
        role_id: { in: normalizedRoleIds },
        role: { status: 'active' },
      },
      select: { role_id: true },
    });
    const validIds = new Set((links as any[]).map((l) => String(l.role_id)));
    for (const id of normalizedRoleIds) {
      if (!validIds.has(String(id))) {
        const lang = I18nContext.current()?.lang ?? 'en';
        throw new BadRequestException(
          this.i18n.t('rbac.ROLE_NOT_ALLOWED_IN_CONTEXT', {
            lang,
            args: { id: String(id) },
          }),
        );
      }
    }
  }

  private normalizeRoleIds(roleIds: RbacId[] | null | undefined): RbacId[] {
    if (!Array.isArray(roleIds)) return [];
    return roleIds.filter(
      (id) => id !== null && id !== undefined && `${id}`.trim().length > 0,
    );
  }
}

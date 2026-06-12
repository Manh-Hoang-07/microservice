import { PrismaClient } from '../../../src/generated/prisma';
import { GROUP_OWNER_ROLE } from '../../../src/modules/group/constants/group-role.constant';

/**
 * Backfill: bao dam moi chu nhom (owner) hien co la member + co dung vai tro
 * `group_manager` (day du quyen noi dung nhom). Idempotent.
 *
 * Set owner = exactly [group_manager]: xoa cac vai tro nhom cu cua owner (vd
 * group_post_manager tu mo hinh theo-loai truoc day) roi gan group_manager.
 */
export async function seedGroupOwnerRoles(prisma: PrismaClient): Promise<void> {
  const groups = await prisma.group.findMany({
    where: { ownerId: { not: null } },
    select: { id: true, code: true, ownerId: true },
  });

  const role = await prisma.role.findFirst({ where: { code: GROUP_OWNER_ROLE }, select: { id: true } });
  if (!role) {
    console.warn(`  ⚠ role '${GROUP_OWNER_ROLE}' chua duoc seed — bo qua backfill owner`);
    return;
  }

  let fixed = 0;
  for (const g of groups) {
    const ownerId = g.ownerId!;

    // Owner phai la member
    await prisma.userGroup.upsert({
      where: { userId_groupId: { userId: ownerId, groupId: g.id } },
      create: { userId: ownerId, groupId: g.id },
      update: {},
    });

    // Owner role = chinh xac [group_manager]: don vai tro nhom cu roi gan moi.
    await prisma.groupMemberRole.deleteMany({ where: { userId: ownerId, groupId: g.id } });
    await prisma.groupMemberRole.create({ data: { userId: ownerId, groupId: g.id, roleId: role.id } });

    fixed++;
    console.log(`  ✔ ${g.code}: owner ${ownerId} → ${GROUP_OWNER_ROLE}`);
  }

  console.log(`  ✔ Backfilled owner roles: ${fixed}/${groups.length} groups`);
}

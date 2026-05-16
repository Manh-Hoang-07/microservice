import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const rolesData = JSON.parse(
  readFileSync(join(__dirname, '../data/roles.json'), 'utf-8'),
);

interface RoleEntry {
  code: string;
  name: string;
  status: string;
  parent_code: string | null;
}

export async function seedRoles(
  prisma: PrismaClient,
  permMap: Map<string, bigint>,
): Promise<Map<string, bigint>> {
  const codeToId = new Map<string, bigint>();
  const roles = rolesData as RoleEntry[];

  // First pass: create roles
  for (const r of roles) {
    const existing = await prisma.role.findUnique({ where: { code: r.code } });
    if (existing) {
      codeToId.set(r.code, existing.id);
      continue;
    }

    const created = await prisma.role.create({
      data: {
        code: r.code,
        name: r.name,
        status: r.status,
      },
    });
    codeToId.set(r.code, created.id);
    console.log(`  ✔ Role: ${r.code}`);
  }

  // Second pass: update parent relationships
  for (const r of roles) {
    if (r.parent_code) {
      const parentId = codeToId.get(r.parent_code);
      if (parentId) {
        await prisma.role.update({
          where: { code: r.code },
          data: { parentId: parentId },
        });
      }
    }
  }

  // Assign all permissions to super_admin
  const superAdminId = codeToId.get('super_admin');
  if (superAdminId) {
    await prisma.roleHasPermission.deleteMany({ where: { roleId: superAdminId } });
    const allPermIds = Array.from(permMap.values());
    if (allPermIds.length > 0) {
      await prisma.roleHasPermission.createMany({
        data: allPermIds.map((pid) => ({ roleId: superAdminId, permissionId: pid })),
        skipDuplicates: true,
      });
    }
    console.log(`  ✔ super_admin → ${allPermIds.length} permissions linked`);
  }

  // Assign permissions to group_owner (Quản lý nhóm)
  const groupOwnerId = codeToId.get('group_owner');
  if (groupOwnerId) {
    const ownerPermCodes = [
      'group.owner', 'group.comic', 'group.post',
      'group.member.manage', 'group.member.add', 'group.member.remove',
    ];
    await prisma.roleHasPermission.deleteMany({ where: { roleId: groupOwnerId } });
    const ownerPermIds = ownerPermCodes
      .map((c) => permMap.get(c))
      .filter((id): id is bigint => id !== undefined);
    if (ownerPermIds.length > 0) {
      await prisma.roleHasPermission.createMany({
        data: ownerPermIds.map((pid) => ({ roleId: groupOwnerId, permissionId: pid })),
        skipDuplicates: true,
      });
    }
    console.log(`  ✔ group_owner → ${ownerPermIds.length} permissions linked`);
  }

  console.log(`  ✔ Total roles: ${codeToId.size}`);
  return codeToId;
}

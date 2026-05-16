import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const usersData = JSON.parse(
  readFileSync(join(__dirname, '../data/users.json'), 'utf-8'),
);

interface UserEntry {
  user_id: number;
  username: string;
  group_code?: string;
  role_code?: string;
}

export async function seedUserAssignments(
  prisma: PrismaClient,
  roleMap: Map<string, bigint>,
  groupMap: Map<string, bigint>,
) {
  const users = usersData as UserEntry[];

  for (const user of users) {
    const userId = BigInt(user.user_id);

    // UserGroup membership (data only, không liên quan auth)
    if (user.group_code) {
      const groupId = groupMap.get(user.group_code);
      if (groupId) {
        const ugExists = await prisma.userGroup.findUnique({
          where: { userId_groupId: { userId, groupId } },
        });
        if (!ugExists) {
          await prisma.userGroup.create({ data: { userId, groupId, joinedAt: new Date() } });
          console.log(`  ✔ UserGroup: ${user.username} → ${user.group_code}`);
        }
      }
    }

    // UserRoleAssignment (global, không scope theo group)
    if (user.role_code) {
      const roleId = roleMap.get(user.role_code);
      if (!roleId) {
        console.log(`  ⚠ User ${user.username}: role ${user.role_code} not found`);
        continue;
      }
      const uraExists = await prisma.userRoleAssignment.findFirst({
        where: { userId, roleId },
      });
      if (!uraExists) {
        await prisma.userRoleAssignment.create({
          data: { userId, roleId },
        });
        console.log(`  ✔ UserRoleAssignment: ${user.username} → ${user.role_code}`);
      }
    }
  }
}

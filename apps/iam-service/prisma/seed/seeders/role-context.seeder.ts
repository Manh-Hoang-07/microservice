import { PrismaClient } from '../../../src/generated/prisma';

export async function seedRoleContexts(
  prisma: PrismaClient,
  roleMap: Map<string, bigint>,
  contextMap: Map<string, bigint>,
) {
  for (const [, roleId] of roleMap) {
    for (const [, contextId] of contextMap) {
      const exists = await prisma.roleContext.findUnique({
        where: { roleId_contextId: { roleId, contextId } },
      });
      if (!exists) {
        await prisma.roleContext.create({
          data: { roleId, contextId },
        });
      }
    }
  }
  console.log(`  ✔ RoleContexts linked`);
}

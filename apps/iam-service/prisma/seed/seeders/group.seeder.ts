import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const groupsData = JSON.parse(
  readFileSync(join(__dirname, '../data/groups.json'), 'utf-8'),
);

interface GroupEntry {
  type: string;
  code: string;
  name: string;
  status: string;
}

export async function seedGroups(prisma: PrismaClient): Promise<Map<string, bigint>> {
  const codeToId = new Map<string, bigint>();
  const groups = groupsData as GroupEntry[];

  for (const g of groups) {
    const existing = await prisma.group.findUnique({ where: { code: g.code } });
    if (existing) {
      codeToId.set(g.code, existing.id);
      continue;
    }

    const created = await prisma.group.create({
      data: {
        type: g.type,
        code: g.code,
        name: g.name,
        status: g.status,
      },
    });
    codeToId.set(g.code, created.id);
    console.log(`  ✔ Group: ${g.code}`);
  }

  console.log(`  ✔ Total groups: ${codeToId.size}`);
  return codeToId;
}

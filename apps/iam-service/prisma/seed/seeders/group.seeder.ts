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
  owner_user_id?: number;
}

export async function seedGroups(prisma: PrismaClient): Promise<Map<string, bigint>> {
  const codeToId = new Map<string, bigint>();
  const groups = groupsData as GroupEntry[];

  for (const g of groups) {
    const ownerId = g.owner_user_id != null ? BigInt(g.owner_user_id) : null;
    const existing = await prisma.group.findUnique({ where: { code: g.code } });
    if (existing) {
      // Dam bao ownerId khop seed (set owner cho nhom da ton tai).
      if (ownerId !== null && existing.ownerId !== ownerId) {
        await prisma.group.update({ where: { id: existing.id }, data: { ownerId } });
      }
      codeToId.set(g.code, existing.id);
      continue;
    }

    const created = await prisma.group.create({
      data: {
        type: g.type,
        code: g.code,
        name: g.name,
        status: g.status,
        ownerId,
      },
    });
    codeToId.set(g.code, created.id);
    console.log(`  ✔ Group: ${g.code}${ownerId !== null ? ` (owner ${ownerId})` : ''}`);
  }

  console.log(`  ✔ Total groups: ${codeToId.size}`);
  return codeToId;
}

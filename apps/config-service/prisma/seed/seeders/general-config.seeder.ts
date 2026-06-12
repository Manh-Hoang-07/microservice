import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const generalConfigData = JSON.parse(
  readFileSync(join(__dirname, '../data/general-configs.json'), 'utf-8'),
);

// Data file dung snake_case; Prisma model dung camelCase. Chi doi key cap 1
// (gia tri JSON nhu contactChannels giu nguyen).
function toCamelKeys(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
}

export async function seedGeneralConfig(prisma: PrismaClient) {
  const existing = await prisma.generalConfig.findFirst();
  if (existing) {
    console.log('  ⏭ GeneralConfig already exists, skipping');
    return;
  }

  await prisma.generalConfig.create({ data: toCamelKeys(generalConfigData) as any });
  console.log('  ✔ GeneralConfig created');
}

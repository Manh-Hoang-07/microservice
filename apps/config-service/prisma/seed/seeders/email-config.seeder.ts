import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

const emailConfigData = JSON.parse(
  readFileSync(join(__dirname, '../data/email-configs.json'), 'utf-8'),
);

// Data file dung snake_case; Prisma model dung camelCase. Doi key cap 1.
function toCamelKeys(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
}

export async function seedEmailConfig(prisma: PrismaClient) {
  const existing = await prisma.emailConfig.findFirst();
  if (existing) {
    console.log('  ⏭ EmailConfig already exists, skipping');
    return;
  }

  await prisma.emailConfig.create({ data: toCamelKeys(emailConfigData) as any });
  console.log('  ✔ EmailConfig created');
}

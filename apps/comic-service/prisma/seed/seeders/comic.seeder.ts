import { PrismaClient } from '../../../src/generated/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';

// Data file dung snake_case; Prisma model dung camelCase. Doi key cap 1.
function toCamelKeys(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
}

export async function seedComics(
  prisma: PrismaClient,
  categoryIdMap: Map<string, bigint>,
): Promise<Map<string, bigint>> {
  console.log('🌱 Seeding comics...');
  const data = JSON.parse(readFileSync(join(__dirname, '../data/comics.json'), 'utf-8'));
  const idMap = new Map<string, bigint>();

  for (const item of data) {
    const existing = await prisma.comic.findUnique({ where: { slug: item.slug } });
    if (existing) {
      console.log(`  ⏭ Comic already exists: ${item.slug}`);
      idMap.set(item.slug, existing.id);
      continue;
    }

    const { categories, ...comicData } = item;

    const created = await prisma.comic.create({
      data: toCamelKeys(comicData) as any,
    });
    idMap.set(item.slug, created.id);
    console.log(`  ✔ Comic: ${item.slug}`);

    // Create comic-category relationships
    if (categories && categories.length > 0) {
      for (const catSlug of categories) {
        const categoryId = categoryIdMap.get(catSlug);
        if (categoryId) {
          await prisma.comicCategory.create({
            data: {
              comicId: created.id,
              categoryId: categoryId,
            },
          });
          console.log(`    ✔ Linked category: ${catSlug}`);
        }
      }
    }
  }

  console.log(`  ✔ Total comics: ${idMap.size}`);
  return idMap;
}

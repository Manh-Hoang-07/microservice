import { PrismaClient } from '../../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import {
  seedAboutSections,
  seedStaffs,
  seedPartners,
  seedFaqs,
  seedCertificates,
  seedTestimonials,
  seedProjects,
  seedGalleries,
  seedBannerLocations,
  seedBanners,
} from './seeders';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('=== Seeding CMS Service ===\n');

  console.log('1. Seeding about sections...');
  await seedAboutSections(prisma);
  console.log();

  console.log('2. Seeding staffs...');
  await seedStaffs(prisma);
  console.log();

  console.log('3. Seeding partners...');
  await seedPartners(prisma);
  console.log();

  console.log('4. Seeding FAQs...');
  await seedFaqs(prisma);
  console.log();

  console.log('5. Seeding certificates...');
  await seedCertificates(prisma);
  console.log();

  console.log('6. Seeding testimonials...');
  await seedTestimonials(prisma);
  console.log();

  console.log('7. Seeding projects...');
  await seedProjects(prisma);
  console.log();

  console.log('8. Seeding galleries...');
  await seedGalleries(prisma);
  console.log();

  console.log('9. Seeding banner locations...');
  const locationIdMap = await seedBannerLocations(prisma);
  console.log();

  console.log('10. Seeding banners...');
  await seedBanners(prisma, locationIdMap);
  console.log();

  console.log('=== CMS Seeding complete ===');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

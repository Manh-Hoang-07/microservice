import { PrismaClient } from '../../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import {
  seedPermissions,
  seedRoles,
  seedGroups,
  seedUserAssignments,
} from './seeders';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('=== Seeding IAM Service ===\n');

  console.log('1. Seeding permissions...');
  const permMap = await seedPermissions(prisma);
  console.log();

  console.log('2. Seeding roles...');
  const roleMap = await seedRoles(prisma, permMap);
  console.log();

  console.log('3. Seeding groups...');
  const groupMap = await seedGroups(prisma);
  console.log();

  console.log('4. Seeding user assignments...');
  await seedUserAssignments(prisma, roleMap, groupMap);
  console.log();

  console.log('=== IAM Seeding complete ===');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

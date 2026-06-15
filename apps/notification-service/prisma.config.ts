import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Prisma CLI (migrate/generate) uses this. Prefer DIRECT_URL so migrations
    // bypass PgBouncer's transaction pool — DDL + advisory locks need a real
    // session. The runtime app connects via DATABASE_URL (PgBouncer).
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});

-- The Context model was removed from the Prisma schema, but the database
-- remnants lingered (migration 20260517 dropped permissions.scope but missed
-- these): groups.context_id is NOT NULL with no default, which blocks every
-- INSERT into groups via the current Prisma client (it no longer sends the
-- column). Drop the column + its FK + index, and the orphan context tables,
-- to realign the DB with the schema.

ALTER TABLE "groups" DROP CONSTRAINT IF EXISTS "groups_context_id_fkey";
DROP INDEX IF EXISTS "groups_IDX_groups_context_id";
ALTER TABLE "groups" DROP COLUMN IF EXISTS "context_id";

DROP TABLE IF EXISTS "role_contexts";
DROP TABLE IF EXISTS "contexts";

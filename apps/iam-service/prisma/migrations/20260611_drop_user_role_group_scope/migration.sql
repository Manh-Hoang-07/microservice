-- RBAC is global now (no per-group role assignments). The schema dropped
-- UserRoleAssignment.groupId, but the DB still has user_role_assignments.group_id
-- NOT NULL (+ FK + group-scoped indexes), blocking every insert. Drop the
-- column/FK/indexes and add the schema's global uniqueness on (user_id, role_id).

ALTER TABLE "user_role_assignments" DROP CONSTRAINT IF EXISTS "user_role_assignments_group_id_fkey";
DROP INDEX IF EXISTS "user_role_assignments_idx_user_group";
DROP INDEX IF EXISTS "user_role_assignments_idx_user_role_assignments_group_id";
DROP INDEX IF EXISTS "user_role_assignments_idx_user_role_group_unique";
ALTER TABLE "user_role_assignments" DROP COLUMN IF EXISTS "group_id";

CREATE UNIQUE INDEX IF NOT EXISTS "user_role_assignments_idx_user_role_unique" ON "user_role_assignments"("user_id", "role_id");
CREATE INDEX IF NOT EXISTS "user_role_assignments_idx_user" ON "user_role_assignments"("user_id");

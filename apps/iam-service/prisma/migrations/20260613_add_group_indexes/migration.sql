-- Indexes for group list filtering (status / owner_id / type) — additive, non-blocking
CREATE INDEX IF NOT EXISTS "groups_idx_status"   ON "groups"("status");
CREATE INDEX IF NOT EXISTS "groups_idx_owner_id" ON "groups"("owner_id");
CREATE INDEX IF NOT EXISTS "groups_idx_type"     ON "groups"("type");

-- Replace standalone group_id index with composite (group_id, role_id) for findUserIdsByRole.
-- The composite still covers group_id-prefix lookups (FK cascade), so dropping the old one is safe.
CREATE INDEX IF NOT EXISTS "group_member_roles_idx_group_role" ON "group_member_roles"("group_id", "role_id");
DROP INDEX IF EXISTS "group_member_roles_idx_group";

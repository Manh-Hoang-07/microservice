-- Composite index for getActivePermissionCodes CTE seed:
--   WHERE r.status='active' AND r.role_type='system'
-- Speeds up the role-tree root filter. Additive, non-blocking.
CREATE INDEX IF NOT EXISTS "roles_idx_role_type_status" ON "roles"("role_type", "status");

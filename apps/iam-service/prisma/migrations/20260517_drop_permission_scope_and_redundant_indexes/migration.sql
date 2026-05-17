-- Drop the deprecated `permissions.scope` column.
-- The context model was removed; no code reads or writes this field.
DROP INDEX IF EXISTS "permissions_idx_scope";
ALTER TABLE "permissions" DROP COLUMN IF EXISTS "scope";

-- Drop indexes that are prefix-covered by larger composites or the PK.
-- user_groups: (userId) is a prefix of (userId, joinedAt); (groupId) is a
-- prefix of (groupId, userId). Postgres can use the composite for the bare
-- prefix lookup, so the standalone indexes are pure write amplification.
DROP INDEX IF EXISTS "user_groups_idx_user_groups_user_id";
DROP INDEX IF EXISTS "user_groups_idx_user_groups_group_id";

-- role_has_permissions PK is (roleId, permissionId), which already covers
-- roleId-prefixed lookups. Keep only the (permissionId) reverse index.
DROP INDEX IF EXISTS "role_has_permissions_idx_role_has_permissions_role_id";

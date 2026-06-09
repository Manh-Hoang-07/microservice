-- Rename column `group` → `context` on menus table.
-- `group` is a reserved word in SQL, so quoting was always needed; `context`
-- is a plain identifier and clearer for future spaces (admin, group, mobile…).
ALTER TABLE "menus" RENAME COLUMN "group" TO "context";

-- Drop old index and create new one with updated name.
DROP INDEX IF EXISTS "menus_idx_group";
CREATE INDEX IF NOT EXISTS "menus_idx_context" ON "menus"("context");

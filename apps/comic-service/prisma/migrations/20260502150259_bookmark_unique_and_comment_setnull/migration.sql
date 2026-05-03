-- Bookmark: enforce one row per (user, chapter, page) so the upsert in
-- BookmarkRepository.upsert() works correctly. Without this, double-tap
-- inserted duplicate rows; the upsert fails with "no unique compound" at
-- runtime if the constraint is missing.
--
-- If duplicates exist in the production DB this migration will fail with
-- "could not create unique index". Dedup BEFORE running:
--
--   DELETE FROM bookmarks a
--   USING bookmarks b
--   WHERE a.id < b.id
--     AND a.user_id = b.user_id
--     AND a.chapter_id = b.chapter_id
--     AND a.page_number = b.page_number;
CREATE UNIQUE INDEX "bookmarks_idx_user_chapter_page_unique"
  ON "bookmarks"("user_id", "chapter_id", "page_number");

-- Comment: switch self-reference FK from CASCADE to SET NULL so admin
-- hard-deleting a parent comment doesn't wipe the entire reply subtree.
-- User-side delete already soft-deletes via status='deleted'; the rare
-- admin hard-delete should orphan replies, not nuke them.
ALTER TABLE "comments"
  DROP CONSTRAINT "comments_parent_id_fkey";

ALTER TABLE "comments"
  ADD CONSTRAINT "comments_parent_id_fkey"
  FOREIGN KEY ("parent_id") REFERENCES "comments"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

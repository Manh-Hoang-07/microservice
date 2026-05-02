-- Composite index for the public post list: filter `status IN (...)` and
-- order by `published_at DESC`. Without this composite, Postgres can use
-- only one of `posts_idx_status` / `posts_idx_published_at` per query
-- and falls back to a sort step on the rest of the working set.
CREATE INDEX "posts_idx_status_published_at"
  ON "posts"("status", "published_at" DESC);

-- Comment.parent self-relation: switch from CASCADE to SET NULL so admin
-- hard-deleting a parent comment doesn't wipe the entire reply subtree.
-- User-side delete already soft-deletes via status='deleted'; the rare
-- admin hard-delete should orphan replies, not nuke them.
ALTER TABLE "comments"
  DROP CONSTRAINT "comments_parent_id_fkey";

ALTER TABLE "comments"
  ADD CONSTRAINT "comments_parent_id_fkey"
  FOREIGN KEY ("parent_id") REFERENCES "comments"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

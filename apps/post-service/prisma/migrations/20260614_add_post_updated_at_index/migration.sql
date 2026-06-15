-- Indexes for admin/group post list ordering by `updated_at DESC` — additive, non-blocking.
-- PostRepository.findMany hardcodes `ORDER BY updated_at DESC`; the group path
-- (GroupPostService) adds `WHERE group_id = ?` before that same ordering.

-- Admin list: ORDER BY updated_at DESC
CREATE INDEX IF NOT EXISTS "posts_idx_updated_at" ON "posts"("updated_at" DESC);

-- Group list: WHERE group_id = ? ORDER BY updated_at DESC
CREATE INDEX IF NOT EXISTS "posts_idx_group_updated_at" ON "posts"("group_id", "updated_at" DESC);

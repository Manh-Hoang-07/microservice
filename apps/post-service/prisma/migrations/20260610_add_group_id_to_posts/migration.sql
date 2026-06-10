ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "group_id" BIGINT;
CREATE INDEX IF NOT EXISTS "posts_idx_group_id" ON "posts"("group_id");

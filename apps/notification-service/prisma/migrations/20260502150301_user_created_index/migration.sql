-- User notification list filters by user_id, sorts by created_at DESC.
-- Without this composite, Postgres uses [user_id, is_read] and re-sorts.
CREATE INDEX "notifications_idx_user_created"
  ON "notifications"("user_id", "created_at" DESC);

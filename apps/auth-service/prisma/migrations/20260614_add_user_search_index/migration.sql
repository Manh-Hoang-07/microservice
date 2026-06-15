-- Fix schema/DB drift: model User declares `search_text` column + `users_idx_search_text`
-- but the init migration (20260501164649_init) never created them. Additive & idempotent.

-- 1) Add the missing column (nullable, safe — no table rewrite blocking)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "search_text" TEXT;

-- 2) Backfill mirroring buildSearchText(name, email, username, phone):
--    each field lower+trim, drop empty/NULL, join by a single space (concat_ws skips NULLs).
UPDATE "users"
SET "search_text" = concat_ws(
  ' ',
  NULLIF(trim(lower("name")), ''),
  NULLIF(trim(lower("email")), ''),
  NULLIF(trim(lower("username")), ''),
  NULLIF(trim(lower("phone")), '')
)
WHERE "search_text" IS NULL;

-- 3) Index for `searchText.startsWith` (LIKE 'x%') on a TEXT column.
--    text_pattern_ops is required for prefix scans on non-C-locale DBs; Prisma's schema
--    @@index([searchText]) cannot express it, so this index is maintained here manually.
CREATE INDEX IF NOT EXISTS "users_idx_search_text" ON "users" ("search_text" text_pattern_ops);

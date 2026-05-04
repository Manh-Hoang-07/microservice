-- Migration kept: table name remains "outbox" (reverted from comic_outbox)
-- This is a no-op if the table was never renamed.
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'comic_outbox') THEN
    ALTER TABLE "comic_outbox" RENAME TO "outbox";
  END IF;
END $$;

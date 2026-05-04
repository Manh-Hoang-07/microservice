DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'post_outbox') THEN
    ALTER TABLE "post_outbox" RENAME TO "outbox";
  END IF;
END $$;

# Database Migrations

## Tooling

- Prisma migrations live in `apps/<service>/prisma/migrations/`
- Schema source of truth: `apps/<service>/prisma/schema.prisma`
- Each DB-backed service owns its own DB and its own migrations

## Local development

```bash
# Create a new migration after editing schema.prisma
cd apps/<service>
npx prisma migrate dev --name <descriptive-name>
```

This generates a SQL file under `prisma/migrations/<timestamp>_<name>/` and
applies it to the local DB.

## Production deploy flow

Migrations are applied **before** the new service version starts:

1. CI/CD builds + tests the new image/code
2. `prisma migrate deploy --schema=apps/<svc>/prisma/schema.prisma --skip-generate`
3. Restart / rolling-update the service

In Docker, this happens automatically via [entrypoint.sh](../infrastructure/docker/entrypoint.sh).
In the VPS deploy workflow, see `.github/workflows/deploy.yml`.

`prisma migrate deploy`:
- Applies all unapplied migrations in order
- Idempotent — running on an up-to-date DB is a no-op
- Will NOT generate or downgrade migrations
- Fails loudly if a migration is missing or drifted

## Writing safe migrations

### ✅ Generally safe

- Adding a new nullable column
- Adding a new index (use `CONCURRENTLY` for large tables; Prisma doesn't yet)
- Adding a new table
- Renaming a column (Prisma generates `RENAME COLUMN`, but app code must accept both names during deploy window)

### ⚠️ Needs care — multi-step rollout

| Change | Why risky | Safe path |
|--------|-----------|-----------|
| Drop column | Old app version still SELECTs it | (1) Stop reading it in app, (2) deploy, (3) drop in next migration |
| Rename column | Old version still uses old name | Add new col → backfill → switch reads/writes → deploy → drop old col |
| Add NOT NULL with no default | Old INSERTs fail | Add nullable → backfill → set NOT NULL |
| Change type | Implicit cast may fail | Add new col with new type → backfill → switch → drop old |
| Add unique index on existing data | Fails if dupes exist | Dedupe in migration first |

### 🚫 Avoid

- Multi-statement migrations that mix DDL + DML in a way that's not idempotent
- Migrations that take a `LOCK` for > 1s on hot tables (consider `pg_repack` instead)

## Rollback

Prisma does not generate down-migrations. Rollback options:

1. **Forward fix migration** — write a new migration that reverses the bad change. Most common.
2. **Restore from backup** — for catastrophic data loss. Use last `pg_dump` from `/var/backups/comic-platform/`. Expect data loss between dump and restore time.
3. **Revert the deploy** — if the migration was additive (added column, table) and the app is broken: roll back the app, the new schema is harmless.

For step 2:
```bash
gunzip -c /var/backups/comic-platform/2026-05-03/<db>.sql.gz \
  | pg_restore -h <host> -U postgres -d <db> --clean --if-exists
```

## Common pitfalls

- **`prisma migrate dev` in production**: NEVER. It can drop and recreate the DB. Always `migrate deploy`.
- **Forgetting `--skip-generate`**: in production we already shipped the generated client; regenerating with mismatched Prisma versions silently breaks runtime.
- **Manual `psql` edits**: leave `_prisma_migrations` out of sync. Always go through Prisma.
- **Two services migrating the same DB**: each service must own its own DB. If you ever share, designate ONE owner.

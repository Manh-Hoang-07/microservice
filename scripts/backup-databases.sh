#!/usr/bin/env bash
# Daily backup script for all comic-platform Postgres databases.
# Designed to run as a nightly cron on the host (or a sidecar container).
#
# Output: gzipped pg_dump per database, written to $BACKUP_DIR/yyyy-mm-dd/<db>.sql.gz
# Retention: keeps 7 daily + 4 weekly + 12 monthly snapshots in $BACKUP_DIR
#
# Required env vars:
#   POSTGRES_PASSWORD — used to authenticate to every DB
#   BACKUP_DIR        — output directory (default: /var/backups/comic-platform)
#   AWS_S3_BUCKET     — optional, if set syncs the dated folder to s3://$AWS_S3_BUCKET/
#
# Usage:
#   ./scripts/backup-databases.sh
#
# Cron example (run at 02:30 daily):
#   30 2 * * *  /opt/comic-platform/scripts/backup-databases.sh >> /var/log/db-backup.log 2>&1

set -euo pipefail

: "${POSTGRES_PASSWORD:?POSTGRES_PASSWORD required}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/comic-platform}"
PGUSER="${PGUSER:-postgres}"

# host:port:dbname triples — adjust to match your deployment
DBS=(
  "auth-db:5432:auth_db"
  "comic-db:5432:comic_db"
  "notification-db:5432:notification_db"
  "config-db:5432:config_db"
  "post-db:5432:post_db"
  "introduction-db:5432:introduction_db"
  "marketing-db:5432:marketing_db"
  "iam-db:5432:iam_db"
)

DATE=$(date +%F)
OUT="$BACKUP_DIR/$DATE"
mkdir -p "$OUT"

export PGPASSWORD="$POSTGRES_PASSWORD"

for spec in "${DBS[@]}"; do
  IFS=: read -r host port db <<< "$spec"
  echo "[backup] $db @ $host:$port → $OUT/$db.sql.gz"
  pg_dump -h "$host" -p "$port" -U "$PGUSER" --format=custom --no-owner --no-acl "$db" \
    | gzip -9 > "$OUT/$db.sql.gz"
done

# Optional: ship to S3
if [ -n "${AWS_S3_BUCKET:-}" ]; then
  echo "[backup] uploading to s3://$AWS_S3_BUCKET/$DATE/"
  aws s3 sync "$OUT" "s3://$AWS_S3_BUCKET/$DATE/" --no-progress
fi

# Retention: 7 daily + 4 weekly (Sundays) + 12 monthly (1st of month)
echo "[backup] applying retention policy"
cd "$BACKUP_DIR"
find . -maxdepth 1 -type d -name '20??-??-??' | while read -r d; do
  d=${d#./}
  age_days=$(( ( $(date +%s) - $(date -d "$d" +%s) ) / 86400 ))
  dow=$(date -d "$d" +%u)         # 1..7, 7=Sunday
  dom=$(date -d "$d" +%d)         # 01..31

  keep=0
  [ "$age_days" -le 7 ]  && keep=1                                  # last 7 days
  [ "$age_days" -le 28 ] && [ "$dow" = "7" ] && keep=1               # 4 weekly Sun
  [ "$age_days" -le 365 ] && [ "$dom" = "01" ] && keep=1             # 12 monthly

  if [ "$keep" = "0" ]; then
    echo "[backup] pruning $d (age ${age_days}d)"
    rm -rf "./$d"
  fi
done

echo "[backup] done — $(du -sh "$OUT" | cut -f1)"

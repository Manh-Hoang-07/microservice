-- Add roleType to roles table (additive — existing rows get default 'system')
ALTER TABLE "roles" ADD COLUMN IF NOT EXISTS "role_type" VARCHAR(20) NOT NULL DEFAULT 'system';

-- Index for filtering by roleType
CREATE INDEX IF NOT EXISTS "roles_idx_role_type" ON "roles"("role_type");

-- Junction table: group-scoped role assignments per member
CREATE TABLE IF NOT EXISTS "group_member_roles" (
    "user_id"  BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "role_id"  BIGINT NOT NULL,

    CONSTRAINT "group_member_roles_pkey" PRIMARY KEY ("user_id", "group_id", "role_id"),

    CONSTRAINT "group_member_roles_group_id_fkey"
        FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE,

    CONSTRAINT "group_member_roles_role_id_fkey"
        FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "group_member_roles_idx_user_group" ON "group_member_roles"("user_id", "group_id");
CREATE INDEX IF NOT EXISTS "group_member_roles_idx_group"      ON "group_member_roles"("group_id");

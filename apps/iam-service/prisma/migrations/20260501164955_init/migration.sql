-- CreateTable
CREATE TABLE "contexts" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "ref_id" BIGINT,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "owner_id" BIGINT,
    "context_id" BIGINT NOT NULL,
    "metadata" JSONB,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_groups" (
    "user_id" BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "joined_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_groups_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(120) NOT NULL,
    "scope" VARCHAR(30) NOT NULL DEFAULT 'context',
    "name" VARCHAR(150),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "parent_id" BIGINT,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(150),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "parent_id" BIGINT,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_has_permissions" (
    "role_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,

    CONSTRAINT "role_has_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "role_contexts" (
    "role_id" BIGINT NOT NULL,
    "context_id" BIGINT NOT NULL,

    CONSTRAINT "role_contexts_pkey" PRIMARY KEY ("role_id","context_id")
);

-- CreateTable
CREATE TABLE "user_role_assignments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role_id" BIGINT NOT NULL,
    "group_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_role_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iam_outbox" (
    "id" BIGSERIAL NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "iam_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contexts_code_key" ON "contexts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "contexts_idx_contexts_type_ref_id" ON "contexts"("type", "ref_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_code_key" ON "groups"("code");

-- CreateIndex
CREATE INDEX "groups_IDX_groups_context_id" ON "groups"("context_id");

-- CreateIndex
CREATE UNIQUE INDEX "groups_idx_groups_type_code" ON "groups"("type", "code");

-- CreateIndex
CREATE INDEX "user_groups_idx_user_groups_user_id" ON "user_groups"("user_id");

-- CreateIndex
CREATE INDEX "user_groups_idx_user_groups_user_joined_at" ON "user_groups"("user_id", "joined_at");

-- CreateIndex
CREATE INDEX "user_groups_idx_user_groups_group_id" ON "user_groups"("group_id");

-- CreateIndex
CREATE INDEX "user_groups_idx_group_user" ON "user_groups"("group_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_idx_scope" ON "permissions"("scope");

-- CreateIndex
CREATE INDEX "permissions_idx_permissions_parent_id" ON "permissions"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE INDEX "role_has_permissions_idx_role_has_permissions_role_id" ON "role_has_permissions"("role_id");

-- CreateIndex
CREATE INDEX "role_has_permissions_idx_role_has_permissions_permission_id" ON "role_has_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "role_contexts_idx_role_contexts_role_id" ON "role_contexts"("role_id");

-- CreateIndex
CREATE INDEX "role_contexts_idx_role_contexts_context_id" ON "role_contexts"("context_id");

-- CreateIndex
CREATE INDEX "user_role_assignments_idx_user_group" ON "user_role_assignments"("user_id", "group_id");

-- CreateIndex
CREATE INDEX "user_role_assignments_idx_user_role_assignments_group_id" ON "user_role_assignments"("group_id");

-- CreateIndex
CREATE INDEX "user_role_assignments_idx_user_role_assignments_role_id" ON "user_role_assignments"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_assignments_idx_user_role_group_unique" ON "user_role_assignments"("user_id", "role_id", "group_id");

-- CreateIndex
CREATE INDEX "iam_outbox_published_created_at_idx" ON "iam_outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_context_id_fkey" FOREIGN KEY ("context_id") REFERENCES "contexts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_has_permissions" ADD CONSTRAINT "role_has_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_has_permissions" ADD CONSTRAINT "role_has_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_contexts" ADD CONSTRAINT "role_contexts_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_contexts" ADD CONSTRAINT "role_contexts_context_id_fkey" FOREIGN KEY ("context_id") REFERENCES "contexts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

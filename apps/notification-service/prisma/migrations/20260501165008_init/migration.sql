-- CreateTable
CREATE TABLE "notifications" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(30) NOT NULL DEFAULT 'info',
    "data" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(0),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_templates" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(30) NOT NULL DEFAULT 'render',
    "type" VARCHAR(30) NOT NULL,
    "content" TEXT,
    "file_path" VARCHAR(500),
    "metadata" JSONB,
    "variables" JSONB,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "content_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_followers_projection" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "followed_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comic_followers_projection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_idx_user_id" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_idx_status" ON "notifications"("status");

-- CreateIndex
CREATE INDEX "notifications_idx_type" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_idx_is_read" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_idx_user_read" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE UNIQUE INDEX "content_templates_code_key" ON "content_templates"("code");

-- CreateIndex
CREATE INDEX "idx_content_templates_code" ON "content_templates"("code");

-- CreateIndex
CREATE INDEX "idx_content_templates_status" ON "content_templates"("status");

-- CreateIndex
CREATE INDEX "idx_content_templates_category" ON "content_templates"("category");

-- CreateIndex
CREATE INDEX "idx_content_templates_type" ON "content_templates"("type");

-- CreateIndex
CREATE INDEX "cfp_idx_comic_id" ON "comic_followers_projection"("comic_id");

-- CreateIndex
CREATE INDEX "cfp_idx_user_id" ON "comic_followers_projection"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "cfp_idx_user_comic" ON "comic_followers_projection"("user_id", "comic_id");

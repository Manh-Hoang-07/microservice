-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_id" BIGINT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "seo_keywords" VARCHAR(500),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "group_id" BIGINT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "group_id" BIGINT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "image" VARCHAR(500),
    "cover_image" VARCHAR(500),
    "status" VARCHAR(30) NOT NULL DEFAULT 'draft',
    "post_type" VARCHAR(30) NOT NULL DEFAULT 'text',
    "video_url" VARCHAR(500),
    "audio_url" VARCHAR(500),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(0),
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "seo_keywords" VARCHAR(500),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "group_id" BIGINT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "post_id" BIGINT NOT NULL,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "daily_stats" (
    "post_id" BIGINT NOT NULL,
    "stat_date" DATE NOT NULL,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("post_id","stat_date")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "post_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("post_id","category_id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "post_id" BIGINT NOT NULL,
    "tag_id" BIGINT NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "post_id" BIGINT NOT NULL,
    "parent_id" BIGINT,
    "guest_name" VARCHAR(255),
    "guest_email" VARCHAR(255),
    "content" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'visible',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox" (
    "id" BIGSERIAL NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_idx_slug" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_idx_name" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_idx_parent_id" ON "categories"("parent_id");

-- CreateIndex
CREATE INDEX "categories_idx_is_active" ON "categories"("is_active");

-- CreateIndex
CREATE INDEX "categories_idx_sort_order" ON "categories"("sort_order");

-- CreateIndex
CREATE INDEX "categories_idx_created_at" ON "categories"("created_at");

-- CreateIndex
CREATE INDEX "categories_idx_created_user_id" ON "categories"("created_user_id");

-- CreateIndex
CREATE INDEX "categories_idx_updated_user_id" ON "categories"("updated_user_id");

-- CreateIndex
CREATE INDEX "categories_idx_group_id" ON "categories"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_idx_slug" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_idx_name" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_idx_is_active" ON "tags"("is_active");

-- CreateIndex
CREATE INDEX "tags_idx_created_at" ON "tags"("created_at");

-- CreateIndex
CREATE INDEX "tags_idx_created_user_id" ON "tags"("created_user_id");

-- CreateIndex
CREATE INDEX "tags_idx_updated_user_id" ON "tags"("updated_user_id");

-- CreateIndex
CREATE INDEX "tags_idx_group_id" ON "tags"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_idx_slug" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_idx_status" ON "posts"("status");

-- CreateIndex
CREATE INDEX "posts_idx_post_type" ON "posts"("post_type");

-- CreateIndex
CREATE INDEX "posts_idx_is_featured" ON "posts"("is_featured");

-- CreateIndex
CREATE INDEX "posts_idx_is_pinned" ON "posts"("is_pinned");

-- CreateIndex
CREATE INDEX "posts_idx_published_at" ON "posts"("published_at");

-- CreateIndex
CREATE INDEX "posts_idx_created_at" ON "posts"("created_at");

-- CreateIndex
CREATE INDEX "posts_idx_created_user_id" ON "posts"("created_user_id");

-- CreateIndex
CREATE INDEX "posts_idx_updated_user_id" ON "posts"("updated_user_id");

-- CreateIndex
CREATE INDEX "posts_idx_group_id" ON "posts"("group_id");

-- CreateIndex
CREATE INDEX "stats_idx_view_count" ON "stats"("view_count");

-- CreateIndex
CREATE INDEX "stats_idx_updated_at" ON "stats"("updated_at");

-- CreateIndex
CREATE INDEX "daily_stats_idx_stat_date" ON "daily_stats"("stat_date");

-- CreateIndex
CREATE INDEX "daily_stats_idx_view_count" ON "daily_stats"("view_count");

-- CreateIndex
CREATE INDEX "comments_idx_user_id" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_idx_post_id" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_idx_parent_id" ON "comments"("parent_id");

-- CreateIndex
CREATE INDEX "comments_idx_status" ON "comments"("status");

-- CreateIndex
CREATE INDEX "comments_idx_created_at" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "comments_idx_post_created" ON "comments"("post_id", "created_at");

-- CreateIndex
CREATE INDEX "comments_idx_guest_email" ON "comments"("guest_email");

-- CreateIndex
CREATE INDEX "comments_idx_created_user_id" ON "comments"("created_user_id");

-- CreateIndex
CREATE INDEX "comments_idx_updated_user_id" ON "comments"("updated_user_id");

-- CreateIndex
CREATE INDEX "outbox_idx_unpublished" ON "outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_stats" ADD CONSTRAINT "daily_stats_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "comics" (
    "id" BIGSERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "cover_image" VARCHAR(500),
    "author" VARCHAR(255),
    "status" VARCHAR(30) NOT NULL DEFAULT 'draft',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "last_chapter_id" BIGINT,
    "last_chapter_updated_at" TIMESTAMP(0),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "group_id" BIGINT,

    CONSTRAINT "comics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "comic_id" BIGINT NOT NULL,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "follow_count" BIGINT NOT NULL DEFAULT 0,
    "rating_count" BIGINT NOT NULL DEFAULT 0,
    "rating_sum" BIGINT NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("comic_id")
);

-- CreateTable
CREATE TABLE "daily_stats" (
    "comic_id" BIGINT NOT NULL,
    "stat_date" DATE NOT NULL,
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("comic_id","stat_date")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" BIGSERIAL NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "team_id" BIGINT,
    "title" VARCHAR(255) NOT NULL,
    "chapter_index" INTEGER NOT NULL,
    "chapter_label" VARCHAR(50),
    "status" VARCHAR(30) NOT NULL DEFAULT 'draft',
    "view_count" BIGINT NOT NULL DEFAULT 0,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "group_id" BIGINT,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "group_id" BIGINT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_categories" (
    "comic_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,

    CONSTRAINT "comic_categories_pkey" PRIMARY KEY ("comic_id","category_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "chapter_id" BIGINT,
    "parent_id" BIGINT,
    "content" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'visible',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "content" TEXT,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" BIGSERIAL NOT NULL,
    "chapter_id" BIGINT NOT NULL,
    "page_number" INTEGER NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "file_size" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" BIGSERIAL NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "chapter_id" BIGINT,
    "user_id" BIGINT,
    "ip" VARCHAR(45),
    "user_agent" VARCHAR(500),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comic_id" BIGINT NOT NULL,
    "chapter_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "reading_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "chapter_id" BIGINT NOT NULL,
    "page_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "comics_slug_key" ON "comics"("slug");

-- CreateIndex
CREATE INDEX "comics_idx_slug" ON "comics"("slug");

-- CreateIndex
CREATE INDEX "comics_idx_status" ON "comics"("status");

-- CreateIndex
CREATE INDEX "comics_idx_author" ON "comics"("author");

-- CreateIndex
CREATE INDEX "comics_idx_created_at" ON "comics"("created_at");

-- CreateIndex
CREATE INDEX "comics_idx_created_user_id" ON "comics"("created_user_id");

-- CreateIndex
CREATE INDEX "comics_idx_updated_user_id" ON "comics"("updated_user_id");

-- CreateIndex
CREATE INDEX "comics_idx_last_chapter_updated_at" ON "comics"("last_chapter_updated_at");

-- CreateIndex
CREATE INDEX "comics_idx_is_featured" ON "comics"("is_featured");

-- CreateIndex
CREATE INDEX "comics_idx_group_id" ON "comics"("group_id");

-- CreateIndex
CREATE INDEX "stats_idx_view_count" ON "stats"("view_count");

-- CreateIndex
CREATE INDEX "stats_idx_follow_count" ON "stats"("follow_count");

-- CreateIndex
CREATE INDEX "stats_idx_updated_at" ON "stats"("updated_at");

-- CreateIndex
CREATE INDEX "daily_stats_idx_stat_date" ON "daily_stats"("stat_date");

-- CreateIndex
CREATE INDEX "daily_stats_idx_view_count" ON "daily_stats"("view_count");

-- CreateIndex
CREATE INDEX "chapters_idx_comic_id" ON "chapters"("comic_id");

-- CreateIndex
CREATE INDEX "chapters_idx_comic_chapter_index" ON "chapters"("comic_id", "chapter_index");

-- CreateIndex
CREATE INDEX "chapters_idx_team_id" ON "chapters"("team_id");

-- CreateIndex
CREATE INDEX "chapters_idx_status" ON "chapters"("status");

-- CreateIndex
CREATE INDEX "chapters_idx_view_count" ON "chapters"("view_count");

-- CreateIndex
CREATE INDEX "chapters_idx_created_at" ON "chapters"("created_at");

-- CreateIndex
CREATE INDEX "chapters_idx_created_user_id" ON "chapters"("created_user_id");

-- CreateIndex
CREATE INDEX "chapters_idx_updated_user_id" ON "chapters"("updated_user_id");

-- CreateIndex
CREATE INDEX "chapters_idx_group_id" ON "chapters"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_idx_comic_chapter_unique" ON "chapters"("comic_id", "chapter_index");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_idx_slug" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_idx_name" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_idx_created_at" ON "categories"("created_at");

-- CreateIndex
CREATE INDEX "categories_idx_created_user_id" ON "categories"("created_user_id");

-- CreateIndex
CREATE INDEX "categories_idx_updated_user_id" ON "categories"("updated_user_id");

-- CreateIndex
CREATE INDEX "categories_idx_group_id" ON "categories"("group_id");

-- CreateIndex
CREATE INDEX "comments_idx_user_id" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_idx_comic_id" ON "comments"("comic_id");

-- CreateIndex
CREATE INDEX "comments_idx_chapter_id" ON "comments"("chapter_id");

-- CreateIndex
CREATE INDEX "comments_idx_parent_id" ON "comments"("parent_id");

-- CreateIndex
CREATE INDEX "comments_idx_status" ON "comments"("status");

-- CreateIndex
CREATE INDEX "comments_idx_created_at" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "comments_idx_comic_created" ON "comments"("comic_id", "created_at");

-- CreateIndex
CREATE INDEX "comments_idx_chapter_created" ON "comments"("chapter_id", "created_at");

-- CreateIndex
CREATE INDEX "comments_idx_created_user_id" ON "comments"("created_user_id");

-- CreateIndex
CREATE INDEX "comments_idx_updated_user_id" ON "comments"("updated_user_id");

-- CreateIndex
CREATE INDEX "reviews_idx_user_id" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_idx_comic_id" ON "reviews"("comic_id");

-- CreateIndex
CREATE INDEX "reviews_idx_rating" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "reviews_idx_created_at" ON "reviews"("created_at");

-- CreateIndex
CREATE INDEX "reviews_idx_created_user_id" ON "reviews"("created_user_id");

-- CreateIndex
CREATE INDEX "reviews_idx_updated_user_id" ON "reviews"("updated_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_idx_user_comic" ON "reviews"("user_id", "comic_id");

-- CreateIndex
CREATE INDEX "pages_idx_chapter_id" ON "pages"("chapter_id");

-- CreateIndex
CREATE INDEX "pages_idx_chapter_page" ON "pages"("chapter_id", "page_number");

-- CreateIndex
CREATE UNIQUE INDEX "pages_idx_chapter_page_unique" ON "pages"("chapter_id", "page_number");

-- CreateIndex
CREATE INDEX "views_idx_comic_id" ON "views"("comic_id");

-- CreateIndex
CREATE INDEX "views_idx_chapter_id" ON "views"("chapter_id");

-- CreateIndex
CREATE INDEX "views_idx_user_id" ON "views"("user_id");

-- CreateIndex
CREATE INDEX "views_idx_created_at" ON "views"("created_at");

-- CreateIndex
CREATE INDEX "views_idx_comic_created" ON "views"("comic_id", "created_at");

-- CreateIndex
CREATE INDEX "views_idx_chapter_created" ON "views"("chapter_id", "created_at");

-- CreateIndex
CREATE INDEX "follows_idx_user_id" ON "follows"("user_id");

-- CreateIndex
CREATE INDEX "follows_idx_comic_id" ON "follows"("comic_id");

-- CreateIndex
CREATE INDEX "follows_idx_created_at" ON "follows"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "follows_idx_user_comic" ON "follows"("user_id", "comic_id");

-- CreateIndex
CREATE INDEX "reading_histories_idx_user_id" ON "reading_histories"("user_id");

-- CreateIndex
CREATE INDEX "reading_histories_idx_comic_id" ON "reading_histories"("comic_id");

-- CreateIndex
CREATE INDEX "reading_histories_idx_chapter_id" ON "reading_histories"("chapter_id");

-- CreateIndex
CREATE INDEX "reading_histories_idx_updated_at" ON "reading_histories"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "reading_histories_idx_user_comic" ON "reading_histories"("user_id", "comic_id");

-- CreateIndex
CREATE INDEX "bookmarks_idx_user_id" ON "bookmarks"("user_id");

-- CreateIndex
CREATE INDEX "bookmarks_idx_chapter_id" ON "bookmarks"("chapter_id");

-- CreateIndex
CREATE INDEX "bookmarks_idx_user_chapter" ON "bookmarks"("user_id", "chapter_id");

-- CreateIndex
CREATE INDEX "bookmarks_idx_created_at" ON "bookmarks"("created_at");

-- CreateIndex
CREATE INDEX "outbox_idx_unpublished" ON "outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "comics" ADD CONSTRAINT "comics_last_chapter_id_fkey" FOREIGN KEY ("last_chapter_id") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_stats" ADD CONSTRAINT "daily_stats_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_categories" ADD CONSTRAINT "comic_categories_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_categories" ADD CONSTRAINT "comic_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_histories" ADD CONSTRAINT "reading_histories_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_histories" ADD CONSTRAINT "reading_histories_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('Pending', 'Read', 'Replied', 'Closed');

-- CreateEnum
CREATE TYPE "BannerLinkTarget" AS ENUM ('_self', '_blank');

-- CreateTable
CREATE TABLE "banner_locations" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "banner_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(500),
    "image" VARCHAR(500),
    "mobile_image" VARCHAR(500),
    "link" VARCHAR(500),
    "link_target" "BannerLinkTarget" NOT NULL DEFAULT '_self',
    "description" TEXT,
    "button_text" VARCHAR(100),
    "button_color" VARCHAR(50),
    "text_color" VARCHAR(50),
    "location_id" BIGINT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "start_date" TIMESTAMP(0),
    "end_date" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "message" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'Pending',
    "reply" TEXT,
    "replied_at" TIMESTAMP(0),
    "replied_by" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox" (
    "id" BIGSERIAL NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banner_locations_code_key" ON "banner_locations"("code");

-- CreateIndex
CREATE INDEX "banner_locations_idx_code" ON "banner_locations"("code");

-- CreateIndex
CREATE INDEX "banner_locations_idx_status" ON "banner_locations"("status");

-- CreateIndex
CREATE INDEX "banners_idx_location_id" ON "banners"("location_id");

-- CreateIndex
CREATE INDEX "banners_idx_status" ON "banners"("status");

-- CreateIndex
CREATE INDEX "banners_idx_sort_order" ON "banners"("sort_order");

-- CreateIndex
CREATE INDEX "banners_idx_start_date" ON "banners"("start_date");

-- CreateIndex
CREATE INDEX "banners_idx_end_date" ON "banners"("end_date");

-- CreateIndex
CREATE INDEX "contacts_idx_status" ON "contacts"("status");

-- CreateIndex
CREATE INDEX "contacts_idx_email" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "contacts_idx_created_at" ON "contacts"("created_at");

-- CreateIndex
CREATE INDEX "outbox_idx_published" ON "outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "banner_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

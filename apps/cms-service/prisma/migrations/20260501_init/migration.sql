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
CREATE TABLE "projects" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "short_description" VARCHAR(500),
    "cover_image" VARCHAR(500),
    "location" VARCHAR(255),
    "area" VARCHAR(255),
    "start_date" DATE,
    "end_date" DATE,
    "status" VARCHAR(30) NOT NULL DEFAULT 'planning',
    "client_name" VARCHAR(255),
    "budget" VARCHAR(255),
    "images" JSONB DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "seo_title" VARCHAR(255),
    "seo_description" VARCHAR(500),
    "seo_keywords" VARCHAR(500),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_sections" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "image" VARCHAR(500),
    "video_url" VARCHAR(500),
    "section_type" VARCHAR(30) NOT NULL DEFAULT 'general',
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "about_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255),
    "department" VARCHAR(255),
    "bio" TEXT,
    "avatar" VARCHAR(500),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "social_links" JSONB DEFAULT '{}',
    "experience" TEXT,
    "expertise" TEXT,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" BIGSERIAL NOT NULL,
    "client_name" VARCHAR(255) NOT NULL,
    "client_position" VARCHAR(255),
    "client_company" VARCHAR(255),
    "client_avatar" VARCHAR(500),
    "content" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5,
    "project_id" BIGINT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(500),
    "website" VARCHAR(500),
    "description" TEXT,
    "type" VARCHAR(50),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galleries" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "cover_image" VARCHAR(500),
    "images" JSONB DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(500),
    "issued_by" VARCHAR(255),
    "issued_date" DATE,
    "expiry_date" DATE,
    "certificate_number" VARCHAR(255),
    "description" TEXT,
    "type" VARCHAR(50),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" BIGSERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "helpful_count" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
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

-- CreateIndex (banner_locations)
CREATE UNIQUE INDEX "banner_locations_code_key" ON "banner_locations"("code");
CREATE INDEX "banner_locations_idx_code" ON "banner_locations"("code");
CREATE INDEX "banner_locations_idx_status" ON "banner_locations"("status");

-- CreateIndex (banners)
CREATE INDEX "banners_idx_location_id" ON "banners"("location_id");
CREATE INDEX "banners_idx_status" ON "banners"("status");
CREATE INDEX "banners_idx_sort_order" ON "banners"("sort_order");
CREATE INDEX "banners_idx_start_date" ON "banners"("start_date");
CREATE INDEX "banners_idx_end_date" ON "banners"("end_date");

-- CreateIndex (contacts)
CREATE INDEX "contacts_idx_status" ON "contacts"("status");
CREATE INDEX "contacts_idx_email" ON "contacts"("email");
CREATE INDEX "contacts_idx_created_at" ON "contacts"("created_at");

-- CreateIndex (projects)
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
CREATE INDEX "projects_idx_slug" ON "projects"("slug");
CREATE INDEX "projects_idx_status" ON "projects"("status");
CREATE INDEX "projects_idx_featured" ON "projects"("featured");
CREATE INDEX "projects_idx_sort_order" ON "projects"("sort_order");
CREATE INDEX "projects_idx_status_sort_order" ON "projects"("status", "sort_order");

-- CreateIndex (about_sections)
CREATE UNIQUE INDEX "about_sections_slug_key" ON "about_sections"("slug");
CREATE INDEX "about_sections_idx_slug" ON "about_sections"("slug");
CREATE INDEX "about_sections_idx_section_type" ON "about_sections"("section_type");
CREATE INDEX "about_sections_idx_status" ON "about_sections"("status");
CREATE INDEX "about_sections_idx_sort_order" ON "about_sections"("sort_order");
CREATE INDEX "about_sections_idx_status_sort_order" ON "about_sections"("status", "sort_order");

-- CreateIndex (staff)
CREATE INDEX "staff_idx_status" ON "staff"("status");
CREATE INDEX "staff_idx_department" ON "staff"("department");
CREATE INDEX "staff_idx_sort_order" ON "staff"("sort_order");
CREATE INDEX "staff_idx_status_sort_order" ON "staff"("status", "sort_order");

-- CreateIndex (testimonials)
CREATE INDEX "testimonials_idx_project_id" ON "testimonials"("project_id");
CREATE INDEX "testimonials_idx_featured" ON "testimonials"("featured");
CREATE INDEX "testimonials_idx_status" ON "testimonials"("status");
CREATE INDEX "testimonials_idx_sort_order" ON "testimonials"("sort_order");
CREATE INDEX "testimonials_idx_status_sort_order" ON "testimonials"("status", "sort_order");

-- CreateIndex (partners)
CREATE INDEX "partners_idx_type" ON "partners"("type");
CREATE INDEX "partners_idx_status" ON "partners"("status");
CREATE INDEX "partners_idx_sort_order" ON "partners"("sort_order");
CREATE INDEX "partners_idx_status_sort_order" ON "partners"("status", "sort_order");

-- CreateIndex (galleries)
CREATE UNIQUE INDEX "galleries_slug_key" ON "galleries"("slug");
CREATE INDEX "galleries_idx_slug" ON "galleries"("slug");
CREATE INDEX "galleries_idx_featured" ON "galleries"("featured");
CREATE INDEX "galleries_idx_status" ON "galleries"("status");
CREATE INDEX "galleries_idx_sort_order" ON "galleries"("sort_order");
CREATE INDEX "galleries_idx_status_sort_order" ON "galleries"("status", "sort_order");

-- CreateIndex (certificates)
CREATE INDEX "certificates_idx_type" ON "certificates"("type");
CREATE INDEX "certificates_idx_status" ON "certificates"("status");
CREATE INDEX "certificates_idx_sort_order" ON "certificates"("sort_order");
CREATE INDEX "certificates_idx_status_sort_order" ON "certificates"("status", "sort_order");

-- CreateIndex (faqs)
CREATE INDEX "faqs_idx_status" ON "faqs"("status");
CREATE INDEX "faqs_idx_sort_order" ON "faqs"("sort_order");
CREATE INDEX "faqs_idx_status_sort_order" ON "faqs"("status", "sort_order");

-- CreateIndex (outbox)
CREATE INDEX "outbox_idx_published" ON "outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "banner_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

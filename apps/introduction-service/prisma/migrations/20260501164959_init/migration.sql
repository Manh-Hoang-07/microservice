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

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_idx_slug" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_idx_status" ON "projects"("status");

-- CreateIndex
CREATE INDEX "projects_idx_featured" ON "projects"("featured");

-- CreateIndex
CREATE INDEX "projects_idx_sort_order" ON "projects"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "about_sections_slug_key" ON "about_sections"("slug");

-- CreateIndex
CREATE INDEX "about_sections_idx_slug" ON "about_sections"("slug");

-- CreateIndex
CREATE INDEX "about_sections_idx_section_type" ON "about_sections"("section_type");

-- CreateIndex
CREATE INDEX "about_sections_idx_status" ON "about_sections"("status");

-- CreateIndex
CREATE INDEX "about_sections_idx_sort_order" ON "about_sections"("sort_order");

-- CreateIndex
CREATE INDEX "staff_idx_status" ON "staff"("status");

-- CreateIndex
CREATE INDEX "staff_idx_department" ON "staff"("department");

-- CreateIndex
CREATE INDEX "staff_idx_sort_order" ON "staff"("sort_order");

-- CreateIndex
CREATE INDEX "testimonials_idx_project_id" ON "testimonials"("project_id");

-- CreateIndex
CREATE INDEX "testimonials_idx_featured" ON "testimonials"("featured");

-- CreateIndex
CREATE INDEX "testimonials_idx_status" ON "testimonials"("status");

-- CreateIndex
CREATE INDEX "testimonials_idx_sort_order" ON "testimonials"("sort_order");

-- CreateIndex
CREATE INDEX "partners_idx_type" ON "partners"("type");

-- CreateIndex
CREATE INDEX "partners_idx_status" ON "partners"("status");

-- CreateIndex
CREATE INDEX "partners_idx_sort_order" ON "partners"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "galleries_slug_key" ON "galleries"("slug");

-- CreateIndex
CREATE INDEX "galleries_idx_slug" ON "galleries"("slug");

-- CreateIndex
CREATE INDEX "galleries_idx_featured" ON "galleries"("featured");

-- CreateIndex
CREATE INDEX "galleries_idx_status" ON "galleries"("status");

-- CreateIndex
CREATE INDEX "galleries_idx_sort_order" ON "galleries"("sort_order");

-- CreateIndex
CREATE INDEX "certificates_idx_type" ON "certificates"("type");

-- CreateIndex
CREATE INDEX "certificates_idx_status" ON "certificates"("status");

-- CreateIndex
CREATE INDEX "certificates_idx_sort_order" ON "certificates"("sort_order");

-- CreateIndex
CREATE INDEX "faqs_idx_status" ON "faqs"("status");

-- CreateIndex
CREATE INDEX "faqs_idx_sort_order" ON "faqs"("sort_order");

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

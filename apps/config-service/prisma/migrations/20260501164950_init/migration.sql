-- CreateTable
CREATE TABLE "general_configs" (
    "id" BIGSERIAL NOT NULL,
    "site_name" VARCHAR(255) NOT NULL,
    "site_description" TEXT,
    "site_logo" VARCHAR(500),
    "site_favicon" VARCHAR(500),
    "site_email" VARCHAR(255),
    "site_phone" VARCHAR(20),
    "site_address" TEXT,
    "site_country_id" BIGINT,
    "site_province_id" BIGINT,
    "site_ward_id" BIGINT,
    "site_copyright" VARCHAR(255),
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    "locale" VARCHAR(10) NOT NULL DEFAULT 'vi',
    "currency" VARCHAR(10) NOT NULL DEFAULT 'VND',
    "contact_channels" JSONB,
    "meta_title" VARCHAR(255),
    "meta_keywords" TEXT,
    "og_title" VARCHAR(255),
    "og_description" TEXT,
    "og_image" VARCHAR(500),
    "canonical_url" VARCHAR(500),
    "google_analytics_id" VARCHAR(50),
    "google_search_console" VARCHAR(255),
    "facebook_pixel_id" VARCHAR(50),
    "twitter_site" VARCHAR(50),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "general_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_configs" (
    "id" BIGSERIAL NOT NULL,
    "smtp_host" VARCHAR(255) NOT NULL,
    "smtp_port" INTEGER NOT NULL DEFAULT 587,
    "smtp_secure" BOOLEAN NOT NULL DEFAULT true,
    "smtp_username" VARCHAR(255) NOT NULL,
    "smtp_password" VARCHAR(500) NOT NULL,
    "from_email" VARCHAR(255) NOT NULL,
    "from_name" VARCHAR(255) NOT NULL,
    "reply_to_email" VARCHAR(255),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "email_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(120) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "path" VARCHAR(255),
    "api_path" VARCHAR(255),
    "icon" VARCHAR(120),
    "type" VARCHAR(30) NOT NULL DEFAULT 'route',
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "parent_id" BIGINT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "show_in_menu" BOOLEAN NOT NULL DEFAULT true,
    "group" VARCHAR(50) NOT NULL DEFAULT 'admin',
    "required_permission_code" VARCHAR(120),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "code_alpha3" VARCHAR(10),
    "name" VARCHAR(255) NOT NULL,
    "official_name" VARCHAR(255),
    "phone_code" VARCHAR(20),
    "currency_code" VARCHAR(20),
    "flag_emoji" VARCHAR(20),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "phone_code" VARCHAR(20),
    "country_id" BIGINT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "note" TEXT,
    "code_bnv" VARCHAR(20),
    "code_tms" VARCHAR(20),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wards" (
    "id" BIGSERIAL NOT NULL,
    "province_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menus_code_key" ON "menus"("code");

-- CreateIndex
CREATE INDEX "menus_idx_code" ON "menus"("code");

-- CreateIndex
CREATE INDEX "menus_idx_parent_id" ON "menus"("parent_id");

-- CreateIndex
CREATE INDEX "menus_idx_status_show_in_menu" ON "menus"("status", "show_in_menu");

-- CreateIndex
CREATE INDEX "menus_idx_group" ON "menus"("group");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE INDEX "countries_idx_countries_status" ON "countries"("status");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_code_key" ON "provinces"("code");

-- CreateIndex
CREATE INDEX "provinces_idx_provinces_country_id" ON "provinces"("country_id");

-- CreateIndex
CREATE INDEX "provinces_idx_provinces_status" ON "provinces"("status");

-- CreateIndex
CREATE INDEX "wards_idx_wards_province_id" ON "wards"("province_id");

-- CreateIndex
CREATE INDEX "wards_idx_wards_code" ON "wards"("code");

-- CreateIndex
CREATE INDEX "wards_idx_wards_status" ON "wards"("status");

-- CreateIndex
CREATE INDEX "wards_idx_wards_province_status" ON "wards"("province_id", "status");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provinces" ADD CONSTRAINT "provinces_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "password" VARCHAR(255),
    "name" VARCHAR(255),
    "image" VARCHAR(255),
    "googleId" VARCHAR(255),
    "status" VARCHAR(30) NOT NULL DEFAULT 'active',
    "email_verified_at" TIMESTAMP(0),
    "phone_verified_at" TIMESTAMP(0),
    "last_login_at" TIMESTAMP(0),
    "remember_token" VARCHAR(100),
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "birthday" DATE,
    "gender" VARCHAR(20),
    "address" TEXT,
    "country_id" BIGINT,
    "province_id" BIGINT,
    "ward_id" BIGINT,
    "about" TEXT,
    "created_user_id" BIGINT,
    "updated_user_id" BIGINT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_outbox" (
    "id" BIGSERIAL NOT NULL,
    "event_type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE INDEX "users_idx_status" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_idx_created_at" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_idx_status_created" ON "users"("status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE INDEX "profiles_idx_province_id" ON "profiles"("province_id");

-- CreateIndex
CREATE INDEX "profiles_idx_country_id" ON "profiles"("country_id");

-- CreateIndex
CREATE INDEX "profiles_idx_user_id" ON "profiles"("user_id");

-- CreateIndex
CREATE INDEX "auth_outbox_published_created_at_idx" ON "auth_outbox"("published", "created_at");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

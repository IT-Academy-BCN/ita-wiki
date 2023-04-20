/*
  Warnings:

  - You are about to drop the column `filepath` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `resources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `filePath` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_userId_fkey";

-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_topicId_fkey";

-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_userId_fkey";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "filepath",
DROP COLUMN "mimetype",
DROP COLUMN "userId",
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "resources";

-- DropTable
DROP TABLE "topics";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" VARCHAR(10) NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "USER_STATUS" NOT NULL DEFAULT 'INACTIVE',
    "role" "USER_ROLE" NOT NULL DEFAULT 'REGISTERED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "resource_type" "RESOURCE_TYPE" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicsOnResources" (
    "resource_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TopicsOnResources_pkey" PRIMARY KEY ("topic_id","resource_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "user"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicsOnResources" ADD CONSTRAINT "TopicsOnResources_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicsOnResources" ADD CONSTRAINT "TopicsOnResources_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `filePath` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `TopicsOnResources` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file_path` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TopicsOnResources" DROP CONSTRAINT "TopicsOnResources_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "TopicsOnResources" DROP CONSTRAINT "TopicsOnResources_topic_id_fkey";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "filePath",
DROP COLUMN "mimeType",
ADD COLUMN     "file_path" TEXT NOT NULL,
ADD COLUMN     "mime_type" TEXT NOT NULL;

-- DropTable
DROP TABLE "TopicsOnResources";

-- CreateTable
CREATE TABLE "topic_resource" (
    "resource_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "topic_resource_pkey" PRIMARY KEY ("topic_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "topic_resource" ADD CONSTRAINT "topic_resource_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_resource" ADD CONSTRAINT "topic_resource_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

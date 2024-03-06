/*
  Warnings:

  - A unique constraint covering the columns `[media_id]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "media_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "category_media_id_key" ON "category"("media_id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

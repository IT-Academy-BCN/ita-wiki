/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

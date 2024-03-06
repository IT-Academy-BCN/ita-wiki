/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "topic" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "resource_slug_key" ON "resource"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "topic_slug_key" ON "topic"("slug");

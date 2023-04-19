/*
  Warnings:

  - You are about to drop the column `topicId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `topics` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `topics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_topicId_fkey";

-- DropIndex
DROP INDEX "topics_topic_key";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "topicId";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "topic",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicsOnResources" (
    "resourceId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TopicsOnResources_pkey" PRIMARY KEY ("topicId","resourceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicsOnResources" ADD CONSTRAINT "TopicsOnResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicsOnResources" ADD CONSTRAINT "TopicsOnResources_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `TopicsOnResources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TopicsOnResources" DROP CONSTRAINT "TopicsOnResources_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "TopicsOnResources" DROP CONSTRAINT "TopicsOnResources_topic_id_fkey";

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

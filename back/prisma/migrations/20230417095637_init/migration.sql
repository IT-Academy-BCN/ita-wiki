/*
  Warnings:

  - You are about to drop the column `topicId` on the `resources` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_topicId_fkey";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "topicId";

-- CreateTable
CREATE TABLE "_ResourceToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToTopic_AB_unique" ON "_ResourceToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToTopic_B_index" ON "_ResourceToTopic"("B");

-- AddForeignKey
ALTER TABLE "_ResourceToTopic" ADD CONSTRAINT "_ResourceToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceToTopic" ADD CONSTRAINT "_ResourceToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

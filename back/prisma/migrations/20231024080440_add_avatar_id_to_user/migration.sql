/*
  Warnings:

  - A unique constraint covering the columns `[avatar_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_avatar_id_key" ON "user"("avatar_id");

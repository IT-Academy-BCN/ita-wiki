/*
  Warnings:

  - You are about to drop the column `avatar_id` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_avatar_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_id";

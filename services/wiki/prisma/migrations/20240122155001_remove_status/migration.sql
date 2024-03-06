/*
  Warnings:

  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "status";

-- DropEnum
DROP TYPE "USER_STATUS";

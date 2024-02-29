/*
  Warnings:

  - You are about to drop the column `dni` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_dni_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "dni";

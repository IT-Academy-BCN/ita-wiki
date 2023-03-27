/*
  Warnings:

  - You are about to alter the column `dni` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "dni" SET DATA TYPE VARCHAR(10);

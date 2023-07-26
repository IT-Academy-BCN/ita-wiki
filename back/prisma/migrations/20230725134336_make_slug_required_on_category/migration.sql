/*
  Warnings:

  - Made the column `slug` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL;

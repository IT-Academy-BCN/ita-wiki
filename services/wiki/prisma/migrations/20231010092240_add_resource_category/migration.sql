/*
  Warnings:

  - Added the required column `category_id` to the `resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "category_id" TEXT NULL;

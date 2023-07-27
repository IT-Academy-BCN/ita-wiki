/*
  Warnings:

  - Made the column `slug` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "specialization" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_specialization_fkey" FOREIGN KEY ("specialization") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

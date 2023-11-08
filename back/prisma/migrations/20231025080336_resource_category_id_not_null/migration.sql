/*
  Warnings:

  - Made the column `category_id` on table `resource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "resource" ALTER COLUMN "category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "resource" ADD CONSTRAINT "resource_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

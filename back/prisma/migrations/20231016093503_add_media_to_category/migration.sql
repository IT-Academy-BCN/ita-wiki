-- AlterTable
ALTER TABLE "media" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

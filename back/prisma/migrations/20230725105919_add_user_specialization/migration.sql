/*
  Warnings:

  - Added the required column `specialization` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "specialization" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_specialization_fkey" FOREIGN KEY ("specialization") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

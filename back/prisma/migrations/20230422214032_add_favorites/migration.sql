/*
  Warnings:

  - You are about to drop the column `filePath` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `media` table. All the data in the column will be lost.
  - Added the required column `file_path` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "filePath",
DROP COLUMN "mimeType",
ADD COLUMN     "file_path" TEXT NOT NULL,
ADD COLUMN     "mime_type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "favorites" (
    "user_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("user_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

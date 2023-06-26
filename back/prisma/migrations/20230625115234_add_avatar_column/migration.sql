-- AlterTable
ALTER TABLE "media" ADD COLUMN     "isAvatar" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "avatar_id" TEXT;

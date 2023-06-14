-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('NOT_SEEN', 'SEEN');

-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "seen/not_seen status" "STATUS" NOT NULL DEFAULT 'NOT_SEEN';

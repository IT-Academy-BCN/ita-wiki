-- CreateEnum
CREATE TYPE "RESOURCE_STATUS" AS ENUM ('SEEN', 'NOT_SEEN');

-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "status" "RESOURCE_STATUS" NOT NULL DEFAULT 'NOT_SEEN';

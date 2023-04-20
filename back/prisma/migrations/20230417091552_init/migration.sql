-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('ADMIN', 'REGISTERED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "USER_ROLE" NOT NULL DEFAULT 'REGISTERED';

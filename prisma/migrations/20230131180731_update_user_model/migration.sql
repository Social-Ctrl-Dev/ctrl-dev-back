-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone_is_verified" BOOLEAN DEFAULT false;

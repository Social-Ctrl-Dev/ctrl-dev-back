-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

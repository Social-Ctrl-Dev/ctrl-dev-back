-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postID_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userID_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userID_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postID_fkey" FOREIGN KEY ("postID") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

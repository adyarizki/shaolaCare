-- AlterTable
ALTER TABLE "public"."Blogpost" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Blogpost" ADD CONSTRAINT "Blogpost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

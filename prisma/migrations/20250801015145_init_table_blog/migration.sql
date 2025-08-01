-- CreateTable
CREATE TABLE "public"."Blogpost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blogpost_pkey" PRIMARY KEY ("id")
);

// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { z } from "zod";


export async function GET() {
  try {
    const posts = await prisma.blogpost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true, // hanya ambil nama penulis
          },
        },
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);

    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session); // ✅ cek apakah ada id

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { title, content } = await req.json();

  const post = await prisma.blogpost.create({
    data: {
      title,
      content,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post);
}
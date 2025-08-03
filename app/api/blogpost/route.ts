import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // pastikan path benar

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

// export async function POST(request: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user?.id) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const { title, content } = await request.json();

//     if (!title || !content) {
//       return NextResponse.json(
//         { error: 'Title and content are required' },
//         { status: 400 }
//       );
//     }

//     const post = await prisma.blogpost.create({
//       data: {
//         title,
//         content,
//         authorId: session.user.id, // ← tambahkan ini
//       },
//     });

//     return NextResponse.json(post, { status: 201 });
//   } catch (error) {
//     console.error('Error creating blog post:', error);
//     return NextResponse.json(
//       { error: 'Failed to create blog post' },
//       { status: 500 }
//     );
//   }
// }

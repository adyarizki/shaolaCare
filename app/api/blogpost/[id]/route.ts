import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;
    
    console.log(`API: Searching for blog post with ID: ${id}`);
    
    // 🔥 FIX: Add include to fetch author data
    const post = await prisma.blogpost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true, // Only get the author's name
          },
        },
      },
    });

    console.log(`API: Blog post found:`, post ? 'Yes' : 'No');
    console.log(`API: Author data:`, post?.author); // Debug author data

    if (!post) {
      console.log(`API: Blog post with ID ${id} not found in database`);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log(`API: Returning blog post: ${post.title}`);
    console.log(`API: Author name: ${post.author?.name || 'No author'}`);
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('API: Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Await params in Next.js 15+
//     const { id } = await params;
    
//     await prisma.blogpost.delete({
//       where: { id }
//     })

//     return NextResponse.json({ message: 'Post deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting blog post:', error)
//     return NextResponse.json(
//       { error: 'Failed to delete blog post' },
//       { status: 500 }
//     )
//   }
// }
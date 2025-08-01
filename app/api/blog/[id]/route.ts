import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const blog = await prisma.blogpost.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Get error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// UPDATE ingredient by id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const { title, content, createdAt } = await req.json();

    const updated = await prisma.blogpost.update({
      where: { id },
      data: {
        title,
        content,
        createdAt
 
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE ingredient by id
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    await prisma.blogpost.delete({
      where: { id },
    });

    return NextResponse.json({ message: "blog deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

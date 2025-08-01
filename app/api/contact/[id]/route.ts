import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const messages = await prisma.message.findUnique({
      where: { id },
    });

    if (!messages) {
      return NextResponse.json({ error: "message not found" }, { status: 404 });
    }

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Get error:", error);
    return NextResponse.json({ error: "Failed to fetch message" }, { status: 500 });
  }
}


// DELETE ingredient by id
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    await prisma.message.delete({
      where: { id },
    });

    return NextResponse.json({ message: "product deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

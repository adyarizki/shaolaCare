import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Get error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// UPDATE ingredient by id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const { name, stock, price } = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        stock,
        price,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE ingredient by id
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "product deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

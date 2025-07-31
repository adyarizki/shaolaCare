// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}


export async function POST(req: Request) {
  try {
    const { name, stock, price } = await req.json();

    const product = await prisma.product.create({
      data: {
        name,
        stock: Number(stock),
        price: Number(price),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Gagal tambah produk:", error);
    return NextResponse.json({ error: "Gagal tambah produk" }, { status: 500 });
  }
}
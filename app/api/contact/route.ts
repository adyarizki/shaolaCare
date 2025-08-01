// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(messages);
}


export async function POST(req: Request) {
  try {
    const { nama, email, message } = await req.json();

    const messages = await prisma.message.create({
      data: {
        nama,
        email,
        message,
      },
    });

    return NextResponse.json(messages, { status: 201 });
  } catch (error) {
    console.error("Gagal tambah pesan:", error);
    return NextResponse.json({ error: "Gagal tambah pesan" }, { status: 500 });
  }
}
// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from "zod";


export async function GET() {
  const blogs = await prisma.blogpost.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(blogs);
}


const blogSchema = z.object({
  title: z.string(),
  content: z.string(),

});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = blogSchema.parse(body);

    const blog = await prisma.blogpost.create({
      data: validatedData,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEE_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
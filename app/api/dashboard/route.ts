// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan path prisma benar

export async function GET() {
  try {
    const [totalEmployees, totalProducts, totalMessages, totalBlogposts] = await Promise.all([
      prisma.employee.count(),
      prisma.product.count(),
      prisma.message.count(),
      prisma.blogpost.count(),
    ]);

    return NextResponse.json({
      totalEmployees,
      totalProducts,
      totalMessages,
      totalBlogposts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}

// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Debug token
  console.log("Middleware - Token:", token);
  console.log("Middleware - Path:", pathname);

  // Jika sudah login dan ke /signin, redirect ke /dashboard
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Jika belum login dan akses halaman dilindungi
  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Khusus halaman admin, cek role
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  
  return NextResponse.next();
}

// ⚠️ Hapus "/signin" dari matcher!
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/signin"],
};

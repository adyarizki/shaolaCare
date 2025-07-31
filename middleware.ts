import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware function
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const isAuthPage = req.nextUrl.pathname.startsWith("/signin")

  // Jika sudah login dan ke /login, redirect ke dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Jika belum login dan akses ke halaman yang butuh login, redirect ke /login
  const protectedPaths = ["/dashboard"]
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*",  "/signin"],
}

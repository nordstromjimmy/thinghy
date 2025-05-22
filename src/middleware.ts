import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 🔁 Disable middleware during development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const publicRoutes = [
    "/",
    "/terms",
    "/privacy",
    "/sitemap.xml",
    "/robots.txt",
    "/og-image.jpg",
  ];
  const { pathname } = req.nextUrl;

  const isApi = pathname.startsWith("/api/");

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isPublic || isApi) return NextResponse.next();

  return NextResponse.redirect(new URL("/", req.url));
}
export const config = {
  matcher: [
    // Ignore static/internal assets AND root-level public images
    "/((?!_next/static|_next/image|api|favicon.ico|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.svg$).*)",
  ],
};

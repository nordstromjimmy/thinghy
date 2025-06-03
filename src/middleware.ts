import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Publicly accessible routes
const publicRoutes = ["/", "/login", "/signup", "/privacy", "/terms"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create Supabase client with request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  // ✅ 1. Redirect logged-in user away from landing/login/signup to dashboard
  if (user && ["/", "/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ 2. Block unauthenticated access to dashboard routes
  const isProtectedRoute = pathname.startsWith("/dashboard");
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// 🔁 Apply middleware to all relevant routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

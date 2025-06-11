import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Publicly accessible routes
const publicRoutes = ["/", "/login", "/signup", "/privacy", "/terms"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

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

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && ["/", "/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!user && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (err) {
    console.error("Supabase auth error in middleware:", err);

    // Optionally clear cookies if they're broken
    res.cookies.set("sb-access-token", "", { maxAge: 0 });
    res.cookies.set("sb-refresh-token", "", { maxAge: 0 });

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }
}

// 🔁 Apply middleware to all relevant routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

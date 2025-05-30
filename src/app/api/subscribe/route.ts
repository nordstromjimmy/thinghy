import { isRateLimited } from "@/lib/rateLimit";
import { createBrowserClient } from "@/lib/supabase-browser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createBrowserClient();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert([{ email }]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

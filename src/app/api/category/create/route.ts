import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();

  const formData = await req.formData();
  const name = formData.get("category")?.toString().trim();

  if (!name) {
    return NextResponse.redirect(new URL("/dashboard/thinghies", req.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { error } = await supabase.from("categories").insert({
    name,
    user_id: user.id,
  });

  if (error) {
    console.error("Failed to create category:", error.message);
    return NextResponse.redirect(
      new URL("/dashboard/thinghies?error=true", req.url)
    );
  }

  return NextResponse.redirect(
    new URL(`/dashboard/category=${encodeURIComponent(name)}`, req.url)
  );
}

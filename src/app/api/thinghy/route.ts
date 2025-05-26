import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, fields, isFavorite, category } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid title" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("thinghies").insert([
    {
      user_id: user.id,
      title: title.trim(),
      fields: fields ?? [],
      is_favorite: isFavorite,
      category: category || null,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

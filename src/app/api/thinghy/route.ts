import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const supabase = createSupabaseServerClient(token);

  const {
    data: { user },
    error,
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

  const { error: insertError } = await supabase.from("thinghies").insert([
    {
      user_id: user.id,
      title: title.trim(),
      fields: fields ?? [],
      is_favorite: isFavorite,
      category: category || null,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

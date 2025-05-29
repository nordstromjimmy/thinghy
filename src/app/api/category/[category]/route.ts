import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  const { newName } = await req.json();
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !newName?.trim()) return NextResponse.json({}, { status: 400 });

  const from = decodeURIComponent(category);
  const to = newName.trim();

  const { error: updateThings } = await supabase
    .from("thinghies")
    .update({ category: to })
    .eq("user_id", user.id)
    .eq("category", from);

  const { error: updateCat } = await supabase
    .from("categories")
    .update({ name: to })
    .eq("user_id", user.id)
    .eq("name", from);

  if (updateThings || updateCat) {
    return NextResponse.json(
      { error: "Failed to rename category" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({}, { status: 401 });

  const from = decodeURIComponent(category);

  const { error: clearThings } = await supabase
    .from("thinghies")
    .update({ category: null })
    .eq("user_id", user.id)
    .eq("category", from);

  const { error: deleteCat } = await supabase
    .from("categories")
    .delete()
    .eq("user_id", user.id)
    .eq("name", from);

  if (clearThings || deleteCat) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

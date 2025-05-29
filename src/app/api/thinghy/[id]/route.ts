import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("thinghies")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await req.json();

  const updates: any = {};

  if (body.title) updates.title = body.title;
  if (body.fields) updates.fields = body.fields;
  if (typeof body.isFavorite === "boolean")
    updates.is_favorite = body.isFavorite;
  if (body.category !== undefined) updates.category = body.category;

  const { error } = await supabase
    .from("thinghies")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user?.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 1. Fetch the Thinghy
  const { data: thinghy, error } = await supabase
    .from("thinghies")
    .select("fields")
    .eq("id", id)
    .single();

  if (error || !thinghy) {
    return NextResponse.json({ error: "Thinghy not found" }, { status: 404 });
  }

  // 2. Find image field paths
  const imagePaths = (thinghy.fields || [])
    .filter((f: any) => f.type === "image" && f.value)
    .map((f: any) => f.value); // The stored path, not signed URL

  // 3. Delete from storage
  if (imagePaths.length > 0) {
    await supabase.storage.from("thinghy-images").remove(imagePaths);
  }

  // 4. Delete the thinghy
  const { error: deleteError } = await supabase
    .from("thinghies")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Failed to delete thinghy" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

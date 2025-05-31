import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createServerAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  const supabase = createSupabaseServerClient(); // ✅ This one has session context

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(); // ✅ Works with cookies!

  if (userError || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Clean up user-related data
  await supabase.from("thinghies").delete().eq("user_id", user.id);
  await supabase.from("categories").delete().eq("user_id", user.id);

  // Use admin client to delete the user
  const adminClient = createServerAdminClient();
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(
    user.id
  );

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

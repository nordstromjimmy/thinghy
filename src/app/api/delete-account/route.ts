import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createServerAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  let userId: string | null = null;

  // Check for Authorization header (Flutter mobile)
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    // Validate token using a new Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    userId = user.id;
  } else {
    // Browser fallback: use cookie-based Supabase server client
    const supabase = createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    userId = user.id;
  }

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  // Delete user-related data
  const supabase = createSupabaseServerClient();
  await supabase.from("thinghies").delete().eq("user_id", userId);
  await supabase.from("categories").delete().eq("user_id", userId);

  // Delete user account
  const adminClient = createServerAdminClient();
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(
    userId
  );

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

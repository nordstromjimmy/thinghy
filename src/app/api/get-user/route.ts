import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Response.json(user);
}

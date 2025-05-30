import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function fetchThinghiesAndCategories() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { redirectTo: "/login" };

  const { data: thinghies, error } = await supabase
    .from("thinghies")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return {
    thinghies: thinghies ?? [],
    categories: categories ?? [],
    error,
  };
}

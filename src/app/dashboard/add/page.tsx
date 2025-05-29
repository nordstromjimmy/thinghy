import ThinghyFormWrapper from "@/components/ThinghyFormWrapper";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AddThinghyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = createSupabaseServerClient();
  const { category } = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  return (
    <ThinghyFormWrapper
      categories={categories || []}
      defaultCategory={category || ""}
    />
  );
}

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center bg-[#2a2a3c]">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600">
        Start by adding your first Thinghy - the fix, the find, or the fact you
        don't want to forget.
      </p>
    </main>
  );
}

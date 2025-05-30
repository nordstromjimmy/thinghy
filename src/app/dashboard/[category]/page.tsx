import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CategoryClient from "@/components/CategoryClient";
import { ThinghyCard } from "@/components/ThinghyCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const supabase = createSupabaseServerClient();
  const { category } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  // ✅ Check if category exists
  const { data: existingCategory } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", user.id)
    .eq("name", category)
    .single();

  if (!existingCategory) {
    notFound(); // ❌ Invalid category, show 404
  }

  const { data, error } = await supabase
    .from("thinghies")
    .select("*")
    .eq("user_id", user.id)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-red-500">Failed to load Thinghies in {category}</p>
    );
  }

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Category: {category}</h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <CategoryClient category={category} />
          <Link
            href={`/dashboard/add?category=${category}`}
            className="bg-white text-black px-3 py-1.5 rounded hover:bg-gray-200 transition text-sm text-center"
          >
            + Add Thinghy
          </Link>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400 mb-4">No Thinghies in this category yet.</p>
      ) : (
        <ul className="space-y-4 mb-4">
          {data.map((thinghy) => (
            <li key={thinghy.id}>
              <ThinghyCard thinghy={thinghy} />
            </li>
          ))}
        </ul>
      )}

      <a
        href="/dashboard/thingies"
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to Thinghies
      </a>
    </main>
  );
}

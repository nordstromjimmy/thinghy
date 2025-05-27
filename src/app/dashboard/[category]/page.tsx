import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import CategoryClient from "@/components/CategoryClient";

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
      <div className="flex flex-col flex-row sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Category: {category}</h1>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <CategoryClient category={category} />
          <Link
            href={`/dashboard/add?category=${category}`}
            className="bg-white text-black px-3 py-1.5 rounded hover:bg-gray-200 transition text-sm"
          >
            + Add Thinghy
          </Link>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400">No Thinghies in this category yet.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((thinghy) => (
            <li key={thinghy.id}>
              <Link
                href={`/dashboard/thingies/${thinghy.id}`}
                className="block bg-[#2a2a3c] border border-gray-700 rounded p-4 shadow hover:bg-[#34344a] transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {thinghy.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

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
    <main className="p-6 max-w-4xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category: {category}</h1>
        <Link
          href={`/dashboard/add?category=${category}`}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          + Add Thinghy
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-400">No Thinghies yet in this category.</p>
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

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ImageIcon } from "lucide-react";
import ThinghySearchList from "@/components/ThinghySearchList";
import { redirect } from "next/navigation";
import { ThinghyCard } from "@/components/ThinghyCard";

export default async function ThinghyListPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load thinghies</p>
    );
  }

  // Group thinghies
  const defaultThinghies = thinghies.filter((t) => !t.category);
  const groupedByCategory: Record<string, typeof thinghies> = {};
  thinghies.forEach((t) => {
    if (t.category) {
      groupedByCategory[t.category] ||= [];
      groupedByCategory[t.category].push(t);
    }
  });

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Your Thinghies</h1>

        <div className="relative w-full md:w-sm">
          <ThinghySearchList thinghies={thinghies} />
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        {/* Left: Categories list (if any) */}
        <div className="flex-1">
          <h2 className="text-sm text-gray-400 mb-2">Categories</h2>
          {categories!.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {categories!.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/dashboard/${encodeURIComponent(cat.name)}`}
                  className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No categories yet</p>
          )}
        </div>

        {/* Right: Category creation form */}
        <form
          action="/api/category/create"
          method="POST"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            name="category"
            placeholder="Create new category"
            className="w-full md:w-44 px-2 py-1 rounded bg-[#2a2a3c] text-white border border-gray-600"
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 whitespace-nowrap cursor-pointer"
          >
            Create
          </button>
        </form>
      </div>

      {defaultThinghies.length === 0 ? (
        <p className="text-gray-400">You haven’t saved any Thinghies yet.</p>
      ) : (
        <ul className="space-y-4 mb-10">
          {defaultThinghies.map((thinghy) => (
            <li key={thinghy.id}>
              <ThinghyCard thinghy={thinghy} />
            </li>
          ))}
        </ul>
      )}
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <section key={category} className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">{category}</h2>
            <Link
              href={`/dashboard/add?category=${encodeURIComponent(category)}`}
              className="text-sm hover:underline"
            >
              + Add a Thinghy to {category}
            </Link>
          </div>
          <ul className="space-y-4">
            {items.map((thinghy) => (
              <li key={thinghy.id}>
                <ThinghyCard thinghy={thinghy} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

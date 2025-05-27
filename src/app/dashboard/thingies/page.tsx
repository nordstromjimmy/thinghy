import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ThinghyListPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-center mt-10 text-white">Not logged in.</p>;
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

        <form
          action="/api/category/create"
          method="POST"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            name="category"
            placeholder="Create new category"
            className="w-full md:w-64 px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            required
          />
          <button
            type="submit"
            className="bg-yellow-200 text-black px-4 py-2 rounded hover:bg-yellow-300 whitespace-nowrap cursor-pointer"
          >
            Create
          </button>
        </form>
      </div>

      {categories!.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/dashboard/${encodeURIComponent(cat.name)}`}
                className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

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
              className="text-sm text-yellow-200 hover:underline"
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

// Extracted ThinghyCard component for reuse
function ThinghyCard({ thinghy }: { thinghy: any }) {
  return (
    <Link
      href={`/dashboard/thingies/${thinghy.id}`}
      className="block bg-[#2a2a3c] border border-gray-700 rounded p-4 shadow hover:bg-[#34344a] transition"
    >
      <h2 className="text-lg font-semibold text-white">{thinghy.title}</h2>
      <div className="mt-2 text-sm text-gray-300 space-y-1">
        {thinghy.fields?.slice(0, 2).map((field: any, index: number) => (
          <p key={index} className="flex items-center gap-2">
            <strong>{field.label}:</strong>
            {field.type === "password" ? (
              <span className="text-white">••••••</span>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={field.value === "true"}
                readOnly
                className="w-4 h-4 accent-white"
              />
            ) : field.type === "color" ? (
              <span
                className="inline-block w-4 h-4 rounded border border-gray-500"
                style={{ backgroundColor: field.value }}
              />
            ) : (
              <span>{field.value}</span>
            )}
          </p>
        ))}
      </div>
    </Link>
  );
}

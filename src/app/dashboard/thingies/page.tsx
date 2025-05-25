import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function ThinghyListPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-center mt-10">Not logged in.</p>;
  }

  const { data: thinghies, error } = await supabase
    .from("thinghies")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load thinghies</p>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Your Thinghies</h1>

      {thinghies.length === 0 ? (
        <p className="text-gray-400">You haven’t saved any Thinghies yet.</p>
      ) : (
        <ul className="space-y-4">
          {thinghies.map((thinghy) => (
            <li key={thinghy.id}>
              <Link
                href={`/dashboard/thingies/${thinghy.id}`}
                className="block bg-[#2a2a3c] border border-gray-700 rounded p-4 shadow hover:bg-[#34344a] transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {thinghy.title}
                </h2>
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  {thinghy.fields
                    ?.slice(0, 3)
                    .map((field: any, index: number) => (
                      <p key={index}>
                        <strong>{field.label}:</strong> {field.value}
                      </p>
                    ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: favorites } = await supabase
    .from("thinghies")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_favorite", true);

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="flex flex-col items-center justify-start px-6 py-12 text-white bg-[#2a2a3c]">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-400 mb-8 max-w-lg text-center">
          Thinghy is your personal brain drawer — a place to offload and
          organize anything you don’t want to forget.
        </p>

        <section className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 w-full max-w-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">How to use Thinghy</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              1. <strong>Add a Thinghy</strong> to store details about anything
              — from garage codes to router configs to gift ideas.
            </li>
            <li>
              1. <strong>Customize each field</strong>: title it, tag it,
              reorder it, and choose its type — like number, checkbox, color, or
              image.
            </li>
            <li>
              3. <strong>Passwords are secure by default</strong>, with a toggle
              to show/hide them as needed.
            </li>
            <li>
              4. <strong>Preview your Thinghies</strong> with icons, checkboxes,
              and color swatches in your list and detail views.
            </li>
            <li>
              5. <strong>Edit any Thinghy</strong> anytime — change its order,
              fields, or content on the fly.
            </li>
          </ul>
        </section>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard/add"
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            + Add a Thinghy
          </Link>
          <Link
            href="/dashboard/thingies"
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            View Your Thinghies
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start px-6 py-12 text-white bg-[#2a2a3c]">
        {" "}
        {favorites && favorites.length > 0 && (
          <section className="w-full max-w-2xl mb-10">
            <h2 className="text-xl font-semibold mb-4">
              ⭐ Favorite Thinghies
            </h2>
            <ul className="grid grid-cols-1 gap-4">
              {favorites.map((fav) => (
                <li
                  key={fav.id}
                  className="bg-[#1e1e2f] p-4 rounded border border-gray-700"
                >
                  <a
                    href={`/dashboard/thingies/${fav.id}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {fav.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

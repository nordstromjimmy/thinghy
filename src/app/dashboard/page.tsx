import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Star,
  PlusCircle,
  BookText,
  Wrench,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: favorites } = await supabase
    .from("thinghies")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_favorite", true);

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="mb-12 text-center px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-white mb-2">
          The Thinghy App is coming to the Play Store!
        </h3>
        <p className="text-gray-300 mb-4">
          Enter your email and we'll notify you when it's live.
        </p>
        <div className="max-w-sm mx-auto">
          <WaitlistForm />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start px-6 py-12 text-white bg-[#2a2a3c] rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-3">Welcome to Thinghy</h1>
        <p className="text-gray-400 mb-8 max-w-lg text-center text-sm sm:text-base">
          Thinghy is your second brain – a safe place to store and organize
          anything you don't want to forget.
        </p>

        <section className="bg-[#1e1e2f] border border-gray-700 rounded-xl p-6 w-full max-w-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">How to Use Thinghy</h2>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex gap-2 items-start">
              <PlusCircle className="mt-0.5 text-blue-300" size={18} />
              <span>
                <strong>Add a Thinghy</strong> to capture anything: codes,
                processes, ideas, or notes.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Wrench className="mt-0.5 text-blue-300" size={18} />
              <span>
                <strong>Customize fields</strong>: use checkboxes, dates,
                passwords, colors, and more.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <ShieldCheck className="mt-0.5 text-blue-300" size={18} />
              <span>
                <strong>Passwords are secure and encrypted</strong> by default.
                Toggle to show/hide anytime.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <Eye className="mt-0.5 text-blue-300" size={18} />
              <span>
                <strong>View your Thinghies</strong> in clean list and detail
                formats.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <BookText className="mt-0.5 text-blue-300" size={18} />
              <span>
                <strong>Edit freely</strong> – reorder fields, update values, or
                switch categories.
              </span>
            </li>
          </ul>
        </section>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
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

      <div className="flex flex-col items-center justify-start px-6 py-12 text-white">
        <section className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="text-yellow-300" size={20} /> Favorite Thinghies
          </h2>
          {favorites && favorites.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4">
              {favorites.map((fav) => (
                <li
                  key={fav.id}
                  className="bg-[#1e1e2f] p-4 rounded border border-gray-700 hover:bg-[#2a2a3c] transition"
                >
                  <Link
                    href={`/dashboard/thingies/${fav.id}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {fav.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">
              You haven't marked any Thinghies as favorites yet.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

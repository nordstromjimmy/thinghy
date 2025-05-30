"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase-browser";
import { showErrorToast, showToast } from "@/components/ShowToast";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          router.push("/dashboard");
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      showErrorToast(error.message);
      setLoading(false);
    }
    showToast("Your account was created!");
  };

  return (
    <main className="bg-[#1e1e2f] min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-center text-4xl font-bold text-yellow-200 mb-4">
        Thinghy
      </h1>
      <div className="w-full max-w-sm bg-[#2a2a3c] border border-gray-700 rounded-xl shadow-md p-8">
        <p className="text-center text-3xl text-white mb-8">Sign Up</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-300 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded bg-[#1e1e2f] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-200 hover:bg-yellow-300 text-black font-semibold rounded transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-6">
          Already a member?{" "}
          <a href="/login" className="text-yellow-200 hover:underline">
            Log in
          </a>
        </div>
      </div>
    </main>
  );
}

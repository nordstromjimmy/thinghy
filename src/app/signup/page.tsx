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
    <main className="bg-[#1e1e2f] text-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white font-bold mb-12">Thingy.</h1>
      <form
        onSubmit={handleSignUp}
        className="max-w-sm w-full bg-[#2a2a3c] p-6 border rounded-xl"
      >
        <h2 className="text-2xl text-white text-center font-bold mb-4">
          Create Account
        </h2>
        <input
          type="email"
          required
          className="w-full text-white mb-3 px-4 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="w-full text-white mb-3 px-4 py-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-200 hover:bg-yellow-300 text-black mb-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <div className="text-center text-gray-500">
          <p className="">
            Already a member?{" "}
            <a href="/login" className="text-gray-400 underline cursor-pointer">
              Log in
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}

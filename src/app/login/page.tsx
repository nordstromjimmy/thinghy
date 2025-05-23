"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { showErrorToast, showToast } from "@/components/ShowToast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showErrorToast(error.message);
      setLoading(false);
      return;
    }

    // ✅ Poll for session to appear before redirect
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      showToast("You are logged in!");

      router.push("/dashboard");
    } else {
      showErrorToast("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12">Thingy.</h1>
      <form onSubmit={handleLogin} className="max-w-sm w-full px-4">
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <input
          type="email"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center">
          <p>
            Not a member?{" "}
            <a
              href="/signup"
              className="text-blue-500 underline cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { showErrorToast, showToast } from "@/components/ShowToast";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-12">Thingy.</h1>
      <form onSubmit={handleSignUp} className="max-w-sm w-full px-4">
        <h2 className="text-2xl text-center font-bold mb-4">Create Account</h2>
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
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <div className="text-center">
          <p className="">
            Already a member?{" "}
            <a href="/login" className="text-blue-500 underline cursor-pointer">
              Log in
            </a>
          </p>
        </div>
      </form>
    </main>
  );
}

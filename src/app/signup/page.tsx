"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase-browser";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const supabase = createBrowserClient();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setFormError(error.message || "Something went wrong. Try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
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
              className={`w-full text-white px-4 py-2 border rounded ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
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
              className={`w-full text-white px-4 py-2 border rounded ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-400 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {formError && (
            <div className="text-center text-red-400 text-sm mb-4">
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-200 hover:bg-yellow-300 text-black font-semibold rounded transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100 py-2 rounded transition mb-4 cursor-pointer"
          >
            <img src="/google-icon.svg" alt="Google" className="w-7 h-7" />
            Sign in with Google
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

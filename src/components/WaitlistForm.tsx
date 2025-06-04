"use client";
import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="w-full px-4 py-2 text-white border border-gray-300 rounded-md mb-3"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400 cursor-pointer"
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </button>
      {status === "success" && (
        <p className="text-yellow-200 mt-2">
          Thanks! We’ll notify you when Thinghy App is live!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

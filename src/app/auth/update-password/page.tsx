"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { showToast, showErrorToast } from "@/components/ShowToast";

export default function UpdatePasswordPage() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      showErrorToast("Failed to update password.");
    } else {
      showToast("Password updated!");
      router.push("/dashboard/profile");
    }
  };

  return (
    <main className="min-h-screen bg-[#2a2a3c] w-full-5xl py-12 flex flex-col mx-auto text-white px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Thinghy.com</h1>
      <h1 className="text-2xl font-bold mb-4">Set a New Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 bg-[#2a2a3c] border border-gray-700 text-white px-3 py-2 rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer"
      >
        Update Password
      </button>
    </main>
  );
}

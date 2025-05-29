"use client";
import { useRouter } from "next/navigation";
import { showToast } from "./ShowToast";
import { createBrowserClient } from "@/lib/supabase";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    showToast("You logged out!");
  };

  return (
    <button
      onClick={logout}
      className="text-sm text-yellow-200 hover:underline cursor-pointer"
    >
      Logout
    </button>
  );
}

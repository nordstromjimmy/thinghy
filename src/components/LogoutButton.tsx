"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { showToast } from "./ShowToast";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    showToast("You logged out!");
  };

  return (
    <button onClick={logout} className="text-sm text-blue-500 hover:underline">
      Logout
    </button>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase-browser";

export default function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        console.warn("Session expired or user signed out. Cleaning up...");

        // Clean up Supabase session cookie and localStorage
        document.cookie = "sb-access-token=; Max-Age=0; path=/;";
        document.cookie = "sb-refresh-token=; Max-Age=0; path=/;";
        localStorage.removeItem("supabase.auth.token");

        // Redirect to login
        router.push("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return null;
}

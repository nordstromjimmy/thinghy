"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";

export default function AuthListener() {
  useEffect(() => {
    const supabase = createBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      console.log("[Auth Event]:", event);

      if (event === "SIGNED_OUT") {
        // Optional: clear cookies/localStorage to prevent future errors
        document.cookie = "sb-access-token=; Max-Age=0; path=/;";
        document.cookie = "sb-refresh-token=; Max-Age=0; path=/;";
        localStorage.removeItem("supabase.auth.token");
      }

      if (event === "TOKEN_REFRESHED") {
        console.info("Token refreshed successfully.");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createSupabaseServerClient = (token?: string) => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        set() {},
        remove() {},
      },
      // We pass the token via global headers workaround (see below)
      global: {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      },
    }
  );
};

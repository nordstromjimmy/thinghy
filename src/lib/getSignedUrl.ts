import { createSupabaseServerClient } from "./supabase-server";

export async function getSignedUrl(path: string): Promise<string | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.storage
    .from("thinghy-images")
    .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 days

  if (error) {
    console.error("Signed URL error:", error);
    return null;
  }

  return data?.signedUrl || null;
}

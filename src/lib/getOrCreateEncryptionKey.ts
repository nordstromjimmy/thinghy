import { createSupabaseServerClient } from "./supabase-server";
import { randomBytes } from "crypto";

export async function getOrCreateEncryptionKey(
  userId: string
): Promise<string> {
  const supabase = createSupabaseServerClient();

  // 1. Check if key already exists
  const { data, error } = await supabase
    .from("users")
    .select("encryption_key")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error("Failed to fetch user encryption key");
  }

  if (data?.encryption_key) {
    return data.encryption_key;
  }

  // 2. Generate a secure 32-byte key (base64 encoded)
  const newKey = randomBytes(32).toString("base64");

  // 3. Save it to the users table
  const { error: updateError } = await supabase
    .from("users")
    .update({ encryption_key: newKey })
    .eq("id", userId);

  if (updateError) {
    throw new Error("Failed to save encryption key");
  }

  return newKey;
}

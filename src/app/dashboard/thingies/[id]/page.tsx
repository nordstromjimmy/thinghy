import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getOrCreateEncryptionKey } from "@/lib/getOrCreateEncryptionKey";
import ThinghyClient from "@/components/ThinghyClient";
import { notFound } from "next/navigation";

export default async function ThinghyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: thinghy } = await supabase
    .from("thinghies")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!thinghy) return notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  // 🔐 Get encryption key
  const encryptionKey = await getOrCreateEncryptionKey(user.id);

  return (
    <ThinghyClient
      thinghy={thinghy}
      categories={categories || []}
      encryptionKey={encryptionKey}
    />
  );
}

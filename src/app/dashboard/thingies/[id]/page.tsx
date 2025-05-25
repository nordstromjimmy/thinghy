import ThinghyClient from "@/components/ThinghyClient";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ThinghyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("thinghies")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (!data || error) {
    return <p className="p-6">Not found</p>;
  }

  return <ThinghyClient thinghy={data} />;
}

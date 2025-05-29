import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `${user.id}/${randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("thinghy-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data: signedUrlData } = await supabase.storage
    .from("thinghy-images")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365); // ✅ 1 year

  return NextResponse.json({
    url: signedUrlData?.signedUrl,
    path: filePath,
  });
}

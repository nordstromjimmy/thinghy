"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";

type Props = {
  src: string; // This is the raw path like "user-id/filename.png"
  alt?: string;
  className?: string;
};

export default function ImageRenderer({ src, alt = "", className }: Props) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  const supabase = createBrowserClient();

  useEffect(() => {
    const loadSignedUrl = async () => {
      if (!src) return;

      const { data, error } = await supabase.storage
        .from("thinghy-images")
        .createSignedUrl(src, 60 * 60 * 24); // 24 hours

      if (!error && data?.signedUrl) {
        setSignedUrl(data.signedUrl);
      }
    };

    loadSignedUrl();
  }, [src]);

  if (!signedUrl)
    return <div className="text-gray-500 text-sm">Loading image…</div>;

  return (
    <img
      src={signedUrl}
      alt={alt}
      className={
        className || "w-full max-w-xs h-auto rounded border border-gray-600"
      }
    />
  );
}

"use client";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { decrypt } from "@/utils/encryption";

export default function PasswordReveal({
  value,
  encryptionKey,
}: {
  value: string;
  encryptionKey: string;
}) {
  const [visible, setVisible] = useState(false);

  const decrypted = useMemo(() => {
    try {
      return decrypt(value, encryptionKey); // ✅ correct usage
    } catch {
      return "[Error decrypting]";
    }
  }, [value, encryptionKey]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-white">
        {visible ? decrypted : "•".repeat(decrypted.length || 8)}
      </span>
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs bg-gray-700 px-2 py-0.5 rounded hover:bg-gray-600"
        title={visible ? "Hide" : "Show"}
      >
        {visible ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

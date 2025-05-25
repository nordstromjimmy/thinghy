"use client";
import { useState } from "react";

export default function PasswordReveal({ value }: { value: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-white">
        {visible ? value : "•".repeat(value.length || 8)}
      </span>
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs bg-gray-700 px-2 py-0.5 rounded hover:bg-gray-600"
        title={visible ? "Hide" : "Show"}
      >
        {visible ? "🙈" : "👁️"}
      </button>
    </div>
  );
}

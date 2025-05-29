import { ImageIcon } from "lucide-react";
import Link from "next/link";

export function ThinghyCard({ thinghy }: { thinghy: any }) {
  return (
    <Link
      href={`/dashboard/thingies/${thinghy.id}`}
      className="block bg-[#2a2a3c] border border-gray-700 rounded p-4 shadow hover:bg-[#34344a] transition"
    >
      <h2 className="text-lg font-semibold text-white">{thinghy.title}</h2>
      <div className="mt-2 text-sm text-gray-300 space-y-1">
        {thinghy.fields?.slice(0, 2).map((field: any, index: number) => (
          <p key={index} className="flex items-center gap-2">
            <strong>{field.label}:</strong>
            {field.type === "password" ? (
              <span className="text-white">••••••</span>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={field.value === "true"}
                readOnly
                className="w-4 h-4 accent-white"
              />
            ) : field.type === "color" ? (
              <span
                className="inline-block w-4 h-4 rounded border border-gray-500"
                style={{ backgroundColor: field.value }}
              />
            ) : field.type === "image" && field.value ? (
              <ImageIcon className="w-4 h-4" />
            ) : (
              <span>{field.value}</span>
            )}
          </p>
        ))}
      </div>
    </Link>
  );
}

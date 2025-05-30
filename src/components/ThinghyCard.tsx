"use client";
import { useRouter } from "next/navigation";
import { ImageIcon, MapPin } from "lucide-react";

export function ThinghyCard({ thinghy }: { thinghy: any }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/thingies/${thinghy.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-[#2a2a3c] border border-gray-700 rounded p-4 shadow hover:bg-[#34344a] transition"
    >
      <h2 className="text-lg font-semibold text-white">{thinghy.title}</h2>
      <div className="mt-2 text-sm text-gray-300 space-y-1">
        {thinghy.fields?.slice(0, 2).map((field: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
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
            ) : field.type === "datetime" || field.type === "date" ? (
              <span className="text-white">
                {field.value.includes("T")
                  ? field.value.replace("T", " ")
                  : field.value}
              </span>
            ) : field.type === "location" ? (
              field.value.includes("google.com/maps") ? (
                <a
                  href={field.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-300 hover:underline flex items-center gap-1"
                >
                  <MapPin size={16} />
                  <span>Google Maps location</span>
                </a>
              ) : (
                <span className="truncate">{field.value}</span>
              )
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
          </div>
        ))}
      </div>
    </div>
  );
}

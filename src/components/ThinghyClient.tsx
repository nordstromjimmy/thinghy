"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ThinghyForm from "./ThinghyForm";
import PasswordReveal from "./PasswordReveal";

interface Field {
  id: string;
  type: string;
  label: string;
  value: string;
}

type ThinghyClientProps = {
  thinghy: {
    id: string;
    title: string;
    fields: Field[];
    is_favorite?: boolean;
  };
};

export default function ThinghyClient({ thinghy }: ThinghyClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(thinghy);
  const [saving, setSaving] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this Thinghy?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`/api/thinghy/${thinghy.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete");
    } else {
      toast.success("Thinghy deleted");
      router.push("/dashboard/thingies");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{data.title}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded transition text-sm cursor-pointer"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded transition text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
        <button
          onClick={async () => {
            const newStatus = !data.is_favorite;
            const res = await fetch(`/api/thinghy/${data.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isFavorite: newStatus }),
            });

            if (res.ok) {
              setData({ ...data, is_favorite: newStatus });
              toast.success(
                newStatus ? "Marked as favorite" : "Removed from favorites"
              );
            }
          }}
          className={`px-4 py-1.5 rounded text-sm cursor-pointer ${
            data.is_favorite
              ? "bg-yellow-400 text-black"
              : "bg-gray-600 text-white"
          } hover:opacity-80 transition`}
        >
          {data.is_favorite ? "★ Favorite" : "☆ Mark Favorite"}
        </button>
      </div>

      {isEditing ? (
        <ThinghyForm
          initialTitle={data.title}
          initialFields={data.fields}
          onSave={async (title, fields) => {
            setSaving(true);
            const res = await fetch(`/api/thinghy/${data.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title, fields }),
            });

            if (!res.ok) {
              toast.error("Failed to save changes");
            } else {
              toast.success("Thinghy updated!");
              setData({ ...data, title, fields });
              setIsEditing(false);
            }
            setSaving(false);
          }}
          isSaving={saving}
          submitLabel="Save Changes"
        />
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {data.fields.map((field) => (
              <li
                key={field.id}
                className="bg-[#2a2a3c] p-4 border border-gray-700 rounded shadow-sm"
              >
                <p className="text-sm text-gray-400 mb-1">{field.label}</p>
                {field.type === "password" ? (
                  <PasswordReveal value={field.value} />
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={field.value === "true"}
                    readOnly
                    className="w-4 h-4 accent-white"
                  />
                ) : field.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-5 h-5 rounded border border-gray-500"
                      style={{ backgroundColor: field.value }}
                    />
                    <span className="text-xs text-gray-400">{field.value}</span>
                  </div>
                ) : (
                  <p className="text-base text-white">{field.value}</p>
                )}
              </li>
            ))}
          </ul>
          <a
            href="/dashboard/thingies"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to Thinghies
          </a>
        </>
      )}
    </main>
  );
}

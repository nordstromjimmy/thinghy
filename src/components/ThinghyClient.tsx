"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ThinghyForm from "./ThinghyForm";
import PasswordReveal from "./PasswordReveal";
import ConfirmModal from "./ConfirmModal";
import { showErrorToast, showToast } from "./ShowToast";

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
    category: string | null;
    is_favorite?: boolean;
  };
  categories: { name: string }[];
};

export default function ThinghyClient({
  thinghy,
  categories,
}: ThinghyClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(thinghy);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setSaving(true);

    const res = await fetch(`/api/thinghy/${thinghy.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      showErrorToast("Failed to delete!");
    } else {
      showToast("Thinghy deleted!");
      router.push("/dashboard/thingies");
    }
    setSaving(false);
    setShowConfirm(false);
  };

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">{data.title}</h1>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded transition text-sm cursor-pointer"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded transition text-sm cursor-pointer"
          >
            Delete
          </button>

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
                showToast(
                  newStatus ? "Marked as favorite!" : "Removed from favorites!"
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

        <ConfirmModal
          isOpen={showConfirm}
          title={`Delete Thinghy "${data.title}"?`}
          description="Are you sure you want to delete this Thinghy?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      </div>

      {isEditing && (
        <select
          value={data.category || ""}
          onChange={(e) =>
            setData({ ...data, category: e.target.value || null })
          }
          className="w-full mt-2 bg-[#2a2a3c] text-white border border-gray-700 rounded px-3 py-2"
        >
          <option value="">No Category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
      {isEditing ? (
        <ThinghyForm
          initialTitle={data.title}
          initialFields={data.fields}
          onSave={async (title, fields) => {
            setSaving(true);
            const res = await fetch(`/api/thinghy/${data.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title,
                fields,
                category: data.category || null,
              }),
            });

            if (!res.ok) {
              showErrorToast("Failed to save changes!");
            } else {
              showToast("Thinghy updated!");
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

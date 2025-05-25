"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AVAILABLE_FIELDS } from "@/types/fields";

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
  };
};

export default function ThinghyClient({ thinghy }: ThinghyClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(thinghy);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/thinghy/${thinghy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to save changes");
    } else {
      toast.success("Thinghy updated!");
      setIsEditing(false);
    }

    setSaving(false);
  };

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

  const handleFieldChange = (fieldId: string, value: string) => {
    setData((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === fieldId ? { ...f, value } : f)),
    }));
  };

  const handleRemoveField = (fieldId: string) => {
    setData((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== fieldId),
    }));
  };

  const handleAddField = (fieldType: string) => {
    const definition = AVAILABLE_FIELDS.find((f) => f.id === fieldType);
    if (!definition) return;

    setData((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          id: uuidv4(),
          type: definition.id,
          label: definition.label,
          value: "",
        },
      ],
    }));
  };

  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        {isEditing ? (
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="text-2xl font-bold border px-2 py-1 rounded w-full mr-4 bg-[#2a2a3c] text-white border-gray-700 focus:outline-none"
          />
        ) : (
          <h1 className="text-2xl font-bold text-white">{data.title}</h1>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded transition text-sm"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded transition text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <ul className="space-y-4 mb-6">
        {data.fields.map((field) => (
          <li
            key={field.id}
            className="bg-[#2a2a3c] p-4 border border-gray-700 rounded shadow-sm"
          >
            <p className="text-sm text-gray-400 mb-1">{field.label}</p>
            {isEditing ? (
              <div className="relative">
                <input
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-full text-sm bg-[#1e1e2f] border border-gray-700 px-3 py-2 rounded placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={() => handleRemoveField(field.id)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-xs bg-gray-600 text-white w-5 h-5 rounded-full hover:bg-gray-500"
                  title="Remove field"
                >
                  ×
                </button>
              </div>
            ) : (
              <p className="text-base text-white">{field.value}</p>
            )}
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="mb-6 flex flex-wrap gap-2">
          {AVAILABLE_FIELDS.map((field) => (
            <button
              key={field.id + Math.random()}
              onClick={() => handleAddField(field.id)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded transition"
            >
              + {field.label}
            </button>
          ))}
        </div>
      )}

      {isEditing && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <Loader2 className="animate-spin w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}

      {!isEditing && (
        <a
          href="/dashboard/thingies"
          className="text-sm text-gray-400 hover:underline"
        >
          ← Back to Thinghies
        </a>
      )}
    </main>
  );
}

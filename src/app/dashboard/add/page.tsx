"use client";
import { useState } from "react";
import { showErrorToast, showToast } from "@/components/ShowToast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AVAILABLE_FIELDS } from "@/types/fields";
import { v4 as uuidv4 } from "uuid";

type NewField = {
  id: string;
  type: string;
};

export default function AddThinghyPage() {
  const [fields, setFields] = useState<{ [key: string]: string }>({});
  const [activeFields, setActiveFields] = useState<NewField[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSaveThinghy = async () => {
    if (!fields.title?.trim()) return;
    setIsSaving(true);

    const { title, ...restFields } = fields;

    const fieldEntries = activeFields.map((f) => ({
      id: f.id,
      type: f.type,
      label: AVAILABLE_FIELDS.find((def) => def.id === f.type)?.label || f.type,
      value: fields[f.id] || "",
    }));

    try {
      const response = await fetch("/api/thinghy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          fields: fieldEntries,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showErrorToast(result.error || "Something went wrong");
      } else {
        showToast("Thinghy saved!");
        setFields({});
        setActiveFields([]);
      }
    } catch (err) {
      showToast("Unexpected error");
    } finally {
      setIsSaving(false);
      router.push("/dashboard/thingies");
    }
  };

  const updateField = (id: string, value: string) => {
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const addField = (type: string) => {
    setActiveFields((prev) => [...prev, { id: uuidv4(), type }]);
  };

  const removeField = (id: string) => {
    setActiveFields((prev) => prev.filter((f) => f.id !== id));
  };

  const availableOptions = AVAILABLE_FIELDS;

  return (
    <div className="flex flex-col items-center justify-start pt-16 px-4 bg-[#1e1e2f] text-white">
      {/* Title */}
      <input
        type="text"
        placeholder="Thinghy Title"
        value={fields.title || ""}
        onChange={(e) => updateField("title", e.target.value)}
        className="text-2xl font-bold text-center bg-[#2a2a3c] border border-gray-700 px-4 py-2 rounded shadow-sm w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-white"
      />

      {/* Add Field Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {availableOptions.map((field) => (
          <button
            key={field.id}
            onClick={() => addField(field.id)}
            className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
          >
            + {field.label}
          </button>
        ))}
      </div>

      {/* Active Fields */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {activeFields.map((field) => {
          const label =
            AVAILABLE_FIELDS.find((f) => f.id === field.type)?.label ||
            field.type;

          return (
            <div key={field.id} className="relative group">
              <input
                type="text"
                placeholder={label}
                value={fields[field.id] || ""}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                onClick={() => removeField(field.id)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-xs bg-gray-600 text-white w-5 h-5 rounded-full group-hover:opacity-100 opacity-0 transition"
                title={`Remove ${label}`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="w-full max-w-md mt-8 text-center">
        <button
          disabled={!fields.title?.trim() || isSaving}
          onClick={handleSaveThinghy}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center mx-auto gap-2"
        >
          {isSaving && <Loader2 className="animate-spin w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Thinghy"}
        </button>
      </div>
    </div>
  );
}

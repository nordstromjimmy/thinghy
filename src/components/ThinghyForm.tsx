"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AVAILABLE_FIELDS } from "@/types/fields";

type Field = {
  id: string;
  type: string;
  label: string;
  value: string;
  showPassword?: boolean;
};

type ThinghyFormProps = {
  initialTitle?: string;
  initialFields?: Field[];
  onSave: (
    title: string,
    fields: Field[],
    category: string | null
  ) => Promise<void>;
  isSaving?: boolean;
  submitLabel?: string;
  categories?: { name: string }[];
  defaultCategory?: string;
};

export default function ThinghyForm({
  initialTitle = "",
  initialFields = [],
  onSave,
  isSaving = false,
  submitLabel = "Save Thinghy",
  categories = [],
  defaultCategory = "",
}: ThinghyFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState<string>(defaultCategory || "");
  const [fields, setFields] = useState<Field[]>(initialFields);

  const handleAddField = (type: string) => {
    const def = AVAILABLE_FIELDS.find((f) => f.id === type);
    if (!def) return;

    setFields((prev) => [
      ...prev,
      { id: uuidv4(), type: def.id, label: def.label, value: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await onSave(title.trim(), fields, category || null);
  };

  const updateField = (id: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  return (
    <div className="flex flex-col items-center justify-start pt-8 px-4 bg-[#1e1e2f] text-white">
      {/* Title */}
      <input
        type="text"
        placeholder="Thinghy Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold text-center bg-[#2a2a3c] border border-gray-700 px-4 py-2 rounded shadow-sm w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-white"
      />
      {categories && categories.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#2a2a3c] border border-gray-700 text-white rounded px-3 py-2"
          >
            <option value="">No Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Add Field Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {AVAILABLE_FIELDS.map((field) => (
          <button
            key={field.id + Math.random()}
            onClick={() => handleAddField(field.id)}
            className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
          >
            + {field.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative group space-y-2">
            {/* Label Input */}
            <input
              type="text"
              placeholder="Label"
              value={field.label}
              onChange={(e) =>
                setFields((prev) =>
                  prev.map((f) =>
                    f.id === field.id ? { ...f, label: e.target.value } : f
                  )
                )
              }
              className="w-full text-xs bg-[#1e1e2f] border border-gray-700 px-3 py-1.5 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-white"
            />

            {/* Value Input */}
            {field.type === "checkbox" ? (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.value === "true"}
                  onChange={(e) =>
                    updateField(field.id, e.target.checked ? "true" : "false")
                  }
                  className="accent-white w-4 h-4"
                />
                {field.label}
              </label>
            ) : field.type === "password" ? (
              <div className="relative">
                <input
                  type={field.showPassword ? "text" : "password"}
                  value={field.value}
                  onChange={(e) =>
                    setFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id ? { ...f, value: e.target.value } : f
                      )
                    )
                  }
                  className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 pr-10 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? { ...f, showPassword: !f.showPassword }
                          : f
                      )
                    )
                  }
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                  title="Toggle password visibility"
                >
                  {field.showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            ) : (
              <input
                type={
                  field.type === "number"
                    ? "number"
                    : field.type === "date"
                    ? "date"
                    : field.type === "color"
                    ? "color"
                    : "text"
                }
                value={field.value}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
            )}
            {/* Control Buttons */}
            <div className="flex justify-between mt-1">
              <div className="flex gap-1">
                <button
                  disabled={index === 0}
                  onClick={() =>
                    setFields((prev) => {
                      const newFields = [...prev];
                      const temp = newFields[index - 1];
                      newFields[index - 1] = newFields[index];
                      newFields[index] = temp;
                      return newFields;
                    })
                  }
                  className="text-xs bg-gray-700 px-2 py-1 rounded disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  disabled={index === fields.length - 1}
                  onClick={() =>
                    setFields((prev) => {
                      const newFields = [...prev];
                      const temp = newFields[index + 1];
                      newFields[index + 1] = newFields[index];
                      newFields[index] = temp;
                      return newFields;
                    })
                  }
                  className="text-xs bg-gray-700 px-2 py-1 rounded disabled:opacity-40"
                >
                  ↓
                </button>
              </div>

              <button
                onClick={() =>
                  setFields((prev) => prev.filter((f) => f.id !== field.id))
                }
                className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-500"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="w-full max-w-md mt-8 text-center">
        <button
          disabled={!title.trim() || isSaving}
          onClick={handleSubmit}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center mx-auto gap-2"
        >
          {isSaving && <Loader2 className="animate-spin w-4 h-4" />}
          {isSaving ? "Saving..." : submitLabel}
        </button>
      </div>
    </div>
  );
}

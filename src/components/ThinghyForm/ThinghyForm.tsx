"use client";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AVAILABLE_FIELDS } from "@/types/fields";
import ThinghyField from "./ThinghyField";
import { decrypt, encrypt } from "@/utils/encryption";
import type { Field } from "@/types/Field";

type Props = {
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
  encryptionKey: string;
};

export default function ThinghyForm({
  initialTitle = "",
  initialFields = [],
  onSave,
  isSaving = false,
  submitLabel = "Save Thinghy",
  categories = [],
  defaultCategory = "",
  encryptionKey,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(defaultCategory);
  const [fields, setFields] = useState<Field[]>([]);
  const [hasDecrypted, setHasDecrypted] = useState(false);
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (!hasDecrypted && initialFields && initialFields.length > 0) {
      const decrypted = initialFields.map((field) => {
        if (field.type === "password" && field.value) {
          try {
            const decryptedValue = decrypt(field.value, encryptionKey);
            return { ...field, value: decryptedValue };
          } catch (err) {
            console.warn("Failed to decrypt:", err);
            return { ...field, value: "" };
          }
        }
        return field;
      });

      setFields(decrypted);
      setHasDecrypted(true);
    }
  }, [initialFields, hasDecrypted]);

  const handleSubmit = async () => {
    setTitleError("");
    if (!title.trim()) {
      setTitleError("Add a Title to save");
      return;
    }

    const preparedFields = await Promise.all(
      fields.map(async (field) => {
        if (field.type === "password") {
          return {
            ...field,
            value: encrypt(field.value, encryptionKey),
          };
        }

        if (field.type === "image" && field.file) {
          const formData = new FormData();
          formData.append("file", field.file);

          const res = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });

          const result = await res.json();
          if (!res.ok) {
            throw new Error("Image upload failed");
          }

          return {
            ...field,
            value: result.path,
            file: undefined,
          };
        }
        return field;
      })
    );

    await onSave(title.trim(), preparedFields, category || null);
  };

  const handleAddField = (type: string) => {
    const def = AVAILABLE_FIELDS.find((f) => f.id === type);
    if (!def) return;
    setFields((prev) => [
      ...prev,
      { id: uuidv4(), type: def.id, label: def.label, value: "" },
    ]);
  };

  const handleFieldChange = (
    id: string,
    value: string,
    label?: string,
    file?: File
  ) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              value,
              label: label !== undefined ? label : f.label,
              file: file !== undefined ? file : f.file,
            }
          : f
      )
    );
  };

  const handleFieldRemove = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleFieldMove = (index: number, direction: number) => {
    setFields((prev) => {
      const next = [...prev];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= next.length) return prev;

      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  return (
    <div className="py-6 max-w-full mx-auto sm:max-w-5xl flex flex-col items-center bg-[#1e1e2f] text-white">
      <div className="w-full max-w-md mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Thinghy Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`flex-1 text-2xl font-bold bg-[#2a2a3c] border border-gray-700 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-white ${
            titleError ? "border-red-500" : ""
          }`}
        />

        {categories.length > 0 && (
          <div className="flex flex-col w-full sm:w-44">
            <label className="text-xs text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#2a2a3c] border border-gray-700 text-white rounded px-2 py-1"
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
      </div>
      {titleError && <p className="text-red-400 text-sm mb-4">{titleError}</p>}
      {/* Add Field Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {AVAILABLE_FIELDS.map((field) => (
          <button
            key={field.id}
            onClick={() => handleAddField(field.id)}
            className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
          >
            + {field.label}
          </button>
        ))}
      </div>

      {/* Field List */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {fields.map((field, index) => (
          <ThinghyField
            key={field.id}
            field={field}
            index={index}
            total={fields.length}
            onChange={handleFieldChange}
            onRemove={handleFieldRemove}
            onMove={handleFieldMove}
          />
        ))}
      </div>

      {/* Save Button */}
      <div className="w-full max-w-md mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition disabled:opacity-40 flex items-center mx-auto gap-2 cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

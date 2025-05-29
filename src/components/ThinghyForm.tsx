"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { AVAILABLE_FIELDS } from "@/types/fields";
import ImageRenderer from "./ImageRenderer";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Upload } from "lucide-react";
import { showErrorToast } from "./ShowToast";

type Field = {
  id: string;
  type: string;
  label: string;
  value: string;
  showPassword?: boolean;
  file?: File;
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

function getInputAttributes(fieldType: string): {
  type: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
} {
  switch (fieldType) {
    case "email":
      return { type: "email", inputMode: "email" };
    case "phone":
      return { type: "tel", inputMode: "tel" };
    case "number":
    case "currency":
    case "rating":
    case "duration":
      return { type: "number", inputMode: "decimal" };
    case "url":
      return { type: "url", inputMode: "url" };
    case "date":
      return { type: "date" };
    case "datetime":
      return { type: "datetime-local" };
    case "color":
      return { type: "color" };
    case "password":
      return { type: "password" }; // still handled separately
    default:
      return { type: "text", inputMode: "text" };
  }
}

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
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleAddField = (type: string) => {
    const def = AVAILABLE_FIELDS.find((f) => f.id === type);
    if (!def) return;

    setFields((prev) => [
      ...prev,
      { id: uuidv4(), type: def.id, label: def.label, value: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      showErrorToast("Add a Title to save");
      return;
    }
    const preparedFields = await Promise.all(
      fields.map(async (f) => {
        if (f.type === "image" && f.file) {
          const formData = new FormData();
          formData.append("file", f.file);

          const res = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });

          const result = await res.json();
          if (!res.ok) {
            throw new Error("Image upload failed");
          }

          return {
            ...f,
            value: result.path,
            file: undefined,
          };
        }

        return f;
      })
    );

    await onSave(title.trim(), preparedFields, category || null);
  };

  const updateField = (id: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  return (
    <div className="py-6 max-w-full mx-auto sm:max-w-5xl flex flex-col items-center justify-start bg-[#1e1e2f] text-white">
      {/* Title */}
      <input
        type="text"
        placeholder="Thinghy Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold text-center bg-[#2a2a3c] border border-gray-700 px-4 py-2 rounded shadow-sm w-full max-w-md mb-8 focus:outline-none focus:ring-2 focus:ring-white"
      />
      {categories && categories.length > 0 && (
        <div className="mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-44 bg-[#2a2a3c] border border-gray-700 text-white rounded px-2 py-1"
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
            {field.type === "image" ? (
              <div className="flex flex-col gap-2">
                {field.file ? (
                  <>
                    <img
                      src={URL.createObjectURL(field.file)}
                      alt={field.label || "Selected image"}
                      className="w-full rounded border border-gray-600"
                    />
                    <button
                      className="w-48  mx-auto rounded border border-gray-600"
                      onClick={() =>
                        setFields((prev) =>
                          prev.map((f) =>
                            f.id === field.id
                              ? { ...f, file: undefined, value: "" }
                              : f
                          )
                        )
                      }
                    >
                      Remove image
                    </button>
                  </>
                ) : field.value ? (
                  <ImageRenderer
                    src={field.value}
                    alt={field.label || "Uploaded image"}
                  />
                ) : null}
                <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition w-full text-center">
                  <span>
                    <Upload width={20} />
                  </span>
                  <input
                    key={field.id}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      setUploadingImage(true);
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // ✅ Validate file size (e.g., 5MB limit)
                      if (file.size > 5 * 1024 * 1024) {
                        showErrorToast("Image too large. Max size is 5MB.");
                        return;
                      }

                      // ✅ Validate file type
                      const allowedTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                      ];
                      if (!allowedTypes.includes(file.type)) {
                        showErrorToast(
                          "Unsupported image format. Use JPG, PNG or WEBP."
                        );
                        return;
                      }

                      setFields((prev) =>
                        prev.map((f) =>
                          f.id === field.id
                            ? { ...f, file, value: file.name }
                            : f
                        )
                      );
                      setUploadingImage(false);
                    }}
                    className="hidden"
                  />
                </label>

                {/* Info Text */}
                <p className="text-xs text-gray-400">
                  Max file size 5MB. Supported: JPG, PNG, WEBP.
                </p>
              </div>
            ) : field.type === "checkbox" ? (
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
                  {field.showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            ) : field.type === "notes" ? (
              <textarea
                value={field.value}
                onChange={(e) => updateField(field.id, e.target.value)}
                className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white min-h-[100px]"
                placeholder={field.label || ""}
              />
            ) : (
              (() => {
                const { type, inputMode } = getInputAttributes(field.type);
                return (
                  <input
                    type={type}
                    inputMode={inputMode}
                    value={field.value}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                );
              })()
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
          disabled={isSaving}
          onClick={handleSubmit}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center mx-auto gap-2 cursor-pointer"
        >
          {isSaving && <Loader2 className="animate-spin w-4 h-4" />}
          {isSaving ? "Saving..." : submitLabel}
        </button>
      </div>
    </div>
  );
}

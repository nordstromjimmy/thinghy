"use client";
import { ChangeEvent } from "react";
import { Field } from "@/types/Field";
import FieldControls from "./FieldControls";
import { getInputAttributes } from "@/utils/getInputAttributes";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase-browser";

type Props = {
  field: Field;
  index: number;
  total: number;
  onChange: (id: string, value: string, label?: string, file?: File) => void;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: number) => void;
};

export default function ThinghyField({
  field,
  index,
  total,
  onChange,
  onRemove,
  onMove,
}: Props) {
  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.id, field.value, e.target.value);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;

    if (field.type === "tags") {
      if (value.endsWith(" ")) {
        const tags =
          value
            .trim()
            .split(" ")
            .filter(Boolean)
            .map((tag) => {
              const cleaned = tag.replace(/^#+/, "");
              return `#${cleaned}`;
            })
            .join(" ") + " ";
        value = tags;
      }
    }

    onChange(field.id, value);
  };

  const supabase = createBrowserClient();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadSignedUrl = async () => {
      if (field.type === "image" && field.value && !field.file) {
        const { data, error } = await supabase.storage
          .from("thinghy-images")
          .createSignedUrl(field.value, 60 * 60 * 24);

        if (data?.signedUrl && !error) {
          setSignedUrl(data.signedUrl);
        }
      }
    };

    loadSignedUrl();
  }, [field]);

  const renderInput = () => {
    if (field.type === "notes") {
      return (
        <textarea
          value={field.value}
          onChange={handleValueChange}
          className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white min-h-[100px]"
          placeholder={field.label || ""}
        />
      );
    }

    if (field.type === "number") {
      return (
        <input
          type="number"
          value={field.value}
          onChange={handleValueChange}
          className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
      );
    }

    if (field.type === "password") {
      return (
        <input
          type="text"
          value={field.value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Enter password"
        />
      );
    }

    if (field.type === "checkbox") {
      return (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={field.value === "true"}
            onChange={(e) =>
              onChange(field.id, e.target.checked ? "true" : "false")
            }
            className="accent-white w-4 h-4"
          />
          {field.label}
        </label>
      );
    }

    if (field.type === "image") {
      const localPreview = field.file ? URL.createObjectURL(field.file) : null;
      const imageSrc = localPreview || signedUrl;

      return (
        <div className="flex flex-col gap-2">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={field.label || "Image preview"}
              className="w-full max-w-xs rounded border border-gray-600"
            />
          )}

          <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded transition w-full text-center">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                onChange(field.id, field.value, field.label, file);
              }}
            />
          </label>
        </div>
      );
    }

    if (field.type === "color") {
      return (
        <input
          type="color"
          value={field.value}
          onChange={handleValueChange}
          className="w-full h-10 p-1 rounded"
        />
      );
    }

    if (field.type === "tags") {
      return (
        <input
          placeholder="#groceries #todo #work"
          value={field.value}
          onChange={handleValueChange}
          className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
      );
    }

    const { type, inputMode } = getInputAttributes(field.type);

    return (
      <input
        type={type}
        inputMode={inputMode}
        value={field.value}
        onChange={handleValueChange}
        className="w-full text-sm bg-[#2a2a3c] border border-gray-700 px-3 py-2 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white"
      />
    );
  };

  return (
    <div className="relative group space-y-2">
      {/* Label Input */}
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={handleLabelChange}
        className="w-full text-xs bg-[#1e1e2f] border border-gray-700 px-3 py-1.5 rounded placeholder-gray-400 text-white focus:outline-none focus:ring-1 focus:ring-white"
      />

      {/* Value Input */}
      {renderInput()}

      <FieldControls
        index={index}
        total={total}
        fieldId={field.id}
        onRemove={onRemove}
        onMove={onMove}
      />
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast, showErrorToast } from "@/components/ShowToast";
import ThinghyForm from "./ThinghyForm";

type ThinghyFormWrapperProps = {
  categories: { name: string }[];
  defaultCategory: string;
};

export default function ThinghyFormWrapper({
  categories,
  defaultCategory,
}: ThinghyFormWrapperProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (
    title: string,
    fields: any[],
    category: string | null
  ) => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/thinghy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, fields, category }),
      });

      const result = await response.json();

      if (!response.ok) {
        showErrorToast(result.error || "Something went wrong");
      } else {
        showToast("Thinghy saved!");
        router.push("/dashboard/thingies");
      }
    } catch {
      showErrorToast("Unexpected error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThinghyForm
      onSave={handleSave}
      isSaving={isSaving}
      categories={categories}
      defaultCategory={defaultCategory}
    />
  );
}

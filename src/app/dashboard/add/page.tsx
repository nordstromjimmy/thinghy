"use client";
import { useState } from "react";
import { showErrorToast, showToast } from "@/components/ShowToast";
import { useRouter } from "next/navigation";
import ThinghyForm from "@/components/ThinghyForm";

export default function AddThinghyPage() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async (title: string, fields: any[]) => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/thinghy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, fields }),
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

  return <ThinghyForm onSave={handleSave} isSaving={isSaving} />;
}

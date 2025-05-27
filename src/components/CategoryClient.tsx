"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { showErrorToast, showToast } from "./ShowToast";

export default function CategoryClient({ category }: { category: string }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsSaving(true);

    const res = await fetch(`/api/category/${encodeURIComponent(category)}`, {
      method: "DELETE",
    });

    if (res.ok) {
      showToast("Category deleted!");
      router.push("/dashboard/thingies");
    } else {
      showErrorToast("Failed to delete category!");
    }

    setIsSaving(false);
    setShowConfirm(false);
  };

  const handleRename = async () => {
    if (!newName.trim() || newName === category) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    const res = await fetch(`/api/category/${encodeURIComponent(category)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName }),
    });

    if (res.ok) {
      showToast("Category renamed!");
      router.replace(`/dashboard/${encodeURIComponent(newName)}`);
    } else {
      showErrorToast("Rename failed!");
    }

    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2 items-center">
      {isEditing ? (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-[#2a2a3c] border border-gray-600 px-2 py-1 rounded text-white"
          />
          <button
            onClick={handleRename}
            disabled={isSaving}
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 text-sm cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-gray-400"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded text-sm cursor-pointer"
          >
            Delete
          </button>
        </>
      )}
      <ConfirmModal
        isOpen={showConfirm}
        title={`Delete category "${category}"?`}
        description="Thinghies in this category will NOT be deleted - they'll be uncategorized."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

"use client";
import { useState } from "react";
import { Folder } from "lucide-react";
import CategoryList from "./CategoryList";
import CategoryCreateForm from "./CategoryCreateForm";

type Props = {
  categories: { id: string; name: string }[];
};

export default function CategoryToggleSection({ categories }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-white hover:text-gray-300 mb-2 cursor-pointer"
        title={visible ? "Hide Categories" : "Show Categories"}
      >
        <Folder size={16} />
        <h2 className="text-sm font-medium">Categories</h2>
      </button>

      {visible && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex-1">
            <CategoryList categories={categories} />
          </div>
          <CategoryCreateForm />
        </div>
      )}
    </div>
  );
}

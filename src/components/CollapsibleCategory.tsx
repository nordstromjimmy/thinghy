"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ThinghyCard } from "./ThinghyCard";

type Props = {
  category: string;
  items: any[];
};

export default function CollapsibleCategory({ category, items }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const storageKey = `thinghy-collapse-${category}`;

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") setCollapsed(true);
  }, [storageKey]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(storageKey, collapsed.toString());
  }, [collapsed, storageKey]);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex items-center gap-2 hover:text-gray-300"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          <h2 className="text-xl font-semibold">{category}</h2>
        </button>
        <Link
          href={`/dashboard/add?category=${encodeURIComponent(category)}`}
          className="text-sm hover:underline"
        >
          + Add a Thinghy to {category}
        </Link>
      </div>

      {!collapsed && (
        <ul className="space-y-4">
          {items.map((thinghy) => (
            <li key={thinghy.id}>
              <ThinghyCard thinghy={thinghy} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

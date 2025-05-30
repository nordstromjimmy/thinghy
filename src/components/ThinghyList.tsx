"use client";
import { useMemo, useState } from "react";
import { ThinghyCard } from "./ThinghyCard";
import { SlidersHorizontal } from "lucide-react";

export default function ThinghyList({
  thinghies,
  emptyMessage,
  encryptionKey,
}: {
  thinghies: any[];
  emptyMessage?: string;
  encryptionKey: string;
}) {
  const [sortBy, setSortBy] = useState<"date" | "alpha">("date");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortDirections, setSortDirections] = useState({
    date: false, // false = newest first
    alpha: true, // true = A → Z
  });

  const sortAsc = sortDirections[sortBy];

  const sortedThinghies = useMemo(() => {
    const sorted = [...thinghies];
    if (sortBy === "alpha") {
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return sortAsc ? sorted : sorted.reverse();
  }, [thinghies, sortBy, sortAsc]);

  const toggleSort = (type: "date" | "alpha") => {
    if (sortBy === type) {
      // Toggle sort direction
      setSortDirections((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    } else {
      setSortBy(type);
    }
  };

  return (
    <div className="mb-10">
      {/* Sort Toggle Button */}
      <div className="relative flex justify-start mb-4">
        <button
          onClick={() => setShowSortOptions((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-white hover:text-gray-300 cursor-pointer"
        >
          <SlidersHorizontal size={16} />
          <span>Sort</span>
        </button>
      </div>

      {/* Sort Options */}
      {showSortOptions && (
        <div className="flex gap-4 mb-4 justify-start">
          <button
            onClick={() => toggleSort("date")}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === "date"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-600"
            }`}
          >
            {sortDirections.date ? "Oldest ↑" : "Newest ↓"}
          </button>
          <button
            onClick={() => toggleSort("alpha")}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === "alpha"
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-600"
            }`}
          >
            {sortDirections.alpha ? "Alphabetical  ↑" : "Alphabetical  ↓"}
          </button>
        </div>
      )}

      {/* Sorted List */}
      <ul className="space-y-4">
        {sortedThinghies.map((thinghy) => (
          <li key={thinghy.id}>
            <ThinghyCard thinghy={thinghy} />
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function ThinghyFilter({
  onSortChange,
}: {
  onSortChange: (sortBy: "newest" | "alphabetical") => void;
}) {
  const [sortBy, setSortBy] = useState<"newest" | "alphabetical">("newest");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "newest" | "alphabetical";
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-white ">
      <label htmlFor="sort">Sort:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleChange}
        className="bg-[#2a2a3c] border border-gray-700 rounded px-2 py-1 text-white"
      >
        <option value="newest">Newest</option>
        <option value="alphabetical">A → Z</option>
      </select>
    </div>
  );
}

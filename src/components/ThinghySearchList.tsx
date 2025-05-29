"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type Thinghy = {
  id: string;
  title: string;
  category?: string | null;
};

export default function ThinghySearchList({
  thinghies,
}: {
  thinghies: Thinghy[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q.length === 0
      ? []
      : thinghies.filter(
          (thing) =>
            thing.title.toLowerCase().includes(q) ||
            (thing.category || "").toLowerCase().includes(q)
        );
  }, [query, thinghies]);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded bg-[#2a2a3c]">
        <Search className="text-gray-200" size={18} />
        <input
          type="text"
          placeholder="Search your Thinghies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-white w-full focus:outline-none text-sm"
        />
        {query.trim().length > 0 && (
          <div className="absolute z-50 top-full mt-2 left-0 w-full bg-[#1e1e2f] border border-gray-600 rounded shadow-lg max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-400 italic px-4 py-2">
                No results found.
              </p>
            ) : (
              <ul className="divide-y divide-gray-700" role="listbox">
                {filtered.map((thinghy) => (
                  <li key={thinghy.id}>
                    <Link
                      href={`/dashboard/thingies/${thinghy.id}`}
                      className="block px-4 py-3 hover:bg-gray-700 transition"
                    >
                      <p className="text-white font-medium">{thinghy.title}</p>
                      {thinghy.category && (
                        <p className="text-xs text-gray-400">
                          Category: {thinghy.category}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

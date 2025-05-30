import Link from "next/link";

export default function CategoryList({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500 text-sm italic">No categories yet</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/dashboard/${encodeURIComponent(cat.name)}`}
          className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-600 transition"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

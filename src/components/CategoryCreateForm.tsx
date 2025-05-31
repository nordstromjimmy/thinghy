export default function CategoryCreateForm() {
  return (
    <form
      action="/api/category/create"
      method="POST"
      className="flex items-center gap-2 w-full md:w-auto"
    >
      <input
        type="text"
        name="category"
        placeholder="Create new category"
        className="w-full md:w-44 px-2 py-1 rounded bg-[#2a2a3c] text-white border border-gray-600"
        required
      />
      <button
        type="submit"
        className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 whitespace-nowrap cursor-pointer"
      >
        Create
      </button>
    </form>
  );
}

import ThinghySearchList from "@/components/ThinghySearchList";
import { redirect } from "next/navigation";
import CollapsibleCategory from "@/components/CollapsibleCategory";
import ThinghyList from "@/components/ThinghyList";
import { fetchThinghiesAndCategories } from "@/utils/fetchThinghies";
import CategoryToggleSection from "@/components/CategoryToggleSection";
import { getOrCreateEncryptionKey } from "@/lib/getOrCreateEncryptionKey";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ThinghyListPage() {
  const { thinghies, categories, error, redirectTo } =
    await fetchThinghiesAndCategories();

  if (redirectTo) {
    redirect(redirectTo);
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const encryptionKey = await getOrCreateEncryptionKey(user!.id);

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load thinghies</p>
    );
  }

  const defaultThinghies = thinghies!.filter((t) => !t.category?.trim());
  const groupedByCategory: Record<string, typeof thinghies> = {};
  thinghies!.forEach((t) => {
    if (t.category) {
      groupedByCategory[t.category] ||= [];
      groupedByCategory[t.category]!.push(t);
    }
  });

  return (
    <main className="py-6 max-w-full sm:max-w-5xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Your Thinghies</h1>
        <div className="relative w-full md:w-sm">
          <ThinghySearchList thinghies={thinghies!} />
        </div>
      </div>

      <CategoryToggleSection categories={categories!} />

      <ThinghyList
        thinghies={defaultThinghies}
        emptyMessage="You haven’t saved any Thinghies yet."
        encryptionKey={encryptionKey}
      />

      {Object.entries(groupedByCategory).map(([category, items]) => (
        <CollapsibleCategory
          key={category}
          category={category}
          items={items!}
        />
      ))}
    </main>
  );
}

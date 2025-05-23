"use client";

export function ScrollToTopButton() {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      className="w-full bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
    >
      Get Early Access
    </button>
  );
}

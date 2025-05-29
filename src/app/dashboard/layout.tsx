"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#1e1e2f] text-white">
      {/* Mobile Hamburger */}
      {!menuOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white bg-gray-800 p-2 rounded-md shadow"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#2a2a3c] text-white flex flex-col p-6 z-40 transform transition-transform duration-200 ease-in-out
    ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Thinghy mascot"
              width={40}
              height={40}
            />
            <h2 className="text-2xl font-bold">
              <a href="/dashboard">Thinghy</a>
            </h2>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-white bg-white/10 hover:bg-white/20 p-1.5 rounded"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm">
          <a
            href="/dashboard/add"
            className="bg-white text-black text-center px-3 py-2 rounded-md hover:bg-yellow-200 transition"
          >
            Add a new Thinghy
          </a>
          <a
            href="/dashboard"
            className="bg-white text-black text-center px-3 py-2 rounded-md hover:bg-yellow-200 transition"
          >
            Dashboard
          </a>

          <a
            href="/dashboard/thingies"
            className="bg-white text-black text-center px-3 py-2 rounded-md hover:bg-yellow-200 transition"
          >
            Your Thinghies
          </a>

          <div className="flex flex-col pt-6 text-xs text-gray-400">
            <a href="#" className="mb-6 hover:underline">
              Settings
            </a>
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-8 pt-16 md:pt-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}

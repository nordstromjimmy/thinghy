"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  PlusCircle,
  User,
  Folder,
  LayoutDashboard,
} from "lucide-react";

const navLinks = [
  {
    href: "/dashboard/add",
    label: "Add Thinghy",
    icon: <PlusCircle size={16} />,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  {
    href: "/dashboard/thingies",
    label: "Your Thinghies",
    icon: <Folder size={16} />,
  },
  { href: "/dashboard/profile", label: "Profile", icon: <User size={16} /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#1e1e2f] text-white">
      {/* Mobile toggle */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md"
        >
          <Menu />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#2a2a3c] flex flex-col p-6 z-40 transition-transform duration-200 ease-in-out transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">
              <Link href="/dashboard">Thinghy</Link>
            </h2>
            <Image
              src="/logo.png"
              alt="Thinghy mascot"
              width={40}
              height={40}
            />
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-white bg-white/10 hover:bg-white/20 p-1.5 rounded"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  pathname === href
                    ? "bg-yellow-200 text-black"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {icon}
                {label}
              </div>
            </Link>
          ))}
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

"use client";
import { useState } from "react";
import Link from "next/link";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#1e1e2f] text-white border-b border-gray-700 fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          Thinghy.com
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <a href="#why" className="hover:text-yellow-300 transition">
            Why
          </a>
          <a href="#how-it-works" className="hover:text-yellow-300 transition">
            How it works
          </a>
          <Link href="/login" className="hover:text-yellow-300">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-yellow-300 text-black px-4 py-1 rounded hover:bg-yellow-400 font-medium"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#2a2a3c] px-4 pb-4 pt-3 text-sm space-y-3">
          <Link
            href="#why"
            className="hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Why
          </Link>
          <Link
            href="#how-it-works"
            className="block hover:text-yellow-300 pt-3"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            How it works
          </Link>
          <Link href="/login" className="block hover:text-yellow-300">
            Log In
          </Link>
          <Link
            href="/signup"
            className="block bg-yellow-300 text-black w-full text-center py-2 rounded hover:bg-yellow-400 font-medium"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}

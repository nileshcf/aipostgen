"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand Logo / Title */}
        <Link
          href="/"
          className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          MyLinkedInAI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link href="/login" className="hover:text-white transition">
            Login
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand Logo / Title */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent tracking-tight"
        >
          MyLinkedInAI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-black/80">
          <Link
            href="/login"
            className="relative group transition"
          >
            Login
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-black via-gray-700 to-black transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/dashboard"
            className="relative group transition"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-black via-gray-700 to-black transition-all group-hover:w-full" />
          </Link>
          <a
            href="#features"
            className="relative group transition"
          >
            Features
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-black via-gray-700 to-black transition-all group-hover:w-full" />
          </a>
        </nav>
      </div>
    </header>
  );
}

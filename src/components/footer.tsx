"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/90 backdrop-blur-lg mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
        
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            MyLinkedInAI
          </h3>
          <p className="text-black/60 mt-2">
            Generate professional LinkedIn posts with AI-powered creativity.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-medium text-black mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="hover:underline underline-offset-4">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline underline-offset-4">
                Login
              </Link>
            </li>
            <li>
              <a href="#features" className="hover:underline underline-offset-4">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-medium text-black mb-3">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline underline-offset-4">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline underline-offset-4">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline underline-offset-4">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 py-4 text-center text-xs text-black/50">
        © {new Date().getFullYear()} MyLinkedInAI. All rights reserved.
      </div>
    </footer>
  );
}

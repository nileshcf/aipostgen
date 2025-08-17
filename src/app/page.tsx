import Header from "@/components/header";
import Footer from "@/components/footer";
import GlassCard from "@/components/glass-card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl md:text-6xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Elevate Your LinkedIn Presence 🚀
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
          Generate polished, professional LinkedIn posts powered by AI. Save
          time, grow your brand, and focus on what truly matters.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium shadow-md hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl border border-gray-600 text-gray-200 hover:bg-gray-800 hover:scale-105 transition"
          >
            Live Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 py-20 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        <GlassCard
          title="Smart AI"
          description="Give a prompt and watch AI craft engaging LinkedIn posts tailored to your style."
        />
        <GlassCard
          title="Apple Aesthetics"
          description="Smooth gradients, elegant typography, and glassy UI for a premium feel."
        />
        <GlassCard
          title="Supabase Auth"
          description="Secure login and user management with Supabase, reusable across projects."
        />
      </section>

      <Footer />
    </main>
  );
}

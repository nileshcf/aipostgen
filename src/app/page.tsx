import Header from "@/components/header";
import Footer from "@/components/footer";
import GlassCard from "@/components/glass-card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">
          Elevate Your LinkedIn Presence 🚀
        </h1>
        <p className="mt-6 text-lg md:text-xl text-black/70 max-w-2xl">
          Generate polished, professional LinkedIn posts powered by AI. Save
          time, grow your brand, and focus on what truly matters.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-medium shadow-md hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl border border-gray-300 text-black hover:bg-gray-100 hover:scale-105 transition"
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
          gradient="from-blue-500 via-cyan-500 to-teal-500"
        />
        <GlassCard
          title="Apple Aesthetics"
          description="Smooth gradients, elegant typography, and glassy UI for a premium feel."
          gradient="from-pink-500 via-red-500 to-yellow-500"
        />
        <GlassCard
          title="Supabase Auth"
          description="Secure login and user management with Supabase, reusable across projects."
          gradient="from-purple-500 via-indigo-500 to-blue-500"
        />
      </section>

      <Footer />
    </main>
  );
}

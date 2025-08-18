'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import GlassCard from '@/components/glass-card';
import PostVariant from '@/components/post-variant';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [tone, setTone] = useState('thought');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [hashtags, setHashtags] = useState(3);
  const [emojis, setEmojis] = useState(true);
  const [variants, setVariants] = useState(3);
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, notes, tone, length, hashtags, emojis, variants }),
      });
      const j = await res.json();
      if (!res.ok) {
        toast.error(j.error || 'Generation failed');
        setLoading(false);
        return;
      }
      setOutput(j.text || '');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f5f7] via-white to-[#e6e6eb] text-neutral-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent tracking-tight">
          AI-Powered LinkedIn Post Generator
        </h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
          Craft professional, engaging posts with Apple-inspired elegance.  
          Input your thoughts, and let AI create polished variants.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-16 lg:px-24 pb-16">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Input Form Card */}
          <GlassCard
            title="Generate LinkedIn Post"
            description="Fill in details below and let AI generate engaging post variants."
            className="shadow-2xl"
          >
            <div className="space-y-4">
              <input
                placeholder="Topic (e.g., AI in DevOps)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
              <textarea
                placeholder="Notes / bullet points"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
                >
                  <option value="thought">Thought leadership</option>
                  <option value="story">Story</option>
                  <option value="launch">Launch</option>
                  <option value="hiring">Hiring</option>
                  <option value="ama">AMA</option>
                  <option value="summary">Summary</option>
                </select>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3 items-center">
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={hashtags}
                  onChange={(e) => setHashtags(Number(e.target.value || 0))}
                  className="px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={emojis}
                    onChange={(e) => setEmojis(e.target.checked)}
                    className="accent-black"
                  />
                  Emojis
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={variants}
                  onChange={(e) => setVariants(Number(e.target.value || 1))}
                  className="px-4 py-3 rounded-lg bg-white/60 backdrop-blur-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generate}
                  className="bg-black text-white px-6 py-3 rounded-lg font-medium shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Generating…' : 'Generate'}
                </button>
                <button
                  onClick={() => {
                    setTopic('');
                    setNotes('');
                    setOutput('');
                  }}
                  className="border border-neutral-300 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Output Card */}
          <GlassCard
            title="Generated Variants"
            description="Your AI-generated LinkedIn post variants will appear below."
            className="shadow-2xl"
          >
            <div>
              {output ? (
                output.split(/\n{2,}/).map((block, i) => (
                  <div key={i} className="mb-3">
                    <PostVariant text={block.trim()} />
                  </div>
                ))
              ) : (
                <div className="text-sm text-neutral-500 italic">
                  Generated variants will appear here.
                </div>
              )}
              {output && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="px-4 py-2 border rounded-lg hover:bg-neutral-100 transition"
                  >
                    Copy All
                  </button>
                  <a
                    className="px-4 py-2 rounded-lg border hover:bg-neutral-100 transition"
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(output)}`}
                    download="linkedin-post.txt"
                  >
                    Download .txt
                  </a>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

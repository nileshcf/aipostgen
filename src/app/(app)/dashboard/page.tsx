'use client';
import { useEffect, useState } from 'react';
import BrandHeader from '@/components/brand-header';
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

  useEffect(() => {
    // If not logged in (cookie absent) we'll not block here; server will return 401 when generating.
  }, []);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, notes, tone, length, hashtags, emojis, variants })
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
    <div>
      <BrandHeader />
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form Card */}
        <GlassCard
          title="Generate LinkedIn Post"
          description="Fill in details below and let AI generate engaging post variants."
        >
          <div className="space-y-3">
            <input
              placeholder="Topic (eg. AI in DevOps)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2"
            />
            <textarea
              placeholder="Notes / bullet points"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-28 px-3 py-2"
            />
            <div className="grid grid-cols-2 gap-3">
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="px-3 py-2">
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
                className="px-3 py-2"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                min={0}
                max={10}
                value={hashtags}
                onChange={(e) => setHashtags(Number(e.target.value || 0))}
                className="px-3 py-2"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={emojis}
                  onChange={(e) => setEmojis(e.target.checked)}
                />{' '}
                Emojis
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={variants}
                onChange={(e) => setVariants(Number(e.target.value || 1))}
                className="px-3 py-2"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={generate}
                className="bg-black text-white px-4 py-2 rounded-md"
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
                className="border px-4 py-2 rounded-md"
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
        >
          <div>
            {output ? (
              output.split(/\n{2,}/).map((block, i) => (
                <div key={i} className="mb-3">
                  <PostVariant text={block.trim()} />
                </div>
              ))
            ) : (
              <div className="text-sm text-neutral-500">
                Generated variants will appear here.
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="px-3 py-2 border rounded-md"
              >
                Copy All
              </button>
              <a
                className="px-3 py-2 rounded-md border"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(output)}`}
                download="linkpost.txt"
              >
                Download .txt
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

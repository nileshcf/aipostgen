'use client';
import { useState } from 'react';
import GlassCard from '@/components/glass-card';
import BrandHeader from '@/components/brand-header';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onLogin() {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) {
        toast.error(j.error || 'Login failed');
        return;
      }
      toast.success('Logged in');
      router.push('/dashboard');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  async function onRegister() {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) {
        toast.error(j.error || 'Register failed');
        return;
      }
      toast.success('Registered — check your email (if required). Now login.');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <BrandHeader />

      <GlassCard className="w-full max-w-md mt-8">
        <div className="space-y-6">
          <h2 className="grad-title text-2xl font-semibold text-center">Welcome Back</h2>
          <p className="text-center text-sm text-neutral-600">Login to continue to your dashboard</p>

          <div className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black/50 transition"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black/50 transition"
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onLogin}
              className="rounded-md bg-black px-4 py-2 text-white hover:opacity-80 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '…' : 'Login'}
            </button>
            <button
              onClick={onRegister}
              className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '…' : 'Register'}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

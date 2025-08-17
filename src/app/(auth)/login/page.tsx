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
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (!res.ok) {
        toast.error(j.error || 'Login failed');
        setLoading(false);
        return;
      }
      toast.success('Logged in');
      router.push('/dashboard');
    } catch (e) {
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
        body: JSON.stringify({ email, password })
      });
      const j = await res.json();
      if (!res.ok) {
        toast.error(j.error || 'Register failed');
        setLoading(false);
        return;
      }
      toast.success('Registered — check email (if required). Now login.');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <BrandHeader />
      <GlassCard>
        <div className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2" />
          <div className="flex gap-3">
            <button onClick={onLogin} className="rounded-md bg-black px-4 py-2 text-white" disabled={loading}>{loading ? '…' : 'Login'}</button>
            <button onClick={onRegister} className="rounded-md border px-4 py-2" disabled={loading}>{loading ? '…' : 'Register'}</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
      setShowConfirm(true); // 👈 show modal
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-white via-neutral-100 to-neutral-200">
      {/* Logo / Brand */}
      <div className="text-4xl font-bold bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
        MyBrand
      </div>

      {/* Glassmorphic Card */}
      <div className="w-full max-w-md mt-8 p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/60 border border-white/30">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-neutral-600">
            Login or register to continue
          </p>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-3 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black/40 transition bg-white/70 backdrop-blur"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full px-3 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black/40 transition bg-white/70 backdrop-blur"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onLogin}
              className="rounded-lg bg-gradient-to-r from-black via-gray-900 to-black px-6 py-2 text-white font-medium hover:opacity-80 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '…' : 'Login'}
            </button>
            <button
              onClick={onRegister}
              className="rounded-lg border border-neutral-400 px-6 py-2 font-medium hover:bg-neutral-100 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '…' : 'Register'}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Apple-style modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white/80 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center border border-neutral-200">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 via-black to-gray-700 bg-clip-text text-transparent">
              Confirm Your Email
            </h3>
            <p className="mt-3 text-sm text-neutral-700">
              We’ve sent a confirmation link to <span className="font-medium">{email}</span>.  
              Please check your inbox to verify your account.
            </p>
            <button
              onClick={() => setShowConfirm(false)}
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-black via-gray-900 to-black px-6 py-2 text-white font-medium hover:opacity-80 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

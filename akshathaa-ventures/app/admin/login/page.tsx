'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div className="min-h-screen bg-[#12100C] flex items-center justify-center px-6">
      <div className="bg-[#F5F0E8] p-12 w-full max-w-md">
        <h1 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Admin Login
        </h1>

        {error && (
          <div className="bg-[#EDE8DC] border border-[#BFA16A] border-opacity-30 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-[#EDE8DC] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              placeholder="admin@akshathaaventures.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-[#EDE8DC] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-outline disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

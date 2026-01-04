'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {type === 'login' ? 'Welcome Back' : 'Create Your Legacy'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Start Your Journey'}
        </button>
        <div className='flex justify-center items-center w-full  h-10'>

          <p className=" text-white">
            {type === 'login' ? (
              <>
                Don't have an account ?{' '}
                <a href="/signup" className="text-amber-400 hover:text-amber-300">
                  Create one
                </a>
                
              </>
            ) : (
              <>
                Already have an account ?{' '}
                <a href="/login" className="text-amber-400 hover:text-amber-300">
                  Sign in
                </a>
                
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}

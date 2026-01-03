'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[2px] bg-linear-to-b from-black/60 to-transparent border-t border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/legacy.png" className='h-10' alt="" />
          <span className="text-lg font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">
            Legacy-AI
          </span>
        </Link>
        
        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full transition-all border border-white/5 hover:border-white/10 backdrop-blur-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full transition-all border border-white/5 hover:border-white/10 backdrop-blur-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Placeholder) */}
        <button className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Memory {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export default function VaultPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('memories')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setMemories(data || []);
        }
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Your Memory Vault</h1>
          <Link 
            href="/dashboard/add-memory"
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-full transition-all text-sm"
          >
            + Add Memory
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-neutral-500">Loading your vault...</div>
        ) : memories.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-neutral-900/20">
            <p className="text-neutral-400 mb-4">Your vault is empty.</p>
            <Link 
              href="/dashboard/add-memory"
              className="text-amber-500 hover:text-amber-400 font-medium"
            >
              Start by adding your first memory &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => (
              <div key={memory.id} className="p-6 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">{memory.title}</h3>
                  <p className="text-neutral-400 text-sm line-clamp-3">{memory.content}</p>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                  <span className="text-xs text-neutral-500">
                    {new Date(memory.created_at).toLocaleDateString()}
                  </span>
                  {memory.tags && memory.tags.length > 0 && (
                    <div className="flex gap-2">
                      {memory.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

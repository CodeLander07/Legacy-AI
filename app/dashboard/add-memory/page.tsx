'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';

export default function AddMemoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add a memory');
      }

      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

      const { error: insertError } = await supabase
        .from('memories')
        .insert([
          {
            user_id: user.id,
            title,
            content,
            tags: tagArray,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw insertError;

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-8">Add a New Memory</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="e.g., The day we moved to the farm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-y"
              placeholder="Write your story here..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="family, lesson, 1990s"
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Memory'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 bg-transparent hover:bg-white/5 text-white border border-white/10 font-medium rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

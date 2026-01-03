import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Family Vault</h1>
        <p className="text-neutral-400 mb-10">Manage your legacy and preserve your wisdom.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Memory Card */}
          <Link href="/dashboard/add-memory" className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500/20 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Memory</h3>
            <p className="text-neutral-400 text-sm">Record a new story, lesson, or experience.</p>
          </Link>

          {/* View Vault Card */}
          <Link href="/dashboard/vault" className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500/20 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">View Vault</h3>
            <p className="text-neutral-400 text-sm">Access your stored memories and artifacts.</p>
          </Link>

          {/* Ask LegacyAI Card */}
          <Link href="/dashboard/chat" className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500/20 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ask LegacyAI</h3>
            <p className="text-neutral-400 text-sm">Chat with your family's wisdom AI.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

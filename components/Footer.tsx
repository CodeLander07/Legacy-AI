import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} LegacyAI. All rights reserved.
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/contact" className="text-sm text-neutral-500 hover:text-amber-500 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm text-neutral-500 hover:text-amber-500 transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm text-neutral-500 hover:text-amber-500 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

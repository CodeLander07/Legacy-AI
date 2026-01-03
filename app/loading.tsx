'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#050505]">
      <span className="text-2xl md:text-3xl font-medium tracking-widest text-white/90 animate-fade-in">
        LegacyAI
      </span>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:bg-neutral-900/80 group">
      <div className="mb-4 text-amber-500 group-hover:scale-110 transition-transform duration-300">
        {icon || <div className="w-8 h-8 bg-amber-500/20 rounded-full" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

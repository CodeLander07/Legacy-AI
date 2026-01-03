'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';

// Animation variants for consistent scroll effects
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="bg-[#050505] text-white selection:bg-amber-500/30 overflow-x-hidden">
      <Navbar />
      
      {/* 2️⃣ HERO SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-10"
      >
        {/* Background Glow - More subtle and spread out */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-amber-500/10 bg-amber-500/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <span className="text-amber-200/90 text-xs font-medium tracking-widest uppercase">The Digital Time Capsule</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10 leading-[1.15] text-white/95">
            Preserve Your Wisdom. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-100 via-amber-400 to-amber-600">
              Guide Future Generations.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-neutral-400 mb-16 max-w-xl mx-auto leading-relaxed font-light">
            Legacy-AI allows families to store life experiences, values, and lessons as a secure digital time capsule accessible to future generations when the time is right.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-full transition-all hover:-translate-y-0.5 text-base shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Create Your Legacy
            </Link>
            <Link 
              href="signup" 
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/5 text-white border border-white/10 font-medium rounded-full transition-all hover:-translate-y-0.5 text-base backdrop-blur-sm"
            >
              View Demo
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 3️⃣ WHY LEGACYAI EXISTS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center px-6 bg-neutral-950/30 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full py-20">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Family Wisdom Gets Lost</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Every generation loses invaluable stories and lessons. We're here to stop that cycle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⏳",
                title: "Generational Gaps",
                desc: "Stories fade as families grow apart or life gets busy."
              },
              {
                icon: "😶",
                title: "Untold Lessons",
                desc: "Many life experiences are never shared until it's too late."
              },
              {
                icon: "🏚️",
                title: "Lost with Time",
                desc: "Physical journals and photos get lost, damaged, or forgotten."
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="p-10 rounded-3xl bg-neutral-900/20 border border-white/5 text-center hover:bg-neutral-900/40 transition-colors"
              >
                <div className="text-5xl mb-8">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4️⃣ HOW IT WORKS */}
      <motion.section 
        id="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-7xl mx-auto w-full py-20">
          <motion.div variants={fadeInUp} className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">How Legacy-AI Works</h2>
            <div className="h-1 w-1/3 bg-amber-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-500/30 to-transparent -z-10" />

            {[
              { step: "01", title: "Record", desc: "Parents record life experiences & stories." },
              { step: "02", title: "Secure", desc: "Wisdom is encrypted & stored in your vault." },
              { step: "03", title: "Unlock", desc: "Children access memories when they reach specific ages." },
              { step: "04", title: "Interact", desc: "AI answers questions using your family knowledge." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-[#0a0a0a] border border-amber-500/30 flex items-center justify-center text-2xl font-bold text-amber-500 mb-8 shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:scale-110 group-hover:border-amber-500 transition-all duration-300 z-10 bg-[#050505]">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-neutral-400 text-base leading-relaxed px-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5️⃣ FEATURE HIGHLIGHTS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="min-h-screen flex items-center justify-center px-6 bg-neutral-900/20"
      >
        <div className="max-w-7xl mx-auto w-full py-20">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Generations</h2>
            <p className="text-neutral-400 text-lg">Advanced technology meeting timeless values.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 text-center lg:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp}>
              <FeatureCard 
                title="Digital Time Capsule"
                description="Store videos, voice notes, and text in a permanent digital vault."
                icon={<span className="text-6xl">💎</span>}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard 
                title="Wisdom-Aware AI"
                description="An AI trained on your specific life stories to answer future questions."
                icon={<span className="text-6xl">🧠</span>}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard 
                title="Time-Based Unlocking"
                description="Set messages to unlock when your child turns 18, 21, or 30."
                icon={<span className="text-6xl">⏰</span>}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard 
                title="Private Family Vault"
                description="Encryption ensures your memories stay private forever."
                icon={<span className="text-6xl">🔒</span>}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 6️⃣ TRUST / VISION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="min-h-[100vh] flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto w-full p-16 rounded-[2.5rem] bg-linear-to-b from-neutral-900/50 to-transparent border border-white/5 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Built for Families, Not Feeds</h2>
          <p className="text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            Legacy-AI is private by design. Your family’s memories are never used for ads, training public models, or social sharing. This is your private sanctuary.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-neutral-500 uppercase tracking-[0.2em] font-medium">
            <span>Private</span> • <span>Secure</span> • <span>Forever</span>
          </div>
        </div>
      </motion.section>

      {/* 7️⃣ CONTACT SECTION */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="min-h-[80vh] flex items-center justify-center px-6 pb-20"
      >
        <div className="max-w-xl mx-auto w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-neutral-400 mb-12 text-lg">
            Have questions or ideas? We’d love to hear from you.
          </p>
          
          <form className="space-y-6 text-left" action='/contact'>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button  className=" cursor-pointer w-full py-4 px-6 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors text-lg">
              Send Message
            </button>
          </form>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}

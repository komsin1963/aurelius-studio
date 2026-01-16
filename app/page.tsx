'use client';

import Link from 'next/link';
import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black italic tracking-tighter uppercase">
          Aurelius<span className="text-cyan-500">X</span>
        </div>
        <Link href="/login" className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Member Access
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-8">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Next-Gen AI Intelligence Hub</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
          Design the <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Impossible</span>
        </h1>

        <p className="max-w-xl text-slate-500 text-sm md:text-base font-medium mb-12 leading-relaxed uppercase tracking-wide">
          Unlock the power of autonomous AI creation. Join the elite network of creators using AureliusX to build future-proof digital assets.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/login" className="bg-cyan-500 text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center gap-3">
            Get 5 Free Credits <ArrowRight size={18} />
          </Link>
          <Link href="/discovery" className="bg-white/5 border border-white/10 px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all">
            Explore AI Hub
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl w-full">
          {[
            { icon: <Zap />, title: 'Instant Gen', desc: 'Ultra-fast AI generation' },
            { icon: <Shield />, title: 'Secure Vault', desc: 'Enterprise-grade encryption' },
            { icon: <Sparkles />, title: 'PRO Models', desc: 'Exclusive FLUX.1 access' }
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-left hover:border-cyan-500/30 transition-all group">
              <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="font-black uppercase italic tracking-tighter mb-1">{f.title}</h3>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-32 pb-12 opacity-30">
        <p className="text-[9px] font-black text-center tracking-[1em] uppercase">Built for the future by Komsin Studio</p>
      </footer>
    </div>
  );
}
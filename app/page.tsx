'use client';

import Link from 'next/link';
import { 
  Sparkles, Trophy, Zap, BookOpen, 
  Cpu, LayoutGrid, ArrowRight, ShieldCheck, 
  Image as ImageIcon, User, LogOut
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* --- Ambient Background --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-500/5 blur-[120px] rounded-full -z-10" />

      {/* --- Top Navigation Bar --- */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
             <Zap size={20} className="fill-white text-white" />
          </div>
          <span className="text-xl font-black italic uppercase tracking-tighter">Aurelius<span className="text-cyan-500">X</span></span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/profile" className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/40 transition-colors">
              <User size={14} className="text-cyan-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- Hero Section --- */}
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
              Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">System</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 italic">By komsin Intelligence • 2026</p>
        </header>

        {/* --- Grid Menu --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Studio - Studio 5 (ทางเข้าหลักสำหรับการ Gen รูป) */}
          <Link href="/studio5" className="md:col-span-8 group relative bg-[#0b0b12] border border-cyan-500/20 p-10 rounded-[3rem] transition-all hover:border-cyan-500 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700">
              <Sparkles className="text-cyan-500" size={100} />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-cyan-500/20 mb-6 inline-block">Creation Hub</span>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Studio 5</h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-sm">ระบบ Generate ภาพ AI ขั้นสูง สำหรับงานส่วนตัวของคุณ</p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-white text-xs font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
                  Enter Engine <ArrowRight size={18} className="text-cyan-500" />
              </div>
            </div>
          </Link>

          {/* Ranking & Social */}
          <Link href="/leaderboard" className="md:col-span-4 group bg-[#0b0b12] border border-white/5 p-10 rounded-[3rem] transition-all hover:border-fuchsia-500/50 flex flex-col justify-between overflow-hidden relative">
            <Trophy className="text-fuchsia-500 mb-8 group-hover:scale-110 transition-transform" size={48} />
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">Leaderboard</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Citizen Rankings</p>
            </div>
          </Link>

          {/* Secondary Options */}
          <Link href="/ebook" className="md:col-span-4 group bg-[#0b0b12] border border-white/5 p-10 rounded-[3rem] transition-all hover:border-white/20">
            <BookOpen className="text-slate-500 mb-6 group-hover:text-white transition-colors" size={32} />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">Knowledge Vault</h3>
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Assets & E-books</p>
          </Link>

          <Link href="/academy" className="md:col-span-4 group bg-[#0b0b12] border border-white/5 p-10 rounded-[3rem] transition-all hover:border-white/20">
            <Cpu className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">Neural Academy</h3>
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Learning Center</p>
          </Link>

          <Link href="/topup" className="md:col-span-4 group bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-10 rounded-[3rem] transition-all hover:border-yellow-500 flex flex-col justify-between">
            <Zap className="text-yellow-500 group-hover:scale-110 transition-transform" size={32} fill="currentColor" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Recharge XP</h3>
          </Link>

          {/* Asset Vault (เชื่อมกับหน้าที่เราทำล่าสุด) */}
          <Link href="/assets" className="md:col-span-6 group bg-[#0b0b12] border border-white/5 p-8 rounded-[2.5rem] transition-all hover:bg-white/[0.02] hover:border-emerald-500/50 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <ImageIcon className="text-slate-500 group-hover:text-emerald-400 transition-colors" size={24} />
                <h4 className="text-xl font-black italic uppercase tracking-tighter">My Assets</h4>
             </div>
             <ArrowRight size={20} className="text-slate-800 group-hover:text-white transition-all group-hover:translate-x-1" />
          </Link>

          {/* Old Studio */}
          <Link href="/studio4" className="md:col-span-6 group bg-[#0b0b12] border border-white/5 p-8 rounded-[2.5rem] transition-all hover:bg-white/[0.02] flex items-center justify-between">
             <div className="flex items-center gap-6">
                <LayoutGrid className="text-slate-500 group-hover:text-white transition-colors" size={24} />
                <h4 className="text-xl font-black italic uppercase tracking-tighter">Studio 4</h4>
             </div>
             <ArrowRight size={20} className="text-slate-800 group-hover:text-white transition-all group-hover:translate-x-1" />
          </Link>
        </div>

        {/* --- Simple Footer --- */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
           <p className="text-[10px] font-black tracking-[0.8em] text-slate-600 uppercase italic">
              KOMSIN INTELLIGENCE • ALL RIGHTS RESERVED 2026
           </p>
           <div className="mt-4 flex justify-center gap-6 text-[8px] font-bold text-slate-700 uppercase tracking-widest">
              <span>System: <span className="text-emerald-500">Online</span></span>
              <span>Encrypted Connection</span>
              <span>Build: v5.1.0 By komsin</span>
           </div>
        </footer>

      </main>
    </div>
  );
}
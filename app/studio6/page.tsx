'use client';

import { 
  ArrowLeft, PenTool, Cpu, Layers, 
  ChevronRight, Globe, Activity, ShieldCheck, 
  Fingerprint, 
  Monitor // ✅ แก้ไข Error Monitor is not defined
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function StudioSix() {
  const [activeTab, setActiveTab] = useState('vector');

  return (
    <div style={{ backgroundColor: '#020205' }} className="h-screen w-full text-white flex flex-col font-sans overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="h-14 flex justify-between items-center px-8 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl z-50">
        <Link href="/dashboard" className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all text-[9px] font-black uppercase tracking-[0.4em]">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK TO HUB
        </Link>
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-black italic tracking-tighter uppercase bg-gradient-to-r from-white to-slate-600 bg-clip-text text-transparent">
            STUDIO 06
          </h1>
          <Globe size={16} className="text-cyan-500/40 animate-pulse" />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20"></div>

        {/* --- LEFT SIDEBAR --- */}
        <aside className="w-72 bg-black border-r border-white/[0.05] p-6 flex flex-col z-40">
          <div className="space-y-3">
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.6em] mb-6 px-2">INTERFACE TOOLS</p>
            {[
              { id: 'vector', label: 'VECTOR ART', icon: <PenTool size={16} /> },
              { id: 'neural', label: 'NEURAL ART', icon: <Cpu size={16} /> },
              { id: 'layers', label: 'LAYERS ART', icon: <Layers size={16} /> }
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${activeTab === item.id ? 'bg-white text-black border-white' : 'bg-transparent border-white/[0.03] text-slate-500 hover:border-white/10'}`}>
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight size={14} />}
              </button>
            ))}
          </div>
          <div className="mt-auto p-5 rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-black text-cyan-400 tracking-widest uppercase">ENGINE STATUS</span>
                <Activity size={12} className="text-cyan-500 animate-pulse" />
             </div>
             <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                <div className="h-full bg-cyan-500 w-[92%]"></div>
             </div>
          </div>
        </aside>

        {/* --- CENTRAL CANVAS SECTION --- */}
        <main className="flex-1 flex flex-col items-center justify-center p-12 relative z-30">
          
          {/* Vector Frame Section */}
          <div className="relative group mb-40"> {/* ✅ ปรับเพิ่มเป็น mb-40 เพื่อเลื่อนแถบสีฟ้าลงมาให้พ้นกราฟิก */}
            <div className="absolute -inset-24 bg-cyan-500/5 blur-[120px] rounded-full opacity-50"></div>
            
            <div className="w-[420px] h-[420px] bg-black border border-white/[0.1] rounded-[4rem] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden backdrop-blur-3xl">
               <div className="relative z-10 p-14 bg-[#050505] rounded-[3.5rem] border border-white/[0.02] shadow-inner">
                  <svg width="220" height="220" viewBox="0 0 240 240" fill="none" className="drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <defs>
                      <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" /><stop offset="50%" stopColor="#d946ef" /><stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                    <rect x="40" y="40" width="160" height="160" rx="40" stroke="url(#cyberGradient)" strokeWidth="0.5" strokeDasharray="15 10" className="animate-spin-slow origin-center opacity-20" />
                    <path d="M120 40 L200 80 V160 L120 200 L40 160 V80 Z" stroke="url(#cyberGradient)" strokeWidth="2.5" />
                    <circle cx="120" cy="40" r="4" fill="#22d3ee" className="animate-ping" />
                  </svg>
               </div>
               <div className="mt-10 text-center">
                 <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-700">NEURAL CORE ACTIVE</p>
               </div>
            </div>
          </div>

          {/* 🔘 THE LONG BAR: ปรับตำแหน่งและแก้ Syntax Error แล้ว */}
          <button className="w-full max-w-xl group relative py-6 overflow-hidden rounded-2xl bg-cyan-500 text-black transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] active:scale-[0.98]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform"></div>
            <div className="relative flex items-center justify-center gap-6">
              <Monitor size={20} className="text-black group-hover:scale-110 transition-transform duration-300" /> 
              <span className="text-[13px] font-black uppercase tracking-[0.8em]">
                EXECUTE DESIGN ENGINE
              </span>
            </div>
          </button>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="h-10 border-t border-white/[0.05] px-8 flex justify-between items-center text-[7px] font-black text-slate-800 uppercase tracking-[0.5em] bg-black">
        <div className="flex gap-10">
          <span className="flex items-center gap-2"><ShieldCheck size={12} className="opacity-30" /> SECURE NODE</span>
          <span className="flex items-center gap-2 text-cyan-500/40"><Fingerprint size={12} /> BIOMETRIC ACTIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>LATENCY: 12MS</span>
          <span className="italic font-bold text-slate-700">AURELIUS STUDIO 06</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
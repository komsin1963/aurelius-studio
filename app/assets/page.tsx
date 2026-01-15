'use client';

import React from 'react';
import { 
  Search, Filter, Image as ImageIcon, Video, FileText, 
  MoreVertical, ArrowLeft, ShieldCheck, ArrowRight, Fingerprint, Cpu 
} from 'lucide-react';
import Link from 'next/link';

export default function AssetVault() {
  const assets = [
    { id: 1, name: 'CYBER_RENDER_01.PNG', type: 'IMAGE', size: '12.4 MB', date: '2026.01.14' },
    { id: 2, name: 'SYSTEM_CORE_V2.MP4', type: 'VIDEO', size: '85.2 MB', date: '2026.01.12' },
    { id: 3, name: 'DOCUMENT_AUTH.PDF', type: 'DOC', size: '1.1 MB', date: '2026.01.10' },
  ];

  return (
    /* 🔹 ใช้สีดำสนิทเพื่อแก้ปัญหาสีขาว และคุมโทนตามดีไซน์เดิม */
    <main className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
      
      {/* Background Decor: แสงเรืองแสงสีฟ้าบางๆ ด้านบน */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-screen">
        
        {/* Header: สไตล์เรียบหรูแบบดั้งเดิม */}
        <header className="h-16 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-500 hover:text-cyan-400 transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
              <ArrowLeft size={14} /> BACK_TO_HUB
            </Link>
            <h1 className="text-sm font-black italic uppercase tracking-[0.4em]">
              AURELIUS <span className="opacity-40 font-light">VAULT</span>
            </h1>
          </div>
          <span className="text-[8px] tracking-[0.3em] font-mono text-cyan-500/60 uppercase">SYSTEM_SYNC_ACTIVE</span>
        </header>

        {/* Content Section: ปรับกรอบให้แคบลงและกะทัดรัด */}
        <main className="flex-1 flex flex-col items-center justify-start pt-16 px-6 overflow-y-auto">
          <div className="w-full max-w-2xl space-y-4"> {/* 🔹 ปรับ max-w-2xl เพื่อให้กรอบแคบลง */}
            
            {/* Search Input: ทรงแคบสไตล์ Minimal */}
            <div className="relative mb-8 group">
              <Search size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
              <input 
                className="w-full py-3 pl-12 pr-12 rounded-2xl bg-white/[0.03] border border-white/10 text-[11px] font-mono focus:outline-none focus:border-cyan-500/40 transition-all placeholder:text-slate-800"
                placeholder="SEARCH_IDENTITY_IN_VAULT..."
              />
              <Filter size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white cursor-pointer" />
            </div>

            {/* Asset List: กรอบแคบ (Narrow Container) */}
            <div className="flex flex-col gap-3">
              {assets.map((asset) => (
                <div key={asset.id} className="group relative bg-[#08080a] border border-white/5 rounded-2xl p-4 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center gap-5 relative z-10">
                    {/* Icon Small Box */}
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                      {asset.type === 'IMAGE' && <ImageIcon className="text-cyan-400/50" size={18} />}
                      {asset.type === 'VIDEO' && <Video className="text-purple-400/50" size={18} />}
                      {asset.type === 'DOC' && <FileText className="text-emerald-400/50" size={18} />}
                    </div>
                    
                    {/* Info Section */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[10px] font-bold tracking-widest text-slate-200 uppercase truncate italic">
                        {asset.name}
                      </h3>
                      <div className="flex gap-4 mt-1 text-[8px] font-mono text-slate-600 font-bold uppercase">
                        <span>{asset.size}</span>
                        <span className="opacity-40">{asset.date}</span>
                      </div>
                    </div>

                    <button className="text-slate-800 hover:text-white transition-colors p-2">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  
                  {/* Decorative line: เส้นใต้สีฟ้าบางๆ เวลา Hover */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-500 group-hover:w-[90%] transition-all duration-500 opacity-50" />
                </div>
              ))}
            </div>

            {/* Action Button: ปุ่ม SYNC ทรงแคบเข้ากับ Layout */}
            <div className="flex justify-center pt-8 pb-12">
              <button className="px-10 py-4 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] tracking-[0.5em] font-black italic hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all flex items-center gap-3">
                SYNC_VAULT <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </main>

        {/* Footer: สไตล์ Biometric ดั้งเดิม */}
        <footer className="h-12 px-10 border-t border-white/5 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3 text-slate-600">
            <ShieldCheck size={14} />
            <span className="text-[8px] tracking-[0.2em] uppercase font-bold">ENC_V8.4</span>
          </div>
          <div className="flex items-center gap-4 text-cyan-500/50">
            <div className="flex items-center gap-2">
              <Cpu size={12} />
              <span className="text-[8px] font-mono font-bold uppercase">Node:Stable</span>
            </div>
            <Fingerprint size={14} />
          </div>
        </footer>
      </div>
    </main>
  );
}
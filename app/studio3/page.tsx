'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Paintbrush, Printer, Download, Image as ImageIcon, Loader2, Scissors, Square, Layout, Wand2, CupSoda, Disc, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// ในส่วนของ UI ให้เพิ่มโค้ดนี้
<Link href="/" className="text-blue-500 underline">
  ⬅️ กลับหน้าหลัก
</Link>
// --- CONFIGURATION ---
const supabaseUrl = 'https://sriunfblgxorzzvzmpmf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaXVuZmJsZ3hvcnp6dnptcG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODY0MzIsImV4cCI6MjA1MjI2MjQzMn0.sb_publishable_jaw_05elpxOUk4oAjvKy7g_ZQoQ-BeU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Studio3Page() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('coloring'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const generateDesign = async () => {
    if (!prompt) return alert('กรุณาใส่รายละเอียดภาพครับคุณกมสิน');
    setIsGenerating(true);
    
    // จำลองการ Gen ภาพ
    setTimeout(() => {
      setGeneratedImageUrl(`https://picsum.photos/seed/${Math.random()}/800/1200`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-900/20">
              <Paintbrush size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">Aurelius Print Studio</h1>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em]">Studio 03 / BY_KOMSIN</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/library" className="text-slate-500 hover:text-orange-400 transition-all text-[10px] font-black uppercase tracking-widest">
              Gallery_Access
            </Link>
            <Link href="/" className="p-2 bg-slate-900 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all">
              <ArrowLeft size={18} />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: TOOLS --- */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
              <label className="text-[10px] font-black uppercase text-orange-500 mb-6 block tracking-[0.2em] text-center">Product_Matrix</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'coloring', label: 'Coloring Book', icon: <Scissors size={18} /> },
                  { id: 'pod_tshirt', label: 'T-Shirt Design', icon: <Layout size={18} /> },
                  { id: 'pod_mug', label: 'Ceramic Mug', icon: <CupSoda size={18} /> },
                  { id: 'pod_plate', label: 'Melamine Plate', icon: <Disc size={18} /> },
                  { id: 'pod_poster', label: 'Art Poster', icon: <Square size={18} /> }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                      mode === item.id 
                      ? 'border-orange-600 bg-orange-600/10 text-white shadow-[0_0_20px_rgba(234,88,12,0.1)]' 
                      : 'border-slate-800 bg-black/40 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <span className={`${mode === item.id ? 'text-orange-500' : 'group-hover:text-orange-400 transition-colors'}`}>
                        {item.icon}
                    </span>
                    <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem]">
              <label className="text-[10px] font-black uppercase text-slate-500 mb-4 block tracking-widest">Neural_Prompt_Input</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision..."
                className="w-full bg-black/50 border border-slate-800 rounded-2xl p-4 h-32 outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600/50 transition-all text-slate-200 placeholder:text-slate-700 text-sm"
              />
            </section>

            <button 
              onClick={generateDesign}
              disabled={isGenerating}
              className="w-full group relative overflow-hidden bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-orange-950/20 disabled:opacity-50"
            >
              <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000"></div>
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
              Execute_Generation
            </button>
          </div>

          {/* --- RIGHT: PREVIEW AREA --- */}
          <div className="lg:col-span-8 bg-black/40 border border-slate-800 rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[700px] relative overflow-hidden shadow-inner group">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Paintbrush size={300} />
            </div>
            
            {!generatedImageUrl && !isGenerating ? (
              <div className="relative z-10 space-y-6 text-center">
                <div className="w-24 h-24 bg-slate-900/80 rounded-full flex items-center justify-center mx-auto border border-slate-800 group-hover:border-orange-500/50 transition-colors duration-700">
                  <ImageIcon size={32} className="text-slate-700 group-hover:text-orange-500 transition-colors duration-700" />
                </div>
                <div>
                    <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em]">System_Idle</p>
                    <p className="text-slate-700 text-[9px] mt-2 uppercase tracking-widest">Awaiting Neural Commands</p>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="relative z-10 space-y-6 text-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
                    <Loader2 size={30} className="text-orange-500 animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-orange-500 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">Processing_{mode.toUpperCase()}_Protocol...</p>
              </div>
            ) : (
              <div className="relative z-10 space-y-8 w-full flex flex-col items-center animate-in fade-in zoom-in duration-700">
                <div className={`relative group shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-[1.02] ${
                    mode === 'pod_plate' ? 'rounded-full' : 'rounded-3xl'
                } overflow-hidden border-[12px] border-slate-900 bg-slate-900`}>
                    <img src={generatedImageUrl} alt="Preview" className="max-h-[500px] w-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                        <span className="text-[10px] font-black text-white tracking-[0.3em]">PREVIEW_READY</span>
                    </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-orange-500 hover:text-orange-500 transition-all text-slate-500 shadow-xl">
                    <Download size={20} />
                  </button>
                  <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all flex items-center gap-3">
                    <Printer size={18} /> Deploy to Production
                  </button>
                </div>
              </div>
            )}

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
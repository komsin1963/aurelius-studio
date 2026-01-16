'use client';

import React, { useEffect, useState } from 'react';
import { 
  Search, Filter, Image as ImageIcon, ArrowLeft, ShieldCheck, 
  ArrowRight, Fingerprint, Cpu, Loader2, Trash2, Download, X, Copy, Check
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { toast, Toaster } from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AssetVault() {
  const [assets, setAssets] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const fetchRealAssets = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('stories') 
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error && data) setAssets(data);
    setLoading(false);
  };

  useEffect(() => { fetchRealAssets(); }, []);

  // 📋 ฟังก์ชัน "Copy Prompt"
  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('PROMPT_COPIED_TO_NEURAL_LINK', {
      style: { background: '#000', color: '#22d3ee', border: '1px solid #22d3ee', fontSize: '10px' }
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AURELIUS_${fileName}.png`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('DOWNLOAD_COMPLETE');
    } catch (e) { toast.error('DOWNLOAD_FAILED'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('TERMINATE_DATA?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('stories').delete().eq('id', id);
    if (!error) {
      setAssets(prev => prev.filter(a => a.id !== id));
      toast.success('ERASED');
      if (selectedAsset?.id === id) setSelectedAsset(null);
    }
    setDeletingId(null);
  };

  return (
    <main className="fixed inset-0 bg-black text-white overflow-hidden font-sans">
      <Toaster position="bottom-right" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header ส่วนเดิมของคุณกมสิน */}
        <header className="h-16 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-all flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
              <ArrowLeft size={14} /> BACK_TO_HUB
            </Link>
            <h1 className="text-sm font-black italic uppercase tracking-[0.4em]">AURELIUS <span className="opacity-40 font-light">VAULT</span></h1>
          </div>
        </header>

        {/* Content List */}
        <main className="flex-1 flex flex-col items-center justify-start pt-16 px-6 overflow-y-auto">
          <div className="w-full max-w-2xl space-y-4 pb-32">
             {/* ส่วน Search และ List (ใช้โค้ดเดิมได้เลย) */}
             {filteredAssets.map((asset) => (
                <div key={asset.id} onClick={() => setSelectedAsset(asset)} className="group relative bg-[#08080a] border border-white/5 rounded-2xl p-4 hover:border-cyan-500/40 transition-all cursor-pointer">
                   {/* ... เนื้อหาใน List ... */}
                </div>
             ))}
          </div>
        </main>

        {/* --- FULL PREVIEW MODAL (เพิ่มปุ่ม Copy) --- */}
        {selectedAsset && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedAsset(null)} />
            
            <div className="relative w-full max-w-5xl bg-[#08080a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]">
              {/* Image Side */}
              <div className="flex-[2] bg-black flex items-center justify-center relative">
                <img src={selectedAsset.image_url} className="w-full h-full object-contain" alt="Preview" />
              </div>

              {/* Info Side */}
              <div className="flex-1 p-8 flex flex-col justify-between bg-[#0a0a0f] border-l border-white/5">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-500/60">IDENTITY_DECODED</span>
                    <button onClick={() => setSelectedAsset(null)} className="text-slate-600 hover:text-white"><X size={20} /></button>
                  </div>
                  
                  <div className="group relative">
                    <h2 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      GEN_PROMPT 
                      {/* 🛠️ ปุ่ม Copy Prompt */}
                      <button 
                        onClick={() => copyPrompt(selectedAsset.prompt)}
                        className="ml-2 p-1.5 rounded-md bg-white/5 hover:bg-cyan-500/20 text-cyan-500 transition-all border border-white/5"
                      >
                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    </h2>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                      <p className="text-xs font-bold text-slate-300 leading-relaxed italic uppercase">
                        "{selectedAsset.prompt}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-[8px] font-mono border-b border-white/5 pb-2">
                      <span className="text-slate-600 uppercase italic">Created_At</span>
                      <span className="text-slate-400">{new Date(selectedAsset.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-8">
                  <button onClick={() => downloadImage(selectedAsset.image_url, selectedAsset.id.slice(0,6))} className="w-full py-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all">SAVE_ARCHIVE</button>
                  <button onClick={() => handleDelete(selectedAsset.id)} className="w-full py-4 text-red-500/40 hover:text-red-500 text-[8px] font-black uppercase tracking-widest transition-all">TERMINATE_NODE</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="h-12 px-10 border-t border-white/5 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3 text-slate-600 text-[8px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> By komsin Intelligence • 2026
          </div>
        </footer>
      </div>
    </main>
  );
}
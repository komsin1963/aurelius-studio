'use client';
import { useState } from 'react';
import { Sparkles, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Studio5() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('ghibli');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, style, scale: 4 }),
      });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-6">
      {/* ส่วนหัว By Komsin */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black italic bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">AURELIUS STUDIO V</h1>
        <p className="text-[10px] tracking-[0.5em] text-slate-500 uppercase">BY KOMSIN</p>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
        <textarea 
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 mb-6"
          placeholder="Describe your imagination..."
        />
        
        {/* แสดงรูปที่เจนได้ */}
        {imageUrl && (
          <div className="mb-6 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
            <img src={imageUrl} className="w-full" alt="Result" />
          </div>
        )}

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-white text-black py-6 rounded-2xl font-black flex justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'PROCESSING...' : 'GENERATE ART'}
        </button>
      </div>
    </div>
  );
}
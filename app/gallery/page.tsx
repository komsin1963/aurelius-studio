'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Image as ImageIcon, Sparkles, User, ArrowLeft, Loader2, Heart, Share2, Check, Globe } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GlobalGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchGlobalArt();
  }, []);

  const fetchGlobalArt = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('usage_logs')
      .select('*')
      .not('image_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(40);
    
    if (!error && data) setItems(data);
    setLoading(false);
  };

  const handleLike = async (id: string, currentLikes: number) => {
    // อัปเดตยอด Like ใน Supabase
    const { error } = await supabase
      .from('usage_logs')
      .update({ likes: (currentLikes || 0) + 1 })
      .eq('id', id);

    if (!error) {
      // อัปเดตหน้าจอทันทีไม่ต้องรอโหลดใหม่
      setItems(items.map(item => item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item));
    }
  };

  const handleShare = (imageUrl: string, id: string) => {
    navigator.clipboard.writeText(imageUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-[10px] uppercase tracking-[0.4em]">
          <ArrowLeft size={16} /> กลับสู่แดชบอร์ด
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-fuchsia-500/20 rounded-lg shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                <Globe size={20} className="text-fuchsia-400" />
              </div>
              <span className="text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.5em]">AureliusX Global Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Gallery</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-4 italic">Social AI Showcase by Komsin Studio</p>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="animate-spin text-cyan-500" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Accessing Satellite Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-slate-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-fuchsia-500/50 transition-all duration-500 shadow-2xl">
                
                {/* Image Wrap */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt="AI Art" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* ปุ่ม Action ลอยบนภาพ */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-20 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => handleLike(item.id, item.likes)}
                    className="p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-red-500 hover:border-red-500 transition-all group/heart shadow-xl"
                  >
                    <Heart size={20} className={`${item.likes > 0 ? 'fill-red-500 text-red-500 group-hover/heart:text-white group-hover/heart:fill-white' : 'text-white'}`} />
                  </button>
                  <button 
                    onClick={() => handleShare(item.image_url, item.id)}
                    className="p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-cyan-500 hover:border-cyan-500 transition-all shadow-xl"
                  >
                    {copiedId === item.id ? <Check size={20} className="text-white" /> : <Share2 size={20} className="text-white" />}
                  </button>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-2 py-0.5 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded text-[8px] font-black text-fuchsia-400 uppercase tracking-widest">
                        {item.likes || 0} Likes
                      </div>
                      <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-1">
                        <Sparkles size={10} /> AI Masterpiece
                      </p>
                    </div>
                    
                    <h3 className="text-lg font-black italic leading-tight mb-4 line-clamp-2 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                      {item.details || 'Untitled Creation'}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-full border border-white/20 shadow-lg" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Creator ID: {item.user_id?.slice(0,5) || 'Guest'}</span>
                      </div>
                      <span className="text-[8px] font-black text-slate-600 uppercase italic">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-24 pb-12 text-center border-t border-white/5 pt-12">
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[1em] mb-2">Aurelius Studio Hub</p>
          <p className="text-[8px] font-bold text-slate-800 uppercase tracking-[0.5em]">By Komsin Hub • Registered at komsin.com</p>
        </div>

      </div>
    </div>
  );
}
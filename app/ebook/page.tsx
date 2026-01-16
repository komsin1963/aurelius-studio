'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Book, Lock, Unlock, Zap, ShoppingCart, Loader2, ShieldCheck, ExternalLink } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EbookStore() {
  const [books, setBooks] = useState<any[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadStoreData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // ดึงข้อมูลหนังสือ, เครดิตผู้ใช้ และรายการที่ปลดล็อกแล้ว
      const [booksRes, profileRes, unlockedRes] = await Promise.all([
        supabase.from('ebooks').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('credits').eq('id', user.id).single(),
        supabase.from('unlocked_ebooks').select('ebook_id').eq('user_id', user.id)
      ]);

      if (booksRes.data) setBooks(booksRes.data);
      if (profileRes.data) setUserCredits(profileRes.data.credits);
      if (unlockedRes.data) setUnlockedIds(unlockedRes.data.map(i => i.ebook_id));
    } catch (error) {
      console.error('Error loading store:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStoreData(); }, []);

  const handlePurchase = async (book: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return toast.error('IDENTIFICATION REQUIRED');

    const loadingToast = toast.loading('PROCESSING NEURAL TRANSACTION...');

    try {
      // 1. เรียกใช้ RPC ตัดแต้ม XP จริง
      const { error: txError } = await supabase.rpc('deduct_xp_for_purchase', {
        user_id_input: user.id,
        amount_to_deduct: book.price
      });

      if (txError) {
        toast.dismiss(loadingToast);
        return toast.error(txError.message);
      }

      // 2. บันทึกการปลดล็อก
      const { error: unlockError } = await supabase
        .from('unlocked_ebooks')
        .insert({ user_id: user.id, ebook_id: book.id });

      if (unlockError) throw unlockError;

      toast.dismiss(loadingToast);
      toast.success(`ASSET SECURED: ${book.title}`);
      loadStoreData(); 
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error('TRANSACTION FAILED');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-cyan-500 animate-spin" size={40} />
      <p className="text-cyan-500 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Knowledge Vault...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8 md:p-16 lg:ml-64 transition-all">
      <Toaster position="bottom-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-cyan-500" size={18} />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Aurelius Digital Assets</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
              Knowledge <span className="text-cyan-500">Vault</span>
            </h1>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] min-w-[200px] backdrop-blur-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Your Neural Power</p>
            <p className="text-3xl font-black italic text-cyan-500 flex items-center gap-2">
              <Zap size={20} fill="currentColor" />
              {userCredits.toLocaleString()} <span className="text-xs text-white/50 font-normal">XP</span>
            </p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => {
            const isUnlocked = unlockedIds.includes(book.id);
            return (
              <div key={book.id} className="group relative flex flex-col bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                
                {/* Book Cover */}
                <div className="relative aspect-[3/4] mb-8 rounded-2xl overflow-hidden border border-white/5 shadow-inner bg-black/40">
                  <img 
                    src={book.cover_url || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=500'} 
                    className={`w-full h-full object-cover transition-all duration-700 ${!isUnlocked ? 'grayscale blur-[2px] opacity-40' : 'group-hover:scale-110 opacity-80'}`} 
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                        <Lock className="text-white/40" size={32} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-black uppercase italic mb-3 tracking-tight group-hover:text-cyan-500 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase leading-relaxed mb-8 line-clamp-3">
                    {book.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {isUnlocked ? (
                    <Link 
                      href={`/ebook/read/${book.id}`}
                      className="w-full bg-cyan-500/10 text-cyan-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    >
                      <Unlock size={16} /> Open Knowledge Asset
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handlePurchase(book)}
                      className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                    >
                      <Zap size={16} fill="currentColor" /> Unlock for {book.price} XP
                    </button>
                  )}

                  {/* Affiliate Link Button - ปรากฏเฉพาะเมื่อมีลิงก์เท่านั้น */}
                  {book.affiliate_url && (
                    <a 
                      href={book.affiliate_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white/[0.03] border border-white/5 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[9px] flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all group/aff shadow-sm"
                    >
                      <ShoppingCart size={14} className="group-hover/aff:text-cyan-500" /> 
                      Get Physical Copy
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <footer className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 italic">
            By komsin intelligence • Official Affiliate Partner
          </p>
        </footer>
      </div>
    </div>
  );
}
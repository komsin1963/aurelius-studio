'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Play, Lock, Zap, BookOpen, LayoutGrid, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AcademyLibrary() {
  const [videos, setVideos] = useState<any[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadAcademyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. ดึงข้อมูลวิดีโอ, เครดิตผู้ใช้ และรายการที่ปลดล็อกแล้วพร้อมกัน
      const [videosRes, profileRes, unlockedRes] = await Promise.all([
        supabase.from('videos').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('credits').eq('id', user.id).single(),
        supabase.from('unlocked_videos').select('video_id').eq('user_id', user.id)
      ]);

      if (videosRes.data) setVideos(videosRes.data);
      if (profileRes.data) setUserCredits(profileRes.data.credits);
      if (unlockedRes.data) setUnlockedIds(unlockedRes.data.map(i => i.video_id));
    } catch (error) {
      console.error('Error loading academy:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAcademyData(); }, []);

  const handlePurchase = async (video: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return toast.error('IDENTIFICATION REQUIRED');

    const loadingToast = toast.loading('INITIATING NEURAL TRAINING LINK...');

    try {
      // 1. เรียกใช้ RPC ตัดแต้ม XP ในฐานข้อมูล
      const { error: txError } = await supabase.rpc('deduct_xp_for_purchase', {
        user_id_input: user.id,
        amount_to_deduct: video.price
      });

      if (txError) {
        toast.dismiss(loadingToast);
        return toast.error(txError.message); // โชว์ "INSUFFICIENT NEURAL POWER" ถ้าแต้มไม่พอ
      }

      // 2. บันทึกการปลดล็อกสิทธิ์เข้าชมวิดีโอ
      const { error: unlockError } = await supabase
        .from('unlocked_videos')
        .insert({ user_id: user.id, video_id: video.id });

      if (unlockError) throw unlockError;

      toast.dismiss(loadingToast);
      toast.success(`COURSE UNLOCKED: ${video.title}`, {
        icon: '🎬',
        style: { borderRadius: '15px', background: '#050508', color: '#fff', border: '1px solid #06b6d4' }
      });
      
      loadAcademyData(); // รีโหลดข้อมูลเพื่อเปลี่ยนปุ่มเป็น Play
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error('TRANSACTION FAILED');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-cyan-500 animate-spin" size={40} />
      <p className="text-cyan-500 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Neural Academy...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8 md:p-12 lg:ml-64 transition-all">
      <Toaster position="bottom-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-cyan-500" size={20} />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Knowledge Repository</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              Neural <span className="text-cyan-500">Academy</span>
            </h1>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] min-w-[180px] backdrop-blur-xl">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Your Power Status</p>
            <p className="text-2xl font-black italic text-cyan-500 flex items-center gap-2">
              <Zap size={18} fill="currentColor" />
              {userCredits.toLocaleString()} <span className="text-[10px] text-white/50">XP</span>
            </p>
          </div>
        </header>

        {/* Video Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const isUnlocked = unlockedIds.includes(video.id);
            return (
              <div key={video.id} className="group bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col shadow-2xl">
                
                {/* Thumbnail Area */}
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail_url || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500'} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isUnlocked ? 'group-hover:scale-105 opacity-80' : 'grayscale opacity-30'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent opacity-80" />
                  
                  {isUnlocked ? (
                    <Link href={`/academy/${video.id}`} className="absolute inset-0 flex items-center justify-center group/play">
                      <div className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover/play:scale-110 transition-transform">
                        <Play fill="black" size={20} className="ml-1" />
                      </div>
                    </Link>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                        <Lock size={20} className="text-white/40" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-black italic uppercase mb-3 tracking-tight group-hover:text-cyan-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-slate-500 text-[11px] font-bold uppercase leading-relaxed line-clamp-2 mb-8 flex-grow">
                    {video.description}
                  </p>
                  
                  {isUnlocked ? (
                    <Link 
                      href={`/academy/${video.id}`} 
                      className="w-full bg-cyan-500/10 text-cyan-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <BookOpen size={14} /> Resume Lesson
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handlePurchase(video)}
                      className="w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-500 transition-all"
                    >
                      <Zap size={14} fill="currentColor" /> Unlock for {video.price} XP
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Brand */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 italic">
            Aurelius Academy Protocol • By komsin intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
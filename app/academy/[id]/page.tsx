'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Play, ShieldCheck, Lock, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function VideoPlayer({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVideoAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setHasAccess(false);

      // ตรวจสอบสิทธิ์การเข้าถึงจากตาราง unlocked_videos
      const { data: access } = await supabase
        .from('unlocked_videos')
        .select('*')
        .eq('user_id', user.id)
        .eq('video_id', params.id)
        .single();

      if (access) {
        const { data: videoData } = await supabase.from('videos').select('*').eq('id', params.id).single();
        setVideo(videoData);
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    };
    checkVideoAccess();
  }, [params.id]);

  if (hasAccess === null) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-black animate-pulse">ESTABLISHING NEURAL LINK...</div>;

  if (hasAccess === false) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
        <Lock size={40} className="text-red-500" />
      </div>
      <h1 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tighter">Encrypted Content</h1>
      <p className="text-slate-500 mb-8 max-w-sm font-medium">ชุดวิดีโอนี้ถูกเข้ารหัสไว้สำหรับผู้ที่มีสิทธิ์เข้าถึงเท่านั้น โปรดใช้ XP เพื่อปลดล็อกใน Academy Store</p>
      <Link href="/academy" className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase italic hover:bg-cyan-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        Back to Academy
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/academy" className="text-slate-500 hover:text-cyan-500 flex items-center gap-2 mb-8 uppercase text-[10px] font-black tracking-[0.3em] transition-all">
          <ArrowLeft size={14} /> Return to Academy
        </Link>

        {/* --- VIDEO PLAYER CONTAINER --- */}
        <div className="relative aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-10 group">
          <iframe 
            src={video?.video_url} 
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* --- INFO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} /> Secure Connection Established
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">{video?.title}</h1>
            <p className="text-slate-400 leading-relaxed font-medium text-lg border-l-2 border-white/10 pl-6">{video?.description}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 h-fit">
            <h3 className="font-black uppercase italic mb-6 flex items-center gap-2 text-sm tracking-widest">
              <Info size={18} className="text-cyan-500" /> Lesson Specs
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase">Status</span>
                <span className="text-[10px] font-black text-green-500 uppercase italic">Unlocked</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase">Provider</span>
                <span className="text-[10px] font-black text-white uppercase italic">Komsin Intelligence</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase">Asset ID</span>
                <span className="text-[10px] font-black text-slate-500 uppercase truncate ml-4 max-w-[100px]">{video?.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
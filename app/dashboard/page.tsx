'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BookOpen, PlayCircle, Zap, ShieldCheck, ArrowUpRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function UserDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [unlockedEbooks, setUnlockedEbooks] = useState<any[]>([]);
  const [unlockedVideos, setUnlockedVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // ดึงข้อมูลโปรไฟล์และสินทรัพย์ที่ปลดล็อกแล้ว
      const [profileRes, ebooksRes, videosRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('unlocked_ebooks').select('ebooks(*)').eq('user_id', user.id).limit(3),
        supabase.from('unlocked_videos').select('videos(*)').eq('user_id', user.id).limit(3)
      ]);

      setProfile(profileRes.data);
      if (ebooksRes.data) setUnlockedEbooks(ebooksRes.data.map(i => i.ebooks));
      if (videosRes.data) setUnlockedVideos(videosRes.data.map(i => i.videos));
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#050508] flex items-center justify-center text-cyan-500 font-black animate-pulse">SYNCING NEURAL LINK...</div>;

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8 md:p-12 lg:ml-64">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Welcome back */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-cyan-500" size={18} />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Citizen Status: Authorized</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            Welcome, <span className="text-cyan-500">{profile?.display_name || 'Citizen'}</span>
          </h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-cyan-500/50 transition-all">
            <Zap className="text-cyan-500 mb-4" size={32} fill="currentColor" />
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Available Power</p>
              <p className="text-4xl font-black italic">{profile?.credits?.toLocaleString()} <span className="text-sm">XP</span></p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-cyan-500/50 transition-all">
            <BookOpen className="text-white/40 mb-4 group-hover:text-white transition-colors" size={32} />
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">E-books Unlocked</p>
              <p className="text-4xl font-black italic">{unlockedEbooks.length}</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-cyan-500/50 transition-all">
            <PlayCircle className="text-white/40 mb-4 group-hover:text-white transition-colors" size={32} />
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Academy Courses</p>
              <p className="text-4xl font-black italic">{unlockedVideos.length}</p>
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Recent E-books */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <h2 className="text-xl font-black italic uppercase tracking-widest">Recent Knowledge Assets</h2>
              <Link href="/ebook" className="text-[10px] font-black text-cyan-500 uppercase hover:underline">Vault Store</Link>
            </div>
            <div className="space-y-4">
              {unlockedEbooks.length > 0 ? unlockedEbooks.map((book) => (
                <Link key={book.id} href={`/ebook/read/${book.id}`} className="flex items-center gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={book.cover_url} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-black uppercase italic text-sm group-hover:text-cyan-500 transition-colors">{book.title}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Unlocked • Read Now</p>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
                </Link>
              )) : (
                <p className="text-slate-600 italic text-sm font-bold uppercase py-10">No assets unlocked yet.</p>
              )}
            </div>
          </div>

          {/* Recent Videos */}
          <div>
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <h2 className="text-xl font-black italic uppercase tracking-widest">Neural Training</h2>
              <Link href="/academy" className="text-[10px] font-black text-cyan-500 uppercase hover:underline">Academy Store</Link>
            </div>
            <div className="space-y-4">
              {unlockedVideos.length > 0 ? unlockedVideos.map((video) => (
                <Link key={video.id} href={`/academy/${video.id}`} className="flex items-center gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-black/40 relative">
                    <img src={video.thumbnail_url} className="w-full h-full object-cover opacity-60" />
                    <PlayCircle className="absolute inset-0 m-auto text-white/40 group-hover:text-cyan-500" size={24} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-black uppercase italic text-sm group-hover:text-cyan-500 transition-colors">{video.title}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">Ready to Stream</p>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
                </Link>
              )) : (
                <p className="text-slate-600 italic text-sm font-bold uppercase py-10">No courses started yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Tag */}
        <footer className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 italic">
            Aurelius Protocol Powered by Komsin Intelligence
          </p>
        </footer>
      </div>
    </div>
  );
}
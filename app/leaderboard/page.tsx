'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trophy, Medal, Crown, ArrowLeft, Zap, User } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LeaderboardPage() {
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // ดึงข้อมูล 10 อันดับแรกที่มี credits (XP) สูงสุด
      const { data, error } = await supabase
        .from('profiles')
        .select('id, credits')
        .order('credits', { ascending: false })
        .limit(10);

      if (data) setTopUsers(data);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  // ฟังก์ชันแสดงไอคอนตามลำดับ
  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="text-yellow-400 fill-yellow-400" size={24} />;
    if (index === 1) return <Medal className="text-slate-300 fill-slate-300" size={24} />;
    if (index === 2) return <Medal className="text-amber-600 fill-amber-600" size={24} />;
    return <span className="text-slate-500 font-black italic">{index + 1}</span>;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="text-cyan-500 font-black uppercase tracking-[0.4em] animate-pulse">Syncing Leaderboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/5 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Link href="/dashboard" className="inline-flex items-center gap-3 text-slate-500 hover:text-cyan-500 mb-12 transition-all font-black text-[10px] uppercase tracking-widest group">
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-cyan-500/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Trophy className="text-cyan-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Elite Citizens Rankings</span>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter italic">
            Top <span className="text-cyan-500 underline decoration-white/10 underline-offset-8">Leaders</span>
          </h1>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div 
              key={user.id}
              className={`group flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all duration-500 ${
                index === 0 
                ? 'bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-500/30' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Rank Icon */}
              <div className="w-12 h-12 flex items-center justify-center">
                {getRankIcon(index)}
              </div>

              {/* Citizen Identity */}
              <div className="flex-1 flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <User size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Citizen ID</p>
                  <p className="text-lg font-black italic uppercase text-white tracking-tight">
                    #{user.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* XP Score */}
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Neural Power</p>
                <div className="flex items-center gap-2 justify-end text-xl font-black italic text-cyan-500">
                  <Zap size={18} className="fill-cyan-500" />
                  {user.credits?.toLocaleString()} <span className="text-xs text-slate-600 not-italic ml-1">XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 opacity-30">
          <p className="text-[9px] font-black tracking-[0.8em] text-slate-500 uppercase italic">
            By Komsin Intelligence • Aurelius Ranking Engine
          </p>
        </footer>
      </div>
    </div>
  );
}
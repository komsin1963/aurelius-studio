'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, History, LayoutDashboard, Crown, ArrowUpRight, User, Settings } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // ดึงข้อมูล User ปัจจุบัน
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // ดึงข้อมูลเครดิตจากตาราง profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileData) setProfile(profileData);

        // ดึงประวัติการใช้งานเฉพาะของ User คนนี้
        const { data: logData } = await supabase
          .from('usage_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        if (logData) setLogs(logData);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              Aurelius<span className="text-cyan-500">X</span> Bulletin
            </h1>
            <p className="text-slate-500 text-[10px] tracking-[0.5em] font-bold mt-2 italic uppercase">System Controller by Komsin</p>
          </div>

          {/* ปุ่ม Profile & Settings ที่เพิ่มใหม่ */}
          <div className="flex items-center gap-3">
            <Link href="/profile" className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-5 py-2 rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-full flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform">
                <User size={18} className="text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Authorized User</p>
                <p className="text-[10px] font-black text-white uppercase italic tracking-tighter">View Profile</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: WALLET & PLAN --- */}
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={80} className="text-yellow-400" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-yellow-400/20 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                    <Zap size={16} className="text-yellow-400" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">X-Wallet Balance</span>
                </div>
                
                <div className="mb-8">
                  <p className="text-7xl font-black italic tracking-tighter text-white">
                    {profile?.credits ?? '0'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Free Credits Remaining</p>
                </div>

                <Link href="/profile" className="w-full py-4 rounded-2xl bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  Top Up Credits <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-fuchsia-600/10 to-transparent border border-white/5 p-8 rounded-[3rem] backdrop-blur-md">
               <Crown className="text-fuchsia-500 mb-4" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">Membership Status</p>
               <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-tighter italic">
                 {profile?.is_pro ? 'PRO MEMBER' : 'FREE ACCOUNT'}
               </p>
            </div>
          </div>

          {/* --- RIGHT: RECENT ACTIVITY LOGS --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4 px-4">
              <div className="flex items-center gap-2">
                <History size={16} className="text-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personal Activity Logs</span>
              </div>
              <span className="text-[9px] font-bold text-slate-600 uppercase italic">Real-time Tracking</span>
            </div>
            
            {logs.length > 0 ? logs.map((log) => (
              <div key={log.id} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white/[0.08] transition-all group backdrop-blur-sm">
                <div className="flex items-center gap-5">
                  {log.image_url ? (
                    <div className="relative">
                       <img src={log.image_url} className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" />
                       <div className="absolute -bottom-1 -right-1 bg-cyan-500 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center">
                          <Zap size={8} className="text-black" />
                       </div>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center italic text-[10px] border border-white/5">AI</div>
                  )}
                  <div>
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{log.action_type}</p>
                    <p className="text-xs text-slate-300 mt-1 font-bold line-clamp-1">{log.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-tighter">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )) : (
              <div className="bg-white/5 border border-dashed border-white/10 p-12 rounded-[2rem] text-center">
                <p className="text-xs text-slate-600 font-black uppercase tracking-widest">No Recent Activity Found</p>
              </div>
            )}
          </div>

        </div>

        {/* --- FOOTER TRADEMARK --- */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
           <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.8em]">Aurelius Studio By Komsin Intelligence</p>
        </div>

      </div>
    </div>
  );
}
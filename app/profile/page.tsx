'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Zap, Award, Star, ArrowLeft, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast'; 
import { checkAndAwardBadges } from '@/utils/badge-system';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return router.push('/login');
      setUser(authUser);

      // 🎖️ เช็ค Badge อัตโนมัติ และแจ้งเตือน
      const newBadges = await checkAndAwardBadges(authUser.id);
      if (newBadges && newBadges.length > 0) {
        toast.success(`NEW NEURAL BADGE UNLOCKED: ${newBadges.length} Items`, {
          icon: '🏆',
          style: { 
            border: '1px solid #eab308', 
            color: '#eab308',
            background: '#0b0b12',
            fontSize: '10px',
            fontWeight: '900'
          }
        });
      }

      const { data: prof } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
      setProfile(prof);

      const { data: badges } = await supabase.from('user_badges').select('*, badges(*)').eq('user_id', authUser.id);
      if (badges) setUserBadges(badges);
    };
    getData();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050508] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* --- ปุ่ม Back to Hub เชื่อมไปหน้าแรก --- */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 mb-10 font-black text-[10px] uppercase tracking-[0.3em] transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
        </Link>

        {/* Digital ID Card */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 mb-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] -z-10" />
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-600 p-1 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User size={48} className="text-cyan-500/40" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <span className="px-2 py-0.5 bg-cyan-500 text-black text-[8px] font-black uppercase tracking-widest rounded">Active Citizen</span>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                  #{user?.id.slice(0, 5).toUpperCase()}
                </h2>
              </div>
              
              <p className="text-slate-500 text-[10px] font-black tracking-widest mb-6 italic uppercase underline decoration-cyan-500/30 decoration-2 underline-offset-8">
                {user?.email}
              </p>
              
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 font-black text-xs uppercase tracking-widest flex items-center gap-3">
                  <Zap size={16} className="text-yellow-500 fill-yellow-500" /> 
                  <span className="text-white">{profile?.credits || 0}</span>
                  <span className="text-slate-500 text-[9px]">Neural XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-[#0b0b12] border border-white/5 rounded-[3rem] p-10 mb-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3 italic">
              <Award className="text-cyan-500" size={16} /> Neural Achievement Record
            </h3>
            <span className="text-[9px] font-bold text-slate-700 uppercase">Unlocks: {userBadges.length}</span>
          </div>

          {userBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {userBadges.map((ub: any) => (
                <div key={ub.badge_id} className="group bg-white/5 border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-center text-center hover:border-cyan-500/50 transition-all">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Star size={24} className="text-cyan-500 fill-cyan-500/20" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-white mb-1 leading-tight">{ub.badges?.title}</p>
                  <p className="text-[8px] font-bold text-slate-500 uppercase italic leading-tight">{ub.badges?.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center border border-dashed border-white/10 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">No achievements unlocked yet.</p>
            </div>
          )}
        </div>

        {/* Logout Action */}
        <button 
          onClick={async () => { 
            await supabase.auth.signOut(); 
            router.push('/login'); 
            toast('Neural Session Terminated', { icon: '🔒', style: { background: '#000', color: '#ff4b4b', fontSize: '10px', fontWeight: '900' } }); 
          }}
          className="w-full py-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 text-red-500 font-black uppercase tracking-[0.5em] text-[12px] hover:bg-red-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" /> Terminate Link
        </button>

      </div>
    </div>
  );
}
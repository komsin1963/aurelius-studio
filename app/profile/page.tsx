'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User, Zap, LogOut, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfileSettings() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);
    };
    getData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto mt-10">
        
        {/* Navigation */}
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-[10px] uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center gap-6 mb-12 bg-white/5 p-8 rounded-[3rem] border border-white/5">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-fuchsia-600 rounded-full flex items-center justify-center border-4 border-black shadow-2xl">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Member <span className="text-cyan-500">Profile</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">AureliusX ID: {user.id.slice(0, 8)}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 mb-8">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <Mail className="text-slate-500" size={20} />
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                <p className="font-bold text-sm mt-1">{user.email}</p>
              </div>
            </div>
            <div className="bg-green-500/10 text-green-500 text-[9px] font-black px-3 py-1 rounded-full border border-green-500/20 uppercase">Verified</div>
          </div>

          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <Zap className="text-yellow-400" size={20} />
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aurelius Credit Balance</p>
                <p className="font-black text-3xl italic mt-1">{profile?.credits || 0} <span className="text-xs font-normal text-slate-500 not-italic">XP</span></p>
              </div>
            </div>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Top Up</button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 py-6 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-red-500 hover:text-white transition-all duration-500"
          >
            <LogOut size={18} /> Exit System (Sign Out)
          </button>
          <p className="text-center mt-8 text-[9px] font-black tracking-[0.4em] text-slate-700 uppercase italic">
            AureliusX Security Engine by Komsin
          </p>
        </div>

      </div>
    </div>
  );
}
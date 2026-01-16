'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      // ถ้าไม่มี User ให้ลองสมัครใหม่ (Simple Flow)
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) alert(signUpError.message);
      else alert('Check your email for the confirmation link!');
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap size={60} className="text-cyan-500" />
        </div>

        <div className="relative z-10 text-center mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            Aurelius<span className="text-cyan-500 text-5xl">X</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Secure Access Point</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-5 text-slate-500" size={18} />
              <input 
                type="email" required
                className="w-full bg-black/50 border border-white/10 p-5 pl-14 rounded-3xl outline-none focus:border-cyan-500 transition-all text-sm"
                placeholder="name@company.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-5 text-slate-500" size={18} />
              <input 
                type="password" required
                className="w-full bg-black/50 border border-white/10 p-5 pl-14 rounded-3xl outline-none focus:border-cyan-500 transition-all text-sm"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-white text-black py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all flex items-center justify-center gap-3 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Access System <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center mt-10 text-[9px] text-slate-600 font-black uppercase tracking-widest">
          By Komsin Hub Authentication v1.2
        </p>
      </div>
    </div>
  );
}
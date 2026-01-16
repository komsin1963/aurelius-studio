'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

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
      toast.error(error.message.toUpperCase());
    } else {
      toast.success('NEURAL LINK ESTABLISHED');
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
             <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black italic text-black text-2xl group-hover:rotate-12 transition-transform">A</div>
             <span className="font-black tracking-[0.4em] text-[10px] uppercase text-slate-500">AureliusX Core</span>
          </Link>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Initialize <span className="text-cyan-500">Access</span></h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mt-2 italic underline decoration-cyan-500/20 underline-offset-4">Security Protocol Level 4</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
            <input 
              type="email" 
              placeholder="NEURAL EMAIL" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 font-black text-[11px] uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-5 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="ACCESS KEY" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 font-black text-[11px] uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white hover:bg-cyan-500 text-black py-5 rounded-2xl font-black uppercase italic tracking-tighter transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>ESTABLISH LINK <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/auth-register" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-500 transition-colors">
            New Citizen? <span className="text-white underline underline-offset-4 decoration-cyan-500/50">Request Identity Record</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'; // เชื่อม Supabase ตรงๆ
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = 'https://sriunfblgxorzzvmpmf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // ใช้ Key ของคุณ
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.signUp({ email, password });
    alert('ลงทะเบียนสำเร็จ! ตรวจสอบ Email ของคุณ');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 text-white">
      <div className="max-w-md w-full bg-slate-900/40 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-2xl">
        <Link href="/dashboard" className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-8 hover:text-white">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-10">Join Member</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" placeholder="EMAIL" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-xs outline-none focus:border-cyan-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="PASSWORD" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-xs outline-none focus:border-cyan-500" onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-cyan-400 transition-all flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={18} />} Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
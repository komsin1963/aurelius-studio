'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams, useRouter } from 'next/navigation';
import { Zap, Mail, Lock, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref'); // ดึงรหัสแนะนำจาก URL

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. สมัครสมาชิกในระบบ Auth ของ Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        let initialCredits = 10; // เครดิตเริ่มต้นสำหรับคนสมัครทั่วไป
        let referrerId = null;

        // 2. ตรวจสอบระบบแนะนำเพื่อน (Referral Logic)
        if (refCode) {
          const { data: referrer, error: refError } = await supabase
            .from('profiles')
            .select('id, credits')
            .eq('ref_code', refCode)
            .single();

          if (referrer && !refError) {
            referrerId = referrer.id;
            initialCredits = 20; // เพื่อนที่สมัครผ่านลิงก์ได้เครดิตเพิ่มเป็น 20 XP

            // ให้รางวัลคนแนะนำ (+50 XP)
            await supabase
              .from('profiles')
              .update({ credits: (referrer.credits || 0) + 50 })
              .eq('id', referrer.id);
            
            // บันทึก Log การแนะนำ (ถ้าคุณมีตาราง logs)
            console.log(`Referral reward sent to: ${referrer.id}`);
          }
        }

        // 3. อัปเดตข้อมูล Profile ของ User ใหม่
        // หมายเหตุ: ปกติ Supabase จะมี Trigger สร้าง Profile ให้อัตโนมัติ 
        // เราจึงใช้การ Update ข้อมูลที่จำเป็นลงไป
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            referred_by: referrerId,
            credits: initialCredits
          })
          .eq('id', authData.user.id);

        if (profileError) console.error("Profile Update Error:", profileError);

        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        
        {/* LOGO SECTION */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-fuchsia-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Join <span className="text-cyan-500">Aurelius</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">New Citizen Registration</p>
        </div>

        {/* REGISTRATION FORM */}
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Badge แสดงสถานะ Referral */}
          {refCode && (
            <div className="absolute top-0 right-10 bg-cyan-500 text-black px-4 py-1 rounded-b-xl text-[8px] font-black uppercase tracking-widest animate-bounce">
              Referral Active +20 XP
            </div>
          )}

          {success ? (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-xl font-black uppercase italic mb-2">Welcome Aboard!</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Initialising Neural Link...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-500 text-[10px] font-bold uppercase text-center">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Neural Identity (Email)</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Access Key (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-white text-black py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <><Zap size={16} /> Ignite Access</>}
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Already a citizen? <Link href="/login" className="text-cyan-500 hover:text-white transition-colors">Authorize Here</Link>
        </p>

        <div className="mt-12 text-center">
          <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.8em]">Aurelius Studio • By Komsin</p>
        </div>

      </div>
    </div>
  );
}
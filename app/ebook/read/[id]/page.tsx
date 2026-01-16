'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EbookReader({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setHasAccess(false);

      // ตรวจสอบว่าในตาราง unlocked_ebooks มีรายการซื้อนี้หรือไม่
      const { data: access } = await supabase
        .from('unlocked_ebooks')
        .select('*')
        .eq('user_id', user.id)
        .eq('ebook_id', params.id)
        .single();

      if (access) {
        const { data: bookData } = await supabase.from('ebooks').select('*').eq('id', params.id).single();
        setBook(bookData);
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    };
    checkAccess();
  }, [params.id]);

  if (hasAccess === null) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-black animate-pulse">VERIFYING ACCESS...</div>;

  if (hasAccess === false) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center">
      <Lock size={64} className="text-red-500 mb-6" />
      <h1 className="text-3xl font-black uppercase italic text-white mb-4">Access Denied</h1>
      <p className="text-slate-500 mb-8 max-w-md">คุณยังไม่ได้ปลดล็อกสินทรัพย์ความรู้นี้ โปรดใช้พลังงาน XP ของคุณเพื่อเข้าถึงเนื้อหาใน Store</p>
      <Link href="/ebook" className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase italic">Go to Store</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/ebook" className="text-slate-500 hover:text-cyan-500 flex items-center gap-2 mb-12 uppercase text-[10px] font-black tracking-widest transition-colors">
          <ArrowLeft size={14} /> Back to Library
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-cyan-500" size={20} />
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Authorized Access Granted</span>
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-8">{book?.title}</h1>
        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12 min-h-[600px] leading-relaxed text-slate-300">
           {/* พื้นที่สำหรับแสดงเนื้อหา หรือฝัง PDF */}
           <p className="text-xl italic font-serif">เนื้อหาของหนังสือ "{book?.title}" กำลังถูกดึงข้อมูลจาก Neural Network...</p>
           <div className="mt-12 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-1/3 animate-[loading_2s_ease-in-out_infinite]"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
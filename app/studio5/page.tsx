'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sparkles, Loader2, Zap, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function StudioPage() {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  // 1. ดึงข้อมูล User และ เครดิตปัจจุบัน
  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single();
        if (profile) setCredits(profile.credits);
      }
    };
    getUserData();
  }, []);

  // 2. ฟังก์ชันหลัก: หักเครดิต และ บันทึกลง Gallery
  const handleGenerate = async () => {
    if (credits <= 0) {
      alert("เครดิตหมดแล้ว! กรุณาเติมเงินที่หน้า Top Up");
      return;
    }

    setLoading(true);

    try {
      // --- ส่วนนี้คือที่ที่ AI จะทำงาน (ตัวอย่างจำลองรูปภาพ) ---
      // ในงานจริง คุณกมสินจะเรียก API เจนรูปตรงนี้
      const mockImageUrl = `https://api.aureliusx.com/v1/generate?p=${encodeURIComponent(prompt)}`; 
      
      // A. หักเครดิตในตาราง profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: credits - 1 })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // B. บันทึกลง usage_logs เพื่อให้ไปโผล่หน้า Gallery รวม
      const { error: logError } = await supabase
        .from('usage_logs')
        .insert([{
          user_id: user.id,
          prompt: prompt,
          image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000", // เปลี่ยนเป็น URL รูปจริงที่เจนได้
          details: prompt || "Aurelius Masterpiece",
          type: 'image_generation'
        }]);

      if (logError) throw logError;

      // C. อัปเดตยอดเครดิตบนหน้าจอ
      setCredits(prev => prev - 1);
      alert("สร้างผลงานสำเร็จ! หัก 1 เครดิต และส่งเข้า Gallery แล้ว");

    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการหักเครดิต");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Credit Display */}
        <div className="flex justify-between items-center mb-12 bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Available Power</p>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-black italic">{credits} <span className="text-xs not-italic text-slate-500">XP</span></span>
            </div>
          </div>
          <Link href="/topup" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            Recharge
          </Link>
        </div>

        {/* Studio Input */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Creation <span className="text-cyan-500">Studio</span></h1>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="บรรยายภาพที่คุณต้องการสร้าง..."
            className="w-full h-40 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-lg focus:outline-none focus:border-cyan-500 transition-all shadow-2xl"
          />
          
          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-6 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Generate Masterpiece</>}
          </button>
        </div>

        {/* Warning */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-600">
          <AlertCircle size={14} />
          <p className="text-[9px] font-bold uppercase tracking-widest">การสร้างงาน 1 ครั้ง ใช้ 1 XP Credit</p>
        </div>

      </div>
    </div>
  );
}
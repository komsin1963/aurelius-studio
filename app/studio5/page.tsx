'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sparkles, Loader2, Zap, LayoutGrid, ArrowUpRight, ShieldCheck, Cpu, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

// 1. ตั้งค่าการเชื่อมต่อ Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Studio5Page() {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState('');
  const [recentWorks, setRecentWorks] = useState<any[]>([]);

  // 2. ฟังก์ชันดึงข้อมูลผู้ใช้ เครดิต และประวัติงานล่าสุด
  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();
      if (profile) setCredits(profile.credits);
      fetchRecentWorks(user.id);
    }
  };

  const fetchRecentWorks = async (userId: string) => {
    const { data, error } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(4);
    if (!error) setRecentWorks(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // 3. ฟังก์ชันการหักเครดิต และส่งผลงานเข้า Gallery อัตโนมัติ
  const handleGenerate = async () => {
    if (credits <= 0) {
      alert("เครดิตของคุณหมดแล้ว กรุณาเติมเงินเพื่อใช้งานต่อ");
      return;
    }

    setLoading(true);
    try {
      // จำลอง URL รูปภาพ (แทนที่ด้วย AI API ของคุณ)
      const generatedUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000"; 

      // หักเครดิตในฐานข้อมูล
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: credits - 1 })
        .eq('id', user.id);
      
      if (updateError) throw updateError;

      // บันทึกลงตาราง usage_logs
      await supabase.from('usage_logs').insert([{
        user_id: user.id,
        prompt: prompt,
        image_url: generatedUrl,
        details: "Aurelius Studio 5 Engine",
        likes: 0
      }]);

      setCredits(prev => prev - 1);
      setResultImage(generatedUrl);
      fetchRecentWorks(user.id);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Credit Display */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">
              Studio <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">5</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Neural Engine v5.0 Active</p>
          </div>

          <div className="bg-[#0b0b12] p-6 rounded-[2rem] flex items-center gap-6 border border-white/5">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Power XP</span>
              <span className="text-3xl font-black italic">{credits}</span>
            </div>
            <Link href="/topup" className="p-4 bg-cyan-500 text-black rounded-xl hover:bg-white transition-all">
              <Zap size={18} className="fill-current" />
            </Link>
          </div>
        </div>

        {/* Main Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-7 space-y-8">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="พิมพ์จินตนาการของคุณ..."
              className="w-full h-72 bg-[#0b0b12] border border-white/10 rounded-[3rem] p-10 text-xl focus:border-cyan-500/50 transition-all resize-none"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-cyan-500 transition-all disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Ignite Generation Core"}
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0b0b12] border border-white/10 rounded-[3.5rem] aspect-square flex items-center justify-center overflow-hidden shadow-2xl">
              {resultImage ? (
                <img src={resultImage} className="w-full h-full object-cover animate-in zoom-in duration-700" alt="Result" />
              ) : (
                <ImageIcon className="text-slate-800" size={60} />
              )}
            </div>
          </div>
        </div>

        {/* Recent Works Section */}
        <div className="space-y-10 border-t border-white/5 pt-16">
          <h2 className="text-[14px] font-black uppercase tracking-[0.5em]">Recent Masterpieces</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {recentWorks.map((work) => (
              <div key={work.id} className="group relative aspect-square bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5">
                <img src={work.image_url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" alt="Past work" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
// นำเข้าเครื่องมือสร้าง Supabase Client โดยตรง
import { createClient } from '@supabase/supabase-js';
import { 
  Sparkles, Wand2, Palette, Zap, Loader2, 
  ArrowLeft, CheckCircle2, Image as ImageIcon,
  Maximize2, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// 1. ตั้งค่า Supabase (ใช้ URL และ Key จากโค้ดล่าสุดของคุณกมสิน)
const supabaseUrl = 'https://sriunfblgxorzzvmpmf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzcm...'; // คีย์ที่คุณใช้ล่าสุด
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AureliusStudio() {
  // State สำหรับจัดการข้อมูลในหน้าจอ
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('ghibli');
  const [scale, setScale] = useState(4); // ค่าเริ่มต้น 4X ตามดีไซน์
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // ฟังก์ชันหลักสำหรับปุ่ม Generate & Upscale
  const handleStartProcess = async () => {
    if (!prompt) return;
    
    setIsProcessing(true);
    setIsDone(false);

    try {
      // บันทึก Log การใช้งานลงใน Supabase เพื่อเก็บสถิติ
      const { error } = await supabase.from('usage_logs').insert([
        { 
          studio_name: 'Studio 5', 
          action_type: 'AI Generation & Upscale', 
          details: `Prompt: ${prompt} | Style: ${style} | Scale: ${scale}X` 
        }
      ]);

      if (error) throw error;

      // จำลองการประมวลผลของ AI (ยิ่ง Scale สูง ยิ่งใช้เวลานาน)
      await new Promise(resolve => setTimeout(resolve, scale * 1000));
      
      setIsDone(true);
    } catch (err) {
      console.error('Process Error:', err);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-6 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-[10px] font-black tracking-widest uppercase transition-all">
          <ArrowLeft size={14} /> BACK TO LIBRARY
        </Link>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent uppercase py-2">
            AURELIUS STUDIO
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-slate-500 font-bold uppercase italic">BY KOMSIN</p>
        </div>
        <div className="w-32"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/30 border border-white/5 p-8 md:p-12 rounded-[3.5rem] backdrop-blur-2xl shadow-2xl">
          
          {/* 1. Input Prompt */}
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="อธิบายจินตนาการของคุณที่นี่..."
            className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] p-8 text-lg placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all min-h-[150px] resize-none mb-8"
          />

          {/* 2. Style Selection */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { id: 'pixar', label: 'Pixar', icon: <Wand2 size={16} />, active: 'border-indigo-500 text-indigo-400' },
              { id: 'ghibli', label: 'Ghibli', icon: <Palette size={16} />, active: 'border-emerald-500 text-emerald-400' },
              { id: 'cyber', label: 'Cyber', icon: <Zap size={16} />, active: 'border-fuchsia-500 text-fuchsia-400' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setStyle(item.id)}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                  style === item.id ? `bg-white/5 ${item.active}` : 'bg-white/5 border-transparent text-slate-600 hover:text-slate-400'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {/* 3. AI Resolution Enhancement (2X, 4X, 8X) */}
          <div className="pt-8 border-t border-white/5 mb-10">
            <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-6 block text-center italic">
              AI RESOLUTION ENHANCEMENT
            </label>
            <div className="flex gap-4 justify-center">
              {[2, 4, 8].map((num) => (
                <button 
                  key={num}
                  onClick={() => setScale(num)}
                  className={`relative px-12 py-4 rounded-2xl font-black text-sm transition-all border ${
                    scale === num 
                    ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.4)]' 
                    : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  {num}X
                  {scale === num && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleStartProcess}
            disabled={isProcessing || !prompt}
            className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white py-8 rounded-[2rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl disabled:opacity-20 transition-all flex items-center justify-center gap-4"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" /> ANALYZING & SCALING...</>
            ) : (
              <><Sparkles size={20} /> GENERATE & {scale}X UPSCALE</>
            )}
          </button>
        </div>

        {/* Success Message */}
        {isDone && (
          <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-emerald-500 rounded-full p-1"><ShieldCheck size={16} className="text-white" /></div>
            <p className="font-black text-[11px] uppercase tracking-widest text-emerald-500">
              Successfully processed {scale}X enhancement and logged to Supabase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
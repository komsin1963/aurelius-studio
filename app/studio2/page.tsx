'use client';

import { useState } from 'react';
import { Mic2, Play, Square, Loader2, Volume2, Save, Radio, Music } from 'lucide-react';
import Link from 'next/link';

export default function Studio2Page() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // ฟังก์ชันจำลองการเจนเสียง โดยดึงไฟล์จาก public/audio/news-sample.mp3
  const generateVoiceManual = () => {
    if (!text) return alert('กรุณาใส่เนื้อหาข่าวครับคุณกมสิน');
    
    setIsGenerating(true);
    setAudioUrl(null); // ล้างค่าเก่าก่อน

    // จำลองเวลาประมวลผล 2 วินาทีเพื่อให้ดูเหมือน AI กำลังทำงาน
    setTimeout(() => {
      setAudioUrl('/audio/news-sample.mp3'); 
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.5)]">
              <Radio className="text-white animate-pulse" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic">Aurelius News Room</h1>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.3em]">Studio 02 / Manual Audio Engine</p>
            </div>
          </div>
          <Link href="/" className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            Exit Studio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- LEFT: SCRIPT INPUT --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] backdrop-blur-sm">
              <label className="text-[10px] font-black uppercase text-slate-500 mb-4 block tracking-widest">News Manuscript</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="พิมพ์เนื้อหาข่าวของคุณกมสินที่นี่..."
                className="w-full bg-transparent border-none text-lg leading-relaxed h-80 outline-none resize-none text-slate-200 placeholder:text-slate-700"
              />
            </div>
            
            <button 
              onClick={generateVoiceManual}
              disabled={isGenerating}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-900/20 active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Mic2 size={20} />}
              {isGenerating ? 'Processing AI Voice...' : 'Generate News Voice'}
            </button>
            
            <p className="text-[10px] text-center text-slate-600 font-medium">
              *ระบบจะดึงไฟล์เสียงจากเครื่อง (Manual Mode) เพื่อประหยัดค่า API
            </p>
          </div>

          {/* --- RIGHT: LIVE MONITOR --- */}
          <div className="lg:col-span-7 bg-black border-[12px] border-slate-900 rounded-[3.5rem] p-10 flex flex-col items-center justify-center relative shadow-2xl min-h-[500px]">
            {/* Monitor Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1 bg-slate-900 rounded-full border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-ping"></div>
              <span className="text-[9px] font-black text-white uppercase tracking-tighter">Live Playback</span>
            </div>

            {audioUrl ? (
              <div className="w-full space-y-10 text-center z-10">
                {/* Visualizer Animation */}
                <div className="flex justify-center items-end gap-1.5 h-24">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-red-600 rounded-full animate-bounce" 
                      style={{ 
                        animationDuration: `${0.5 + Math.random()}s`,
                        height: `${30 + Math.random() * 70}%` 
                      }}
                    ></div>
                  ))}
                </div>

                <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                  <audio controls src={audioUrl} className="w-full" autoPlay />
                </div>

                <div className="flex justify-center gap-4">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase">
                    <Save size={14} /> Download File
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 opacity-20">
                <div className="relative">
                  <Volume2 size={80} className="mx-auto text-slate-400" />
                  {isGenerating && <Loader2 size={80} className="absolute top-0 left-0 animate-spin text-red-600" />}
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  {isGenerating ? 'AI Voice Engine Running' : 'Standby for Broadcast'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
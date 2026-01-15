"use client";

import { useState } from "react";
import Link from "next/link";

export default function Studio3() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // 1. ฟังก์ชันเจนภาพ (เชื่อมต่อกับ API เดิมของคุณ)
  const generateImage = async () => {
    if (!prompt) return alert("กรุณาใส่รายละเอียดภาพ");
    setLoading(true);
    try {
      const response = await fetch("/api/generate", { // ตรวจสอบว่า API ชื่อนี้หรือไม่
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.url) setImage(data.url);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการสร้างภาพ");
    } finally {
      setLoading(false);
    }
  };

  // 2. ฟังก์ชัน Deploy ส่งงานเข้า Gallery (ระดบบล่าสุดที่เราทำ)
  const handleDeploy = async () => {
    if (!image) return alert("ไม่มีภาพให้ Deploy");
    setIsDeploying(true);
    try {
      const res = await fetch('/api/save-to-gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: image,
          title: prompt.substring(0, 30) || "AI Masterpiece"
        }),
      });

      if (res.ok) {
        alert("🚀 DEPLOY SUCCESS! ผลงานของคุณถูกส่งไปที่ Gallery เรียบร้อยแล้ว");
      } else {
        throw new Error("Deploy failed");
      }
    } catch (error) {
      alert("การ Deploy ขัดข้อง กรุณาลองใหม่ครับ");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header ส่วนบน */}
        <header className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-cyan-400">STUDIO 03</h1>
            <p className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Aurelius Studio By Komsin</p>
          </div>
          <Link href="/" className="text-xs text-gray-600 hover:text-white transition-all">EXIT</Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ฝั่งซ้าย: ส่วนควบคุม (Control Panel) */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Input Prompt</label>
                <textarea 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-sm focus:border-cyan-500 outline-none transition-all min-h-[120px]"
                  placeholder="เช่น A cyber punk samurai in Bangkok neon city..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "GENERATING..." : "GENERATE ARTWORK"}
              </button>
            </div>

            {/* ปุ่ม Deploy: จะแสดงเฉพาะเมื่อมีรูปแล้ว */}
            {image && (
              <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl space-y-4">
                <p className="text-xs text-emerald-400 text-center font-mono">IMAGE READY FOR PRODUCTION</p>
                <button 
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  {isDeploying ? "DEPLOYING TO CLOUD..." : "DEPLOY TO PRODUCTION"}
                </button>
              </div>
            )}
          </div>

          {/* ฝั่งขวา: ส่วนแสดงผล (Preview) */}
          <div className="relative">
            <div className="sticky top-12">
              <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-700 font-mono text-sm uppercase tracking-tighter">
                    {loading ? "Rendering..." : "Waiting for prompt..."}
                  </div>
                )}
              </div>
              <p className="text-center mt-4 text-[9px] text-zinc-600 font-mono tracking-[0.2em] uppercase">
                &copy; 2026 Aurelius Studio - High Quality Output
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
'use client';
import { useState } from 'react';
import { Sparkles, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StorytellerPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [storyText, setStoryText] = useState('');

  const generateStory = async () => {
    setLoading(true);
    setTimeout(() => {
      setStoryText("กาลครั้งหนึ่งนานมาแล้ว มีกระต่ายผู้กล้าหาญตัวหนึ่ง...");
      setLoading(false);
    }, 2000);
  };

  const saveToGallery = () => {
    if (!storyText) return;
    const saved = JSON.parse(localStorage.getItem('my-stories') || '[]');
    const newStory = {
      id: Date.now(),
      title: prompt || "นิทานใหม่",
      date: new Date().toLocaleString(),
      content: storyText
    };
    localStorage.setItem('my-stories', JSON.stringify([...saved, newStory]));
    alert("บันทึกลง Gallery เรียบร้อยแล้ว!");
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/gallery" className="text-indigo-400 flex items-center gap-2 mb-6 hover:text-indigo-200 transition-colors">
          <ArrowLeft size={18} /> กลับไปที่ Gallery
        </Link>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 italic"><Sparkles className="text-yellow-400" /> AI Storyteller</h1>
        
        <textarea 
          className="w-full p-6 rounded-3xl bg-indigo-900/50 border border-indigo-700 mb-6 focus:border-indigo-400 outline-none transition-all text-lg"
          rows={4}
          placeholder="พิมพ์เรื่องราวที่คุณอยากให้ AI ช่วยแต่ง..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex gap-4 mb-10">
          <button onClick={generateStory} disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl flex justify-center items-center gap-2 font-bold disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} สร้างนิทาน
          </button>
          <button onClick={saveToGallery} disabled={!storyText} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-2xl flex items-center gap-2 font-bold disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20">
            <Save /> บันทึก
          </button>
        </div>

        {storyText && (
          <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 animate-in fade-in zoom-in duration-500">
            <p className="leading-relaxed text-indigo-100 text-xl whitespace-pre-wrap">{storyText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
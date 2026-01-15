'use client';
import { useState, useEffect } from 'react';
import { LayoutGrid, BookOpen, Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  const [stories, setStories] = useState([]);

  // ดึงข้อมูลจาก LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-stories') || '[]');
    setStories(saved);
  }, []);

  // ฟังก์ชันลบนิทาน
  const removeStory = (id: number) => {
    if (confirm('คุณต้องการลบนิทานเรื่องนี้ใช่ไหม?')) {
      const updated = stories.filter((s: any) => s.id !== id);
      setStories(updated);
      localStorage.setItem('my-stories', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <LayoutGrid className="text-indigo-400" /> Stories Gallery
            </h1>
            <p className="text-indigo-300/60 mt-1 text-sm">Browse and manage your saved stories</p>
          </div>
          <Link href="/storyteller" className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 text-sm font-medium">
            <PlusCircle size={18} /> New Story
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-24 bg-indigo-900/30 rounded-3xl border-2 border-dashed border-indigo-800/50">
            <p className="text-indigo-300">ยังไม่มีนิทานในคลังเลยครับ ลองไปสร้างเรื่องแรกกัน!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((s: any) => (
              <div key={s.id} className="bg-indigo-900/50 backdrop-blur-sm p-6 rounded-2xl border border-indigo-800/50 hover:border-indigo-400/50 transition-all group shadow-xl">
                <h3 className="text-xl font-bold mb-2 text-indigo-50 group-hover:text-indigo-300 transition-colors">{s.title || 'Untitled Story'}</h3>
                <p className="text-xs text-indigo-400/70 mb-4 font-mono">Created: {s.date}</p>
                
                <div className="flex gap-2 mt-4">
                  <Link href="/ebook" className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl flex justify-center items-center gap-2 text-sm font-medium transition-colors">
                    <BookOpen size={16} /> Open E-book
                  </Link>
                  <button 
                    onClick={() => removeStory(s.id)} 
                    className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2.5 rounded-xl transition-all border border-red-500/20"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
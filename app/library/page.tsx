'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Play, Clock, LayoutGrid, TabletSmartphone, Film, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

// 1. ตั้งค่า Supabase
const supabaseUrl = 'https://sriunfblgxorzzvzmpmf.supabase.co';
const supabaseKey = 'sb_publishable_jaw_05elpxOUk4oAjvKy7g_ZQoQ-BeU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LibraryPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. ฟังก์ชันดึงข้อมูลจริงจากฐานข้อมูล
  const fetchStories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // 3. ฟังก์ชัน Export ข้อมูล
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stories, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "aurelius_stories_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" /> กำลังดึงนิทานจากคลังออเรเลียส...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Aurelius Library
          </h1>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={exportData} className="flex-1 md:flex-none bg-gray-800 hover:bg-gray-700 border border-gray-600 px-5 py-2 rounded-full text-sm font-medium transition flex items-center justify-center gap-2">
              <Download size={18} /> Export ข้อมูล
            </button>
            <Link href="/studio" className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-medium transition text-center shadow-lg">
              + สร้างนิทานใหม่
            </Link>
          </div>
        </div>

        {/* 🎬 1. NETFLIX STYLE (Original Series) */}
        {stories.some(s => s.content_type === 'netflix') && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-red-500">
              <Film size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider">Original Series</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.filter(s => s.content_type === 'netflix').map(story => (
                <div key={story.id} className="relative group overflow-hidden rounded-2xl border border-gray-800 transition-all hover:scale-[1.01]">
                  <img src={story.image_url || 'https://via.placeholder.com/600x300'} className="w-full h-[300px] object-cover opacity-80 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-black mb-3">{story.title}</h3>
                    <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-md font-bold w-fit hover:bg-gray-200 transition">
                      <Play size={20} fill="black" /> Play Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 📺 2. YOUTUBE STYLE (Recommended) */}
        {stories.some(s => s.content_type === 'youtube') && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-red-400">
              <LayoutGrid size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.filter(s => s.content_type === 'youtube').map(story => (
                <div key={story.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-gray-800">
                    <img src={story.image_url || 'https://via.placeholder.com/400x225'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-purple-400 transition line-clamp-1">{story.title}</h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 📱 3. SHORTS STYLE */}
        {stories.some(s => s.content_type === 'shorts') && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-purple-400">
              <TabletSmartphone size={24} />
              <h2 className="text-xl font-bold uppercase tracking-wider">Aurelius Shorts</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {stories.filter(s => s.content_type === 'shorts').map(story => (
                <div key={story.id} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-gray-800 group cursor-pointer transition-all hover:ring-2 ring-purple-500">
                  <img src={story.image_url || 'https://via.placeholder.com/300x500'} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 p-4 flex flex-col justify-end">
                    <h3 className="text-xs font-bold line-clamp-2">{story.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
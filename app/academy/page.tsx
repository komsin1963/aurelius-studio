'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Play, BookOpen, Clock, Star, ArrowLeft, Loader2, Search } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AcademyPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademy = async () => {
      const { data, error } = await supabase
        .from('academy_content')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && data) setCourses(data);
      setLoading(false);
    };
    fetchAcademy();
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-[10px] uppercase tracking-[0.3em]">
          <ArrowLeft size={16} /> Exit Academy
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <BookOpen size={20} className="text-indigo-400" />
            </div>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">AureliusX Learning Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Mastery</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-4">อัปเกรดทักษะการสั่งงาน AI ให้เหนือชั้น โดย Komsin Studio</p>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={40} /></div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="group relative bg-slate-900/40 border border-white/5 rounded-[3rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500">
                {/* Video/Image Preview */}
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Play fill="black" size={20} />
                    </div>
                  </div>
                  <img 
                    src={course.thumbnail_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'} 
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] font-black bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                      {course.category || 'Tutorial'}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">15 Mins</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 line-clamp-2">
                    {course.description || 'เรียนรู้วิธีการสั่งงาน AI ให้ได้ผลลัพธ์ระดับมืออาชีพในบทเรียนนี้'}
                  </p>

                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-black transition-all">
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Coming Soon: Premium Courseware by Komsin</p>
          </div>
        )}

      </div>
    </div>
  );
}
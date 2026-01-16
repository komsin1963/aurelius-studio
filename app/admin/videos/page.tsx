'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Video, Trash2, Plus, X, Play, MonitorPlay, BarChart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', description: '', price: 0, video_url: '', thumbnail_url: '' });

  const fetchVideos = async () => {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (data) setVideos(data);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('videos').insert([newVideo]);
    if (error) toast.error('FAILED TO DEPLOY VIDEO');
    else {
      toast.success('NEW VIDEO LESSON DEPLOYED');
      setIsAdding(false);
      setNewVideo({ title: '', description: '', price: 0, video_url: '', thumbnail_url: '' });
      fetchVideos();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ERASE THIS VIDEO FROM THE ACADEMY?')) return;
    const { error } = await supabase.from('videos').delete().eq('id', id);
    if (error) toast.error('ERROR REMOVING VIDEO');
    else {
      toast.success('VIDEO REMOVED');
      fetchVideos();
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-cyan-500">Neural <span className="text-white">Academy Admin</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2 italic">Video Course Distribution Center</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase italic tracking-widest hover:bg-cyan-500 transition-all flex items-center gap-2"
          >
            {isAdding ? <><X size={18}/> Cancel</> : <><Plus size={18}/> Upload Lesson</>}
          </button>
        </header>

        {/* --- ADD NEW VIDEO FORM --- */}
        {isAdding && (
          <div className="bg-white/5 border border-cyan-500/30 rounded-[2.5rem] p-8 mb-12">
            <form onSubmit={handleAddVideo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="VIDEO TITLE" className="bg-black/40 border border-white/10 p-4 rounded-xl font-black text-[11px] uppercase focus:border-cyan-500 outline-none" 
                value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} required />
              <input type="number" placeholder="PRICE (XP)" className="bg-black/40 border border-white/10 p-4 rounded-xl font-black text-[11px] uppercase focus:border-cyan-500 outline-none" 
                value={newVideo.price} onChange={e => setNewVideo({...newVideo, price: parseInt(e.target.value)})} required />
              <textarea placeholder="DESCRIPTION" className="md:col-span-2 bg-black/40 border border-white/10 p-4 rounded-xl font-black text-[11px] uppercase h-24" 
                value={newVideo.description} onChange={e => setNewVideo({...newVideo, description: e.target.value})} required />
              <input type="text" placeholder="VIDEO URL (YouTube/Vimeo)" className="bg-black/40 border border-white/10 p-4 rounded-xl font-black text-[11px] uppercase" 
                value={newVideo.video_url} onChange={e => setNewVideo({...newVideo, video_url: e.target.value})} required />
              <input type="text" placeholder="THUMBNAIL IMAGE URL" className="bg-black/40 border border-white/10 p-4 rounded-xl font-black text-[11px] uppercase" 
                value={newVideo.thumbnail_url} onChange={e => setNewVideo({...newVideo, thumbnail_url: e.target.value})} required />
              <button type="submit" className="md:col-span-2 bg-cyan-500 text-black py-4 rounded-xl font-black uppercase italic hover:bg-white transition-all">Confirm Upload</button>
            </form>
          </div>
        )}

        {/* --- VIDEO LIST --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#0b0b12] border border-white/5 rounded-[2rem] p-6 flex items-center gap-6 group hover:border-cyan-500/30 transition-all">
              <div className="w-32 aspect-video bg-white/5 rounded-lg overflow-hidden relative">
                <img src={video.thumbnail_url} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                <Play className="absolute inset-0 m-auto text-white/50 group-hover:text-cyan-500" size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-black uppercase italic tracking-tight text-lg">{video.title}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] font-black text-cyan-500 uppercase italic bg-cyan-500/10 px-2 py-1 rounded-md">{video.price} XP</span>
                  <button onClick={() => handleDelete(video.id)} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
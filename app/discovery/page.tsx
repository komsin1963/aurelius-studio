'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDiscovery() {
  const [formData, setFormData] = useState({
    name: '', category: 'Image', description: '',
    image_url: '', external_link: '', status: 'Trending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('discovery_hub').insert([formData]);
    setLoading(false);
    if (!error) {
      alert('AureliusX Discovery Updated!');
      setFormData({ name: '', category: 'Image', description: '', image_url: '', external_link: '', status: 'Trending' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white p-8">
      <Link href="/discovery" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-xs">
        <ArrowLeft size={16} /> BACK TO HUB
      </Link>

      <div className="max-w-2xl mx-auto bg-slate-900/30 border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl">
        <h2 className="text-3xl font-black italic mb-8 uppercase italic">Add AI <span className="text-cyan-500">Intelligence</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="AI Name" required className="bg-black/50 border border-white/10 p-4 rounded-2xl outline-none" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <select className="bg-black/50 border border-white/10 p-4 rounded-2xl outline-none"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option>Image</option><option>Video</option><option>Audio</option><option>Code</option>
            </select>
          </div>
          <textarea placeholder="Description" className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl h-24 outline-none"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <input placeholder="Image URL" className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl outline-none"
            value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <input placeholder="External Link" className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl outline-none"
            value={formData.external_link} onChange={e => setFormData({...formData, external_link: e.target.value})} />
          
          <button type="submit" disabled={loading} className="w-full bg-cyan-500 py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'DEPLOY TO HUB'}
          </button>
        </form>
      </div>
      <p className="text-center mt-6 text-[9px] font-black tracking-[0.4em] text-slate-600 uppercase">AureliusX Admin System by Komsin</p>
    </div>
  );
}